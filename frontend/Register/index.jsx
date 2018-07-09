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
    validateUser: PropTypes.func.isRequired,
  }

  static contextTypes = {
    i18n: PropTypes.func,
  };

  /**
   * @param {Object} props props
   */
  constructor(props) {
    super(props);

    this.state = {
      user: {
        mail: '',
        password: '',
        firstName: '',
        lastName: '',
      },
      errors: {
        mail: '',
        password: '',
        firstName: '',
        lastName: '',
      },
      disabled: false,
      inlineValidation: false,
    };
  }

  /**
   * Returns the translated view title.
   * @return {string}
   */
  get title() {
    const { __ } = this.context.i18n();
    return __('register.title');
  }

  updateUser = (user) => {
    this.setState({
      user: {
        ...this.state.user,
        ...user,
      },
    }, this.state.inlineValidation ? this.validate : null);
  }

  validate = () => {
    const errors = this.props.validateUser(this.state.user);
    this.setState({
      errors,
      disabled: !!Object.keys(errors).length,
    });
  }

  handleMailChange = (mail) => {
    this.updateUser({ mail });
  }
  handlePasswordChange = (password) => {
    this.updateUser({ password });
  }
  handleFirstNameChange = (firstName) => {
    this.updateUser({ firstName });
  }
  handleLastNameChange = (lastName) => {
    this.updateUser({ lastName });
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    const errors = this.props.validateUser(this.state.user);
    this.setState({
      errors,
      inlineValidation: true,
      disabled: true,
    });
    if (Object.keys(errors).length > 0) {
      return;
    }
    this.props.register(this.state.user);
  }

  /**
   * @return {*}
   */
  render() {
    // eslint-disable-next-line react/prop-types
    const { View } = this.props;
    return (
      <View title={this.title}>
        <section className={styles.container} data-test-id="RegisterPage">
          <div className={styles.subline}>
            <I18n.Text string="register.subTitle" />
          </div>
          <form onSubmit={this.handleSubmitForm}>
            <TextField
              type="text"
              name="firstName"
              label="register.firstName"
              onChange={this.handleFirstNameChange}
              value={this.state.user.firstName}
              errorText={this.state.errors.firstName}
            />
            <TextField
              type="text"
              name="lastName"
              label="register.lastName"
              onChange={this.handleLastNameChange}
              value={this.state.user.lastName}
              errorText={this.state.errors.lastName}
            />
            <TextField
              type="email"
              label="register.mail"
              name="mail"
              onChange={this.handleMailChange}
              value={this.state.user.mail}
              errorText={this.state.errors.mail}
            />
            <TextField
              type="password"
              name="password"
              label="register.password"
              minLength={8}
              onChange={this.handlePasswordChange}
              value={this.state.user.password}
              errorText={this.state.errors.password}
            />
            <div data-test-id="RegisterButton" className={styles.buttonWrapper}>
              <RippleButton type="secondary" disabled={this.state.disabled} className={styles.button}>
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
