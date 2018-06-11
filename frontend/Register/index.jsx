import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import connect from './connector';
import styles from './style';

// eslint-disable-next-line valid-jsdoc
/**
 * Register component
 */
class Register extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
  };

  /**
   * @param {Object} props props
   */
  constructor(props) {
    super(props);

    this.state = {
      mail: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }

  handleMailChange = (mail) => {
    this.setState({ mail });
  }
  handlePasswordChange = (password) => {
    this.setState({ password });
  }
  handleFirstNameChange = (firstName) => {
    this.setState({ firstName });
  }
  handleLastNameChange = (lastName) => {
    this.setState({ lastName });
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    this.props.register(this.state);
  }

  /**
   * @return {*}
   */
  render() {
    // eslint-disable-next-line react/prop-types
    const { View } = this.props;
    return (
      <View>
        <section className={styles.container} data-test-id="RegisterPage">
          <div className={styles.headline}>
            <I18n.Text string="register.title" />
          </div>
          <div className={styles.subline}>
            <I18n.Text string="register.subTitle" />
          </div>
          <form onSubmit={this.handleSubmitForm}>
            <TextField
              type="email"
              label="register.mail"
              name="mail"
              onChange={this.handleMailChange}
              value={this.state.mail}
            />
            <TextField
              type="password"
              name="password"
              label="register.password"
              minLength={8}
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
            <TextField
              type="text"
              name="firstName"
              label="register.firstName"
              onChange={this.handleFirstNameChange}
              value={this.state.firstName}
            />
            <TextField
              type="text"
              name="lastName"
              label="register.lastName"
              onChange={this.handleLastNameChange}
              value={this.state.lastName}
            />
            <div data-test-id="RegisterButton">
              <RippleButton type="secondary" disabled={this.props.disabled}>
                <I18n.Text string="register.button" />
              </RippleButton>
            </div>
          </form>
        </section>
      </View>
    );
  }
}

export default connect(Register);
