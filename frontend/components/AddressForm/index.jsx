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
import connect from './connector';
import style from './style';

/**
 * Address form component
 */
export class AddressForm extends Component {
  static propTypes = {
    addAddress: PropTypes.func.isRequired,
    /** @type {UserConfig} */
    config: PropTypes.shape().isRequired,
    deleteAddress: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired,
    isFirstAddress: PropTypes.bool.isRequired,
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

    const { id: addressId, tags, ...addressData } = props.address;
    this.state = {
      address: addressData,
      isBusy: props.isBusy,
      hasChanges: false,
      editMode: !!addressId,
      hasErrors: false,
    };
  }

  /**
   * Did mount
   */
  componentDidMount() {
    if (this.state.editMode) {
      // Attach event handler for updating an address to the "save" button of the theme
      EventEmitter.on(NAVIGATOR_SAVE_BUTTON_CLICK, this.addOrUpdateAddress);
      EventEmitter.emit(NAVIGATOR_SAVE_BUTTON_SHOW);

      this.setSaveButtonEnabledStatus(this.isSaveButtonVisible());
    }

    // Init default tags for first address
    if (this.props.isFirstAddress) {
      const tags = [];
      this.props.config.splitDefaultAddressesByTags.forEach(tag => (
        tags.push(tag === 'default' ? tag : `default_${tag}`)
      ));
      this.updateAddress({ tags });
    }
  }

  /**
   * Update state with next props.
   * @param {Object} nextProps The next props.
   */
  componentWillReceiveProps(nextProps) {
    // Disable save button if busy
    if (nextProps.isBusy !== this.state.isBusy) {
      // Update only if the button status actually has to change
      if (nextProps.isBusy !== this.state.isBusy) {
        this.setSaveButtonEnabledStatus(this.isSaveButtonVisible());
      }

      this.setState({ isBusy: nextProps.isBusy });
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
   * Handles sending out events to enable or disable the navigator buttons based "show" state
   * @param {boolean} enabled Defines if the button should be enabled or disabled
   */
  setSaveButtonEnabledStatus = (enabled) => {
    if (!this.state.editMode) {
      return;
    }

    if (enabled) {
      EventEmitter.emit(NAVIGATOR_SAVE_BUTTON_ENABLE);
    } else {
      EventEmitter.emit(NAVIGATOR_SAVE_BUTTON_DISABLE);
    }
  }

  /**
   * Evaluates all values that affect the button enabled state
   * @returns {boolean}
   */
  isSaveButtonVisible = () => (
    // Is not in edit mode or has changes
    (!this.state.editMode || this.state.hasChanges) &&

    // Has no validation errors (like all required fields are filled out)
    !this.state.hasErrors &&

    // Is not waiting for anything
    !this.state.isBusy
  )

  /**
   * Checks if the address should be created or updated and performs the desired action
   */
  addOrUpdateAddress = () => {
    if (this.state.editMode) {
      this.props.updateAddress({
        id: this.props.address.id,
        ...this.state.address,
        tags: this.state.address.tags || this.props.address.tags || [],
      });
    } else {
      this.props.addAddress({
        ...this.state.address,
        tags: this.state.address.tags || this.props.address.tags || [],
      });
    }

    // Changes have been submitted
    this.setState({
      hasChanges: false,
      isBusy: true,
    });
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
      }, this.state.hasErrors);
    } else {
      this.handleUpdate({
        ...this.state.address,
        tags: addressTags.filter(t => t !== defaultTag),
      }, this.state.hasErrors);
    }
  }

  /**
   * Takes the data from the FormBuilder, checks the latest changes and updates the component values
   * @param {Object} address The new (or changed) address properties
   * @param {boolean} hasErrors Receives the info about the data contains validation errors or not
   */
  handleUpdate = (address, hasErrors) => {
    // Avoid updating state, when no address fields changed
    const hasChanged = !isEqual(address, this.state.address) || this.state.hasErrors !== hasErrors;
    if (hasChanged) {
      const newState = {
        ...this.state,
        address,
        hasErrors,
      };

      // Disable only if in "edit" mode and no changes were done
      const compareData = {
        ...this.props.address,
        id: this.props.address.id, // Updates don't change id
        tags: this.props.address.tags, // Tags are not changeable in edit mode either
      };

      // Remove all properties from comparator that don not exist in the address anymore
      Object.keys(address).forEach((key) => {
        if (address[key] === undefined) {
          compareData[key] = undefined;
        }
      });
      // Same for custom attributes
      if (address.customAttributes) {
        Object.keys(address.customAttributes).forEach((key) => {
          if (address.customAttributes[key] === undefined) {
            compareData.customAttributes[key] = undefined;
          }
        });
      }

      if (this.state.editMode) {
        newState.hasChanges = !isEqual({
          ...address,
          id: this.props.address.id,
          tags: this.props.address.tags,
        }, compareData);
      }

      // Check if save button visibility has changed and update it, if that's the case
      const saveButtonWasVisible = this.isSaveButtonVisible();

      // Update current state with the latest form changes
      this.setState(newState, () => {
        if (saveButtonWasVisible !== this.isSaveButtonVisible()) {
          this.setSaveButtonEnabledStatus(this.isSaveButtonVisible());
        }
      });
    }
  }

  /**
   * @return {*}
   */
  render() {
    const { isFirstAddress } = this.props;
    return (
      <Fragment>

        <Portal name={portals.USER_ADDRESS_FORM_BEFORE} />
        <Portal name={portals.USER_ADDRESS_FORM}>

          <FormBuilder
            name="address"
            className={style.fields}
            config={this.props.config.addressFields}
            defaults={this.state.address}
            handleUpdate={this.handleUpdate}
            onSubmit={this.addOrUpdateAddress}
          />

          <div className={style.options}>
            {/* Delete address button */}
            {this.state.editMode &&
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
            {!this.state.editMode &&
              <Fragment>
                {this.props.config.splitDefaultAddressesByTags.map(tag => (
                  <Checkbox
                    className={isFirstAddress ? style.defaultsDisabled : style.defaults}
                    key={tag}
                    name={`default_${tag}`}
                    label={`address.makeDefault.${tag}`}
                    onChange={makeDefault => this.handleMakeDefault(makeDefault, tag)}
                    checked={isFirstAddress}
                    disabled={isFirstAddress}
                  />
                ))}

                <Portal name={portals.USER_ADDRESS_FORM_BUTTON_BEFORE} />
                <Portal name={portals.USER_ADDRESS_FORM_BUTTON}>
                  <RippleButton
                    type="secondary"
                    disabled={!this.isSaveButtonVisible()}
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
