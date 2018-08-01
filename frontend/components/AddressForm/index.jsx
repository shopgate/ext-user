import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import Select from '@shopgate/pwa-ui-shared/Form/Select';
import MakeBilling from '@shopgate/user/components/MakeBilling';
import connect from './connector';
import countries from './countries';
import styles from './style';

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
class AddressForm extends Component {
  static propTypes = {
    addressType: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
    validateAddress: PropTypes.func.isRequired,
    disableBilling: PropTypes.bool,
  }

  static defaultProps = {
    disableBilling: false,
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
        firstName: '',
        lastName: '',
        street1: '',
        city: '',
        province,
        country,
        zipCode: '',
        tags: [props.addressType],
      },
      errors: {
        firstName: '',
        lastName: '',
        street1: '',
        city: '',
        province: '',
        country: '',
        zipCode: '',
      },
      disabled: false,
      makeBilling: false,
      inlineValidation: false,
    };
  }

  updateAddress = (address) => {
    this.setState({
      address: {
        ...this.state.address,
        ...address,
      },
    }, this.state.inlineValidation ? this.validateInline : null);
  }

  validateInline = () => {
    const errors = this.props.validateAddress(this.state.address);
    this.setState({
      errors,
      disabled: !!Object.keys(errors).length,
    });
  }

  handleFirstNameChange = (firstName) => {
    this.updateAddress({ firstName });
  }

  handleLastNameChange = (lastName) => {
    this.updateAddress({ lastName });
  }

  handleStreetChange = (street1) => {
    this.updateAddress({ street1 });
  }

  handleCityChange = (city) => {
    this.updateAddress({ city });
  }

  handleZipCodeChange = (zipCode) => {
    this.updateAddress({ zipCode });
  }

  handleCountryCode = (country) => {
    let province = null;
    if (!countries[country].hideProvince) {
      [province] = Object.keys(provincesList(country));
    }
    this.updateAddress({
      country,
      province,
    });
  }

  handleProvinceCode = (province) => {
    this.updateAddress({ province });
  }

  handleMakeBilling = (makeBilling) => {
    this.setState({ makeBilling });
  }

  saveAddress = () => {
    const errors = this.props.validateAddress(this.state.address);
    this.setState({
      inlineValidation: true,
      disabled: true,
      errors,
    });

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (this.state.makeBilling) {
      this.state.address.tags.push('billing');
    }
    this.props.submit(this.state.address);
  }

  /**
   * @return {*}
   */
  render() {
    const isShipping = this.props.addressType === 'shipping';

    return (
      <Fragment>
        <TextField
          name="firstName"
          label="address.add.firstName"
          onChange={this.handleFirstNameChange}
          value={this.state.address.firstName}
          errorText={this.state.errors.firstName}
        />
        <TextField
          name="lastName"
          label="address.add.lastName"
          onChange={this.handleLastNameChange}
          value={this.state.address.lastName}
          errorText={this.state.errors.lastName}
        />
        <TextField
          name="street"
          label="address.add.street"
          onChange={this.handleStreetChange}
          value={this.state.address.street1}
          errorText={this.state.errors.street1}
        />
        <TextField
          name="city"
          label="address.add.city"
          onChange={this.handleCityChange}
          value={this.state.address.city}
          errorText={this.state.errors.city}
        />
        <Select
          name="countryCode"
          placeholder="placeholder"
          label="address.add.countryCode"
          options={this.countriesList}
          value={this.state.address.country}
          onChange={this.handleCountryCode}
          errorText={this.state.errors.country}
        />
        {this.state.address.country &&
          !countries[this.state.address.country].hideProvince &&
            <Select
              name="provinceCode"
              placeholder="placeholder"
              label="address.add.provinceCode"
              options={provincesList(this.state.address.country)}
              value={this.state.address.province || ''}
              onChange={this.handleProvinceCode}
              errorText={this.state.errors.province}
            />
        }
        <TextField
          name="zipCode"
          label="address.add.zipCode"
          onChange={this.handleZipCodeChange}
          value={this.state.address.zipCode}
          errorText={this.state.errors.zipCode}
        />

        <Portal name="user.address.add.after" />

        {isShipping && !this.props.disableBilling &&
          <MakeBilling handleMakeBilling={this.handleMakeBilling} />}

        <div data-test-id="AddAddressButton">
          <RippleButton type="secondary" disabled={this.state.disabled} onClick={this.saveAddress} className={styles.button}>
            <I18n.Text string="address.add.button" />
          </RippleButton>
        </div>
      </Fragment>
    );
  }
}

export default connect(AddressForm);
