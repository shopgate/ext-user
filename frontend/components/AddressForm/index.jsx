import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import Button from '@shopgate/pwa-ui-shared/Button';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import Checkbox from '@shopgate/pwa-ui-shared/Form/Checkbox';
import FormBuilder from '@shopgate/user/components/FormBuilder';
import * as portals from '@shopgate/user/constants/Portals';
import EventEmitter from '@shopgate/user/events/emitter';
import {
  NAVIGATOR_USER_ADDRESS_BUTTON_CLICK,
  NAVIGATOR_USER_ADDRESS_BUTTON_SHOW,
  NAVIGATOR_USER_ADDRESS_BUTTON_HIDE,
  NAVIGATOR_USER_ADDRESS_BUTTON_ENABLE,
  NAVIGATOR_USER_ADDRESS_BUTTON_DISABLE,
} from '@shopgate/user/constants/EventTypes';
import config from '@shopgate/user/config';
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
    // TODO: possibly not needed =====>     validateAddress: PropTypes.func.isRequired,
    address: PropTypes.shape(),
    // TODO: possibly not needed =====>     validationErrors: PropTypes.shape(),
  }

  static defaultProps = {
    address: {},
    // TODO: possibly not needed =====>     validationErrors: {},
  }

  /**
   * Initializes the component.
   * @param {Object} props The components props.
   */
  constructor(props) {
    super(props);

    this.address = props.address;
  }

  /**
   * Did mount
   */
  componentDidMount() {
    // Attach event handler for updating an address to the "save" button of the theme
    EventEmitter.on(NAVIGATOR_USER_ADDRESS_BUTTON_CLICK, this.addOrUpdateAddress);

    if (this.props.address.id) {
      EventEmitter.emit(NAVIGATOR_USER_ADDRESS_BUTTON_SHOW);
      EventEmitter.emit(NAVIGATOR_USER_ADDRESS_BUTTON_DISABLE);
    }
  }

  /**
   * Update state with next props.
   * @param {Object} nextProps The next props.
   */
  componentWillReceiveProps(nextProps) {
    // TODO: Do proper validation error handling
    if (Object.keys(nextProps.validationErrors).length) {
      this.setState({ errors: nextProps.validationErrors });
    }

    // Enable / Disable navigation button based on disabled prop.
    if (nextProps.disabled && !this.props.disabled) {
      EventEmitter.emit(NAVIGATOR_USER_ADDRESS_BUTTON_DISABLE);
    } else if (!nextProps.disabled && this.props.disabled) {
      EventEmitter.emit(NAVIGATOR_USER_ADDRESS_BUTTON_ENABLE);
    }
  }

  /**
   * Will unmount
   */
  componentWillUnmount() {
    EventEmitter.off(NAVIGATOR_USER_ADDRESS_BUTTON_CLICK, this.addOrUpdateAddress);
    EventEmitter.emit(NAVIGATOR_USER_ADDRESS_BUTTON_HIDE);
  }

  /**
   * Takes the data from the FormBuilder, checks the latest changes and updates the component values
   * @param {Object} address The new (or changed) address properties
   */
  updateAddress = (address) => {
    // Fill up the current data with the latest form changes
    this.address = {
      ...this.address,
      ...address,
    };

    // TODO: Check if anything has changed and enable save button if if validation passed
    // ---------------------------------------------------------------------------------------------
    // TODO:. this.setState({
    // TODO:.   address: {
    // TODO:.     ...this.state.address,
    // TODO:.     ...address,
    // TODO:.   },
    // TODO:. }, this.state.inlineValidation ? this.validateInline : () => {
    // TODO:.   if (!this.state.hasChanges) {
    // TODO:.     // Show navigtion button when first time updating address.
    // TODO:.     const hasChanges = !Object.keys(address)
    // TODO:.       .every(key => address[key] === this.props.address[key]);
    // TODO:
    // TODO:.     if (hasChanges) {
    // TODO:.       EventEmitter.emit(NAVIGATOR_USER_ADDRESS_BUTTON_ENABLE);
    // TODO:
    // TODO:.       this.setState({
    // TODO:.         hasChanges,
    // TODO:.       });
    // TODO:.     }
    // TODO:.   }
    // TODO:. });
  }

  /**
   * Handles the click on the "delete address" button
   */
  deleteAddress = () => { this.props.deleteAddress(this.props.address.id); }

  // TODO: Take care of validation errors coming from the form builder
  // -----------------------------------------------------------------------------------------------
  // TODO:. validateInline = () => {
  // TODO:.   const errors = this.props.validateAddress(this.state.address);
  // TODO:.   this.setState({
  // TODO:.     errors,
  // TODO:.   });
  // TODO:.   EventEmitter.emit(Object.keys(errors).length ?
  // TODO:.     NAVIGATOR_USER_ADDRESS_BUTTON_DISABLE :
  // TODO:.     NAVIGATOR_USER_ADDRESS_BUTTON_ENABLE);
  // TODO:. }

  /**
   * Update handler to modify address tags based on the user selection
   * @param {boolean} makeDefault Determines if the tag is supposed to be set or removed
   * @param {string} tag The tag name to work with
   */
  handleMakeDefault = (makeDefault, tag) => {
    const defaultTag = tag === 'default' ? tag : `default_${tag}`;
    if (makeDefault) {
      this.updateAddress({ tags: [...this.address.tags, defaultTag] });
    } else {
      this.updateAddress({
        tags: this.address.tags.filter(t => t !== defaultTag),
      });
    }
  }

  /**
   * Checks if the address may be created or updated and performs the desired action
   */
  addOrUpdateAddress = () => {
    // TODO: Move the following code to a different place
    // ---------------------------------------------------------------------------------------------
    // TODO:. if (Object.keys(errors).length > 0) {
    // TODO:.   EventEmitter.emit(NAVIGATOR_USER_ADDRESS_BUTTON_DISABLE);
    // TODO:.   return;
    // TODO:. }

    if (this.props.address.id) {
      // Join with origin and update
      this.props.updateAddress({
        ...this.props.address,
        ...this.state.address,
      });
    } else {
      this.props.addAddress(this.address);
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
            locale="en-US" // TODO: exchange with current locale
            config={this.props.addressFields}
            defaults={this.address}
            handleUpdate={this.updateAddress}
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
