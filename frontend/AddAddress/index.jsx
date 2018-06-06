import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import connect from './connector';
import styles from './../Register/style';
import countries from './countries';

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
    };
  }

  setAddress = (address) => {
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
    this.setAddress({ firstName });
  }
  handleLastNameChange = (lastName) => {
    this.setAddress({ lastName });
  }
  handleStreetChange = (street) => {
    this.setAddress({ street });
  }
  handleCityChange = (city) => {
    this.setAddress({ city });
  }
  handleZipCodeChange = (zipCode) => {
    this.setAddress({ zipCode });
  }

  handleSelectChange = ({ target }) => {
    this.setAddress({ [target.name]: target.value });
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    this.setState({ disabled: true });
    this.props.addAddress(this.state.address);
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
          {/* @TODO add materail or native select for country selection */}
          <select name="countryCode" onChange={this.handleSelectChange}>
            <option value="" key="country"><I18n.Text string="address.add.countryCode" /></option>
            {
              Object.keys(countries).map(countryCode => (
                <option value={countryCode} key={countryCode}>{countries[countryCode].name}</option>
              ))
            }
          </select>
          {/* @TODO add materail or native select for country selection */}
          {this.state.address.countryCode &&
            <div><br />
              <select name="provinceCode" onChange={this.handleSelectChange}>
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
            value={this.state.zipCode}
            errorText={this.state.errors.zipCode}
          />
          <div data-test-id="AddAddressButton">
            <RippleButton type="secondary" disabled={this.state.disabled} onClick={this.handleSubmitForm}>
              <I18n.Text string="address.add.button" />
            </RippleButton>
          </div>
        </section>
      </View>
    );
  }
}

export default connect(AddAddress);
