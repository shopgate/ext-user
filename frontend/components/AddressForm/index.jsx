import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import FormBuilder from '@shopgate/pwa-ui-shared/Form/Builder';
import Button from '@shopgate/pwa-ui-shared/Button';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import Checkbox from '@shopgate/pwa-ui-shared/Form/Checkbox';
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
class AddressForm extends Component {
  static propTypes = {
    addAddress: PropTypes.func.isRequired,
    /** @type {UserConfig} */
    config: PropTypes.shape().isRequired,
    deleteAddress: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired,
    isFirstAddress: PropTypes.bool.isRequired,
    updateAddress: PropTypes.func.isRequired,
    address: PropTypes.shape(),
    validationErrors: PropTypes.arrayOf(PropTypes.shape()),
  }

  static defaultProps = {
    address: {},
    validationErrors: [],
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
      tags: this.props.isFirstAddress || !tags ? [] : tags,
    };

    this.initialAddressTags = [];
    this.props.config.addressDefaultGroups.forEach(tag => (
      this.initialAddressTags.push(tag === 'default' ? tag : `default_${tag}`)
    ));

    // Init default tags for first address
    if (this.props.isFirstAddress) {
      this.state.tags = this.initialAddressTags;
    }
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
   * Update handler to modify address tags based on the user selection
   * @param {boolean} makeDefault Determines if the tag is supposed to be set or removed
   * @param {string} tag The tag name to work with
   */
  handleMakeDefault = (makeDefault, tag) => {
    const addressTags = this.state.tags || [];
    const defaultTag = tag === 'default' ? tag : `default_${tag}`;

    const tags = makeDefault
      ? [...addressTags, defaultTag]
      : addressTags.filter(t => t !== defaultTag);

    this.setState({ tags: tags.filter(this.filterUnavailableDefaultTag) });
  }

  /**
   * Checks if the address should be created or updated and performs the desired action
   */
  addOrUpdateAddress = () => {
    if (this.state.editMode) {
      // Update uddress and remove existing default tags, that are not configured
      this.props.updateAddress({
        id: this.props.address.id,
        ...this.state.address,
        customAttributes: this.state.address.customAttributes || {},
        tags: this.props.address.tags.filter(this.filterUnavailableDefaultTag) || [],
      });
    } else {
      // Add the address, with filtered tags
      this.props.addAddress({
        ...this.state.address,
        customAttributes: this.state.address.customAttributes || {},
        tags: this.state.tags.filter(this.filterUnavailableDefaultTag) || [],
      });
    }

    // Changes have been submitted
    this.setState({
      hasChanges: false,
      isBusy: true,
    });
  }

  /**
   * Takes address tag and removes all tag, that are not present in the config
   * @param {string} tag Tag to filter
   * @returns {boolean}
   */
  filterUnavailableDefaultTag = (tag) => {
    if (/^(default|default_.*)$/.test(tag)) {
      // Check if the default tag is part of the config and keep, if so
      return this.props.config.addressDefaultGroups.includes(tag);
    }

    // Don't filter out non-default tags
    return true;
  };

  /**
   * Handles the click on the "delete address" button
   */
  deleteAddress = () => { this.props.deleteAddress(this.props.address.id); }

  /**
   * Compares two addresses if anything has changed (except id and tags) and returns the result
   * @param {Object} address1 First address
   * @param {Object} address2 Second address
   * @returns {boolean}
   */
  compareAddresses = (address1, address2) => {
    const comparator1 = {
      ...address1,
      customAttributes: address1.customAttributes || {},
    };
    const comparator2 = {
      ...address2,
      customAttributes: address2.customAttributes || {},
    };

    // Compare main attributes first
    const keys1 = Object.keys(comparator1).filter(key => (
      key !== 'id' && key !== 'customAttributes' && key !== 'tags'
    ));
    const keys2 = Object.keys(comparator2).filter(key => (
      key !== 'id' && key !== 'customAttributes' && key !== 'tags'
    ));

    // Finish early if already different
    if (keys1.length !== keys2.length) {
      return true;
    }

    const customKeys1 = Object.keys(comparator1.customAttributes).sort();
    const customKeys2 = Object.keys(comparator2.customAttributes).sort();

    // Finish early again if already different
    if (customKeys1.length !== customKeys2.length) {
      return true;
    }

    // Shallow comparison without regards of property order (use faster for loop to return early)
    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const i in keys1) {
      const key = keys1[i];
      if (comparator1[key] !== comparator2[key]) {
        return true;
      }
    }
    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const i in customKeys1) {
      const key = customKeys1[i];
      if (comparator1.customAttributes[key] !== comparator2.customAttributes[key]) {
        return true;
      }
    }

    // No changes detected
    return false;
  }

  /**
   * Takes the data from the FormBuilder, checks the latest changes and updates the component values
   * @param {Object} address The new (or changed) address properties
   * @param {boolean} hasErrors Receives the info about the data contains validation errors or not
   */
  handleUpdate = (address, hasErrors) => {
    // Avoid updating state, when no address fields changed
    const hasChanged = this.compareAddresses(address, this.state.address);
    if (hasChanged) {
      const newState = {
        ...this.state,
        address,
        hasErrors,
        hasChanges: false,
      };

      // Check differences between current and initial data to disable "save" button if not changed
      if (this.state.editMode) {
        newState.hasChanges = this.compareAddresses(address, this.props.address);
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
    const { isFirstAddress, validationErrors } = this.props;
    return (
      <Fragment>

        <Portal name={portals.USER_ADDRESS_FORM_BEFORE} />
        <Portal name={portals.USER_ADDRESS_FORM}>

          <FormBuilder
            name="address"
            className={style.fields}
            config={this.props.config.addressForm}
            defaults={this.state.address}
            handleUpdate={this.handleUpdate}
            onSubmit={this.addOrUpdateAddress}
            validationErrors={validationErrors}
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
                {this.props.config.addressDefaultGroups.map((tag) => {
                  let checkTag = tag;
                  if (tag !== 'default') {
                    checkTag = `default_${tag}`;
                  }
                  return (
                    <Checkbox
                      className={isFirstAddress ? style.defaultsDisabled : style.defaults}
                      key={tag}
                      name={`default_${tag}`}
                      label={`address.makeDefault.${tag}`}
                      onChange={makeDefault => this.handleMakeDefault(makeDefault, tag)}
                      checked={isFirstAddress || this.state.tags.includes(checkTag)}
                      disabled={isFirstAddress}
                    />
                  );
                })}

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

export { AddressForm as UnwrappedAddressForm };
export default connect(AddressForm);
