import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import Button from '@shopgate/pwa-ui-shared/Button';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import Checkbox from '@shopgate/pwa-ui-shared/Form/Checkbox';
import FormBuilder from '../../components/FormBuilder';
import * as portals from '../../constants/Portals';
import EventEmitter from '../../events/emitter';
import {
  NAVIGATOR_SAVE_BUTTON_CLICK,
  NAVIGATOR_SAVE_BUTTON_SHOW,
  NAVIGATOR_SAVE_BUTTON_HIDE,
  NAVIGATOR_SAVE_BUTTON_ENABLE,
  NAVIGATOR_SAVE_BUTTON_DISABLE,
} from '../../constants/EventTypes';
import config from '../../config';
import connect from './connector'; // TODO: Check connector; Validation possibly not needed anymore!
import style from './style';

const { splitDefaultAddressesByTags = [] } = config;

/**
 * Address form component
 */
export class AddressForm extends Component {
  static propTypes = {
    addAddress: PropTypes.func.isRequired,
    addressFields: PropTypes.shape().isRequired,
    deleteAddress: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    updateAddress: PropTypes.func.isRequired,
    address: PropTypes.shape(),
  }

  static defaultProps = {
    address: {},
  }

  /**
   * Initializes the component.
   * @param {Object} props The components props.
   */
  constructor(props) {
    super(props);

    this.state = {
      address: props.address,
      disabled: props.disabled || !!props.address.id,
    };
  }

  /**
   * Did mount
   */
  componentDidMount() {
    // Attach event handler for updating an address to the "save" button of the theme
    EventEmitter.on(NAVIGATOR_SAVE_BUTTON_CLICK, this.addOrUpdateAddress);

    if (this.props.address.id) {
      EventEmitter.emit(NAVIGATOR_SAVE_BUTTON_SHOW);
    }
  }

  /**
   * Update state with next props.
   * @param {Object} nextProps The next props.
   */
  componentWillReceiveProps(nextProps) {
    // Enable / Disable navigation button based on disabled prop.
    if (nextProps.disabled && !this.props.disabled) {
      EventEmitter.emit(NAVIGATOR_SAVE_BUTTON_DISABLE);
    } else if (!nextProps.disabled && this.props.disabled) {
      EventEmitter.emit(NAVIGATOR_SAVE_BUTTON_ENABLE);
    }
  }

  /**
   * Will unmount
   */
  componentWillUnmount() {
    EventEmitter.off(NAVIGATOR_SAVE_BUTTON_CLICK, this.addOrUpdateAddress);
    EventEmitter.emit(NAVIGATOR_SAVE_BUTTON_HIDE);
  }

  /**
   * Checks if the address should be created or updated and performs the desired action
   */
  addOrUpdateAddress = () => {
    if (this.props.address.id) {
      this.props.updateAddress({
        id: this.props.address.id,
        ...this.state.address,
      });
    } else {
      this.props.addAddress({
        ...this.state.address,
        tags: this.state.address.tags || [],
      });
    }
  }

  /**
   * Handles the click on the "delete address" button
   */
  deleteAddress = () => { this.props.deleteAddress(this.props.address.id); }

  /**
   * Update handler to modify address tags based on the user selection
   * @param {boolean} makeDefault Determines if the tag is supposed to be set or removed
   * @param {string} tag The tag name to work with
   */
  handleMakeDefault = (makeDefault, tag) => {
    const addressTags = this.state.address.tags || [];
    const defaultTag = tag === 'default' ? tag : `default_${tag}`;
    if (makeDefault) {
      this.handleUpdate({
        ...this.state.address,
        tags: [...addressTags, defaultTag],
      });
    } else {
      this.handleUpdate({
        ...this.state.address,
        tags: addressTags.filter(t => t !== defaultTag),
      });
    }
  }

  /**
   * Takes the data from the FormBuilder, checks the latest changes and updates the component values
   * @param {Object} address The new (or changed) address properties
   * @param {boolean} hasErrors Receives the info about the data contains validation errors or not
   */
  handleUpdate = (address, hasErrors) => {
    // Avoid updating state, when no address fields changed
    const hasChanged = !isEqual(address, this.state.address);
    if (hasChanged) {
      // Update save button
      if (this.state.disabled !== hasErrors) {
        EventEmitter.emit(hasErrors
          ? NAVIGATOR_SAVE_BUTTON_DISABLE
          : NAVIGATOR_SAVE_BUTTON_ENABLE);
      }

      // Update current state with the latest form changes
      this.setState({
        ...this.state,
        address,
        disabled: hasErrors,
      });
    }
  }

  /**
   * @return {*}
   */
  render() {
    return (
      <Fragment>

        <Portal name={portals.USER_ADDRESS_FORM_BEFORE} />
        <Portal name={portals.USER_ADDRESS_FORM}>

          <FormBuilder
            id="address"
            className={style.fields}
            config={this.props.addressFields}
            defaults={this.state.address}
            handleUpdate={this.handleUpdate}
          />

          <div className={style.options}>
            {/* Delete address button */}
            {this.props.address.id &&
              <Button
                className={style.deleteAddressButton}
                onClick={this.deleteAddress}
                flat
                wrapContent={false}
                data-test-id="deleteAddressButton"
              >
                <I18n.Text string="address.delete.button" />
              </Button>
            }

            {/* Default address and submit button for new address */}
            {!this.props.address.id &&
              <Fragment>
                {splitDefaultAddressesByTags.map(tag => (
                  <Checkbox
                    className={style.defaults}
                    key={tag}
                    name={`default_${tag}`}
                    label={`address.makeDefault.${tag}`}
                    onChange={makeDefault => this.handleMakeDefault(makeDefault, tag)}
                  />
                ))}

                <Portal name={portals.USER_ADDRESS_FORM_BUTTON_BEFORE} />
                <Portal name={portals.USER_ADDRESS_FORM_BUTTON}>
                  {
                    /* TODO: Inconsistent form behaviour, possibly undesired!
                     * Should the save and update buttons really be that different??? */
                  }
                  <RippleButton
                    type="secondary"
                    disabled={this.props.disabled}
                    onClick={this.addOrUpdateAddress}
                    className={style.addAddressButton}
                    data-test-id="AddAddressButton"
                  >
                    <I18n.Text string="address.add.button" />
                  </RippleButton>
                </Portal>
                <Portal name={portals.USER_ADDRESS_FORM_BUTTON_AFTER} />
              </Fragment>
            }
          </div>

        </Portal>
        <Portal name={portals.USER_ADDRESS_FORM_AFTER} />

      </Fragment>
    );
  }
}

export default connect(AddressForm);
