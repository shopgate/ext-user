import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import connect from './connector';
import styles from './../Register/style';

// eslint-disable-next-line valid-jsdoc
/**
 * Add user address component
 */
class AddAddress extends Component {
  static propTypes = {
    addAddress: PropTypes.func.isRequired,
    validateAddress: PropTypes.func.isRequired,
  }

  /**
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      provinceCode: '',
      countryCode: '',
      zipCode: '',
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
    };
  }

  validate = () => {
    const { errors, disabled, ...address } = this.state;
    const validateErrors = this.props.validateAddress(address);
    this.setState({
      errors: validateErrors,
      disabled: !!Object.keys(validateErrors).length,
    });
  }

  handleFirstNameChange = (firstName) => {
    this.setState({ firstName }, () => this.validate());
  }
  handleLastNameChange = (lastName) => {
    this.setState({ lastName }, () => this.validate());
  }
  handleStreetChange = (street) => {
    this.setState({ street }, () => this.validate());
  }
  handleCityChange = (city) => {
    this.setState({ city }, () => this.validate());
  }
  handleCountryCodeChange = (countryCode) => {
    this.setState({ countryCode }, () => this.validate());
  }
  handleZipCodeChange = (zipCode) => {
    this.setState({ zipCode }, () => this.validate());
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { errors, disabled, ...address } = this.state;
    this.setState({ disabled: true });
    this.props.addAddress(address);
  }

  /**
   * @return {*}
   */
  render() {
    // eslint-disable-next-line react/prop-types
    const { View } = this.props;
    return (
      <View>
        <section className={styles.container} data-test-id="AddAddressPage">
          <div>
            <I18n.Text string="address.add.pageTitle" />
          </div>
          <form onSubmit={this.handleSubmitForm}>
            <TextField
              name="firstName"
              label="address.add.firstName"
              onChange={this.handleFirstNameChange}
              value={this.state.firstName}
              errorText={this.state.errors.firstName}
            />
            <TextField
              name="lastName"
              label="address.add.lastName"
              onChange={this.handleLastNameChange}
              value={this.state.lastName}
              errorText={this.state.errors.lastName}
            />
            <TextField
              name="street"
              label="address.add.street"
              onChange={this.handleStreetChange}
              value={this.state.street}
              errorText={this.state.errors.street}
            />
            <TextField
              name="city"
              label="address.add.city"
              onChange={this.handleCityChange}
              value={this.state.city}
              errorText={this.state.errors.city}
            />
            <TextField
              name="countryCode"
              label="address.add.countryCode"
              onChange={this.handleCountryCodeChange}
              value={this.state.countryCode}
              errorText={this.state.errors.countryCode}
            />
            <TextField
              name="zipCode"
              label="address.add.zipCode"
              onChange={this.handleZipCodeChange}
              value={this.state.zipCode}
              errorText={this.state.errors.zipCode}
            />
            <div data-test-id="AddAddressButton">
              <RippleButton type="secondary" disabled={this.state.disabled}>
                <I18n.Text string="address.add.button" />
              </RippleButton>
            </div>
          </form>
        </section>
      </View>
    );
  }
}

export default connect(AddAddress);
