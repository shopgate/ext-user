import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '@shopgate/pwa-common/context';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import MakeBilling from './../components/MakeBilling';
import connect from './connector';
import countries from './countries';
import styles from './style';

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

    this.state = {
      address: {
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        provinceCode: '',
        countryCode: '',
        zipCode: '',
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
      disabled: true,
      makeBilling: false,
    };
  }

  updateAddress = (address) => {
    this.setState({
      address: {
        ...this.state.address,
        ...address,
      },
    }, () => this.validate());
  }

  validate = () => {
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

  handleSelectChange = ({ target }) => {
    this.updateAddress({ [target.name]: target.value });
  }

  handleCountryCode = ({ target }) => {
    // Force a province code to be selected if there are any available for the selected country
    this.updateAddress({
      [target.name]: target.value,
      provinceCode: countries[target.value].hideProvince ? null : '',
    });
  }

  handleMakeBilling = (makeBilling) => {
    this.setState({ makeBilling });
  }

  saveAddress = () => {
    this.setState({ disabled: true });
    this.props.addAddress(this.state.address, this.props.addressType, this.state.makeBilling);
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
            <div className={styles.title}>
              <I18n.Text string="address.add.title" />
            </div>
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
            {/* @TODO add material or native select for country selection */}
            <select name="countryCode" onChange={this.handleCountryCode} className={styles.select}>
              <option value="" key="country"><I18n.Text string="address.add.countryCode" /></option>
              {
                Object.keys(countries).map(countryCode => (
                  <option value={countryCode} key={countryCode}>
                    {countries[countryCode].name}
                  </option>
                ))
              }
            </select>
            {/* @TODO add materail or native select for country selection */}
            {this.state.address.countryCode &&
            !countries[this.state.address.countryCode].hideProvince &&
            <div>
              <select name="provinceCode" onChange={this.handleSelectChange} className={styles.select}>
                <option value="" key="province"><I18n.Text string="address.add.provinceCode" /></option>
                {
                  Object.keys(countries[this.state.address.countryCode].divisions)
                    .map(provinceId => (
                      <option value={provinceId} key={provinceId}>
                        {countries[this.state.address.countryCode].divisions[provinceId]}
                      </option>
                    ))
                }
              </select>
            </div>
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
