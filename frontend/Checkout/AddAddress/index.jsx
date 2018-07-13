import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '@shopgate/pwa-common/context';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import Select from '@shopgate/pwa-ui-shared/Form/Select';
import MakeBilling from './../components/MakeBilling';
import Title from './../components/Title';
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
 * Add user address component
 */
class AddAddress extends Component {
  static propTypes = {
    addAddress: PropTypes.func.isRequired,
    addressType: PropTypes.string.isRequired,
    validateAddress: PropTypes.func.isRequired,
  }

  /**
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.countriesList = countriesList();
    const countryCode = Object.keys(this.countriesList)[0];
    const provinceCode = Object.keys(provincesList(countryCode))[0];

    this.state = {
      address: {
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        provinceCode,
        countryCode,
        zipCode: '',
        tags: [props.addressType],
      },
      errors: {
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        provinceCode: '',
        countryCode: '',
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

  handleStreetChange = (street) => {
    this.updateAddress({ street });
  }

  handleCityChange = (city) => {
    this.updateAddress({ city });
  }

  handleZipCodeChange = (zipCode) => {
    this.updateAddress({ zipCode });
  }

  handleCountryCode = (countryCode) => {
    let provinceCode = null;
    if (!countries[countryCode].hideProvince) {
      [provinceCode] = Object.keys(provincesList(countryCode));
    }
    this.updateAddress({
      countryCode,
      provinceCode,
    });
  }

  handleProvinceCode = (provinceCode) => {
    this.updateAddress({ provinceCode });
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
    this.props.addAddress(this.state.address);
  }

  /**
   * @return {*}
   */
  render() {
    // eslint-disable-next-line react/prop-types
    const { View } = this.props;
    const isShipping = this.props.addressType === 'shipping';

    return (
      <AppContext.Provider value={{ updateAddress: this.updateAddress }}>
        <View>
          <section className={styles.page} data-test-id="AddAddressPage">
            <Title className={styles.title} title={isShipping ? 'checkout.shipping.address.title' : 'checkout.billing.address.title'} />
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
              value={this.state.address.street}
              errorText={this.state.errors.street}
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
              value={this.state.address.countryCode}
              onChange={this.handleCountryCode}
              errorText={this.state.errors.countryCode}
            />
            {this.state.address.countryCode &&
            !countries[this.state.address.countryCode].hideProvince &&
              <Select
                name="provinceCode"
                placeholder="placeholder"
                label="address.add.provinceCode"
                options={provincesList(this.state.address.countryCode)}
                value={this.state.address.provinceCode || ''}
                onChange={this.handleProvinceCode}
                errorText={this.state.errors.provinceCode}
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

            {isShipping && <MakeBilling handleMakeBilling={this.handleMakeBilling} />}

            <div data-test-id="AddAddressButton">
              <RippleButton type="secondary" disabled={this.state.disabled} onClick={this.saveAddress} className={styles.button}>
                <I18n.Text string="address.add.button" />
              </RippleButton>
            </div>
          </section>
        </View>
      </AppContext.Provider>
    );
  }
}

export default connect(AddAddress);
