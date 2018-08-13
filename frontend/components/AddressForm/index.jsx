import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import Button from '@shopgate/pwa-ui-shared/Button';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import Select from '@shopgate/pwa-ui-shared/Form/Select';
import Checkbox from '@shopgate/pwa-ui-shared/Form/Checkbox';
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
import connect from './connector';
import countries from './countries';
import style from './style';

const { splitDefaultAddressesByTags = [], addressFields = [] } = config;

/**
 * @return {Object}
 */
const countriesList = () => Object.keys(countries).reduce((reducer, countryCode) => ({
  ...reducer,
  [countryCode]: countries[countryCode].name,
}), {});

/**
 * @param {string} countryCode country
 * @return {Object}
 */
const provincesList = countryCode => countries[countryCode].divisions;

// eslint-disable-next-line valid-jsdoc
/**
 * Address form component
 */
export class AddressForm extends Component {
  static propTypes = {
    addAddress: PropTypes.func.isRequired,
    deleteAddress: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    updateAddress: PropTypes.func.isRequired,
    validateAddress: PropTypes.func.isRequired,
    address: PropTypes.shape(),
    validationErrors: PropTypes.shape(),
  }

  static defaultProps = {
    address: {},
    validationErrors: {},
  }

  /**
   * Initializes the component.
   * @param {Object} props The components props.
   */
  constructor(props) {
    super(props);

    this.countriesList = countriesList();
    const country = Object.keys(this.countriesList)[0];
    const province = Object.keys(provincesList(country))[0];

    this.state = {
      address: {
        prefix: '',
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        phone: '',
        company: '',
        street1: '',
        street2: '',
        city: '',
        province,
        country,
        zipCode: '',
        tags: [],
        ...props.address, // Init edit address form
      },
      errors: {
        prefix: '',
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        phone: '',
        company: '',
        street1: '',
        street2: '',
        city: '',
        province: '',
        country: '',
        zipCode: '',
        ...props.validationErrors,
      },
      inlineValidation: false,
    };
  }

  /**
   * Did mount
   */
  componentDidMount() {
    EventEmitter.on(NAVIGATOR_USER_ADDRESS_BUTTON_CLICK, this.saveAddress);
  }

  /**
   * Update state with next props.
   * @param {Object} nextProps The next props.
   */
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.validationErrors).length) {
      this.setState({ errors: nextProps.validationErrors });
    }

    EventEmitter.emit(nextProps.address.id ?
      NAVIGATOR_USER_ADDRESS_BUTTON_SHOW :
      NAVIGATOR_USER_ADDRESS_BUTTON_HIDE);

    EventEmitter.emit(nextProps.disabled ?
      NAVIGATOR_USER_ADDRESS_BUTTON_DISABLE :
      NAVIGATOR_USER_ADDRESS_BUTTON_ENABLE);
  }

  /**
   * Will unmount
   */
  componentWillUnmount() {
    EventEmitter.off(NAVIGATOR_USER_ADDRESS_BUTTON_CLICK, this.saveAddress);
    EventEmitter.emit(NAVIGATOR_USER_ADDRESS_BUTTON_HIDE);
  }

  updateAddress = (address) => {
    this.setState({
      address: {
        ...this.state.address,
        ...address,
      },
    }, this.state.inlineValidation ? this.validateInline : null);
  }

  deleteAddress = () => this.props.deleteAddress(this.props.address.id)

  validateInline = () => {
    const errors = this.props.validateAddress(this.state.address);
    this.setState({
      errors,
    });
    EventEmitter.emit(Object.keys(errors).length ?
      NAVIGATOR_USER_ADDRESS_BUTTON_DISABLE :
      NAVIGATOR_USER_ADDRESS_BUTTON_ENABLE);
  }

  handleTitleChange = (title) => {
    this.updateAddress({ title });
  }
  handlePrefixChange = (prefix) => {
    this.updateAddress({ prefix });
  }
  handleFirstNameChange = (firstName) => {
    this.updateAddress({ firstName });
  }
  handleMiddleNameChange = (middleName) => {
    this.updateAddress({ middleName });
  }
  handleLastNameChange = (lastName) => {
    this.updateAddress({ lastName });
  }
  handleSuffixChange = (suffix) => {
    this.updateAddress({ suffix });
  }
  handleCompanyChange = (company) => {
    this.updateAddress({ company });
  }
  handlePhoneChange = (phone) => {
    this.updateAddress({ phone });
  }

  handleStreet1Change = (street1) => {
    this.updateAddress({ street1 });
  }
  handleStreet2Change = (street1) => {
    this.updateAddress({ street1 });
  }

  handleCityChange = (city) => {
    this.updateAddress({ city });
  }

  handleZipCodeChange = (zipCode) => {
    this.updateAddress({ zipCode });
  }

  handleCountryChange = (country) => {
    let province = null;
    if (!countries[country].hideProvince) {
      [province] = Object.keys(provincesList(country));
    }
    this.updateAddress({
      country,
      province,
    });
  }

  handleProvinceChange = (province) => {
    this.updateAddress({ province });
  }

  handleMakeDefault = (makeDefault, tag) => {
    const defaultTag = tag === 'default' ? tag : `default_${tag}`;
    if (makeDefault) {
      this.updateAddress({ tags: [...this.state.address.tags, defaultTag] });
    } else {
      this.updateAddress({
        tags: this.state.address.tags.filter(t => t !== defaultTag),
      });
    }
  }

  saveAddress = () => {
    const errors = this.props.validateAddress(this.state.address);
    this.setState({
      inlineValidation: true,
      errors,
    });

    if (Object.keys(errors).length > 0) {
      EventEmitter.emit(NAVIGATOR_USER_ADDRESS_BUTTON_DISABLE);
      return;
    }

    if (this.props.address.id) {
      // Join with origin and update
      this.props.updateAddress({
        ...this.props.address,
        ...this.state.address,
      });
    } else {
      this.props.addAddress(this.state.address);
    }
  }

  /**
   * Render text field of form
   * @param {string} name field name
   * @param {function} changeHandler change handler
   * @return {JSX|null}
   */
  renderTextField(name, changeHandler) {
    if (!addressFields.includes(name)) {
      return null;
    }
    return (
      <TextField
        name={name}
        label={`address.${name}`}
        onChange={changeHandler}
        value={this.state.address[name]}
        errorText={this.state.errors[name]}
      />
    );
  }

  /**
   * @return {*}
   */
  render() {
    return (
      <Fragment>

        <Portal name={portals.USER_ADDRESS_FORM_BEFORE} />
        <Portal name={portals.USER_ADDRESS_FORM}>

          <div className={style.fields}>

            {this.renderTextField('title', this.handleTitleChange)}
            {this.renderTextField('prefix', this.handlePrefixChange)}
            {this.renderTextField('firstName', this.handleFirstNameChange)}
            {this.renderTextField('middleName', this.handleMiddleNameChange)}
            {this.renderTextField('lastName', this.handleLastNameChange)}
            {this.renderTextField('suffix', this.handleSuffixChange)}
            {this.renderTextField('phone', this.handlePhoneChange)}
            {this.renderTextField('company', this.handleCompanyChange)}
            {this.renderTextField('street1', this.handleStreet1Change)}
            {this.renderTextField('street2', this.handleStreet2Change)}
            {this.renderTextField('zipCode', this.handleZipCodeChange)}
            {this.renderTextField('city', this.handleCityChange)}

            {addressFields.includes('country') &&
            <Fragment>
              <Select
                name="country"
                placeholder="placeholder"
                label="address.country"
                options={this.countriesList}
                value={this.state.address.country}
                onChange={this.handleCountryChange}
                errorText={this.state.errors.country}
              />
              {this.state.address.country &&
              !countries[this.state.address.country].hideProvince &&
              <Select
                name="province"
                placeholder="placeholder"
                label="address.province"
                options={provincesList(this.state.address.country)}
                value={this.state.address.province || ''}
                onChange={this.handleProvinceChange}
                errorText={this.state.errors.province}
              />
            }
            </Fragment>
          }

          </div>

          <div className={style.options}>
            {/* Delete address button */}
            {this.props.address.id &&
              <Button
                className={style.deleteAddressButton}
                onClick={this.deleteAddress}
                flat
                wrapContent={false}
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
                  <RippleButton
                    type="secondary"
                    disabled={this.props.disabled}
                    onClick={this.saveAddress}
                    className={style.saveAddressButton}
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
