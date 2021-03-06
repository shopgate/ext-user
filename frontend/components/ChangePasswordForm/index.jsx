import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import Grid from '@shopgate/pwa-common/components/Grid';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import buildValidationErrorList from '@shopgate/pwa-ui-shared/Form/Builder/builders/buildValidationErrorList';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import TextField from '@shopgate/pwa-ui-shared/Form/TextField';
import Password from '@shopgate/pwa-ui-shared/Form/Password';
import { UIEvents } from '@shopgate/pwa-core';
import * as portals from '../../constants/Portals';
import * as events from '../../constants/EventTypes';
import connect from './connector';
import styles from './style';

const isIos = themeName.includes('ios');

/**
 * User form component
*/
class ChangePasswordForm extends Component {
  static propTypes = {
    cancel: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
    validatePassword: PropTypes.func.isRequired,
    validationErrors: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      message: PropTypes.string,
    })),
  }

  static defaultProps = {
    validationErrors: [],
  }

  /**
   * Initializes the component.
   * @param {Object} props The components props.
   */
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      user: {
        password: '',
        oldPassword: '',
        repeatPassword: '',
      },
      errors: buildValidationErrorList(props.validationErrors),
      inlineValidation: false,
    };
  }

  componentDidMount = () => {
    if (isIos) {
      this.registerSaveButton();
    }
  }

  // noinspection JSCheckFunctionSignatures
  /**
   * Update state with next props (on successful or failed "update" with backend validation errors).
   * @param {Object} nextProps The next props.
   */
  componentWillReceiveProps(nextProps) {
    // Check if backend validation errors came in to be displayed (only available on profile page)
    const newState = {
      ...this.state,
    };

    // Detect if new validation errors came in
    const newValidationErrors = buildValidationErrorList(nextProps.validationErrors);
    if (!isEqual(this.state.errors, newValidationErrors)) {
      newState.errors = {
        ...this.state.errors,
        ...newValidationErrors,
      };
    }

    const hasErrors = Object.keys(newState.errors).length > 0;

    // Enable or disable the inline validation (disabled when form is first displayed)
    newState.inlineValidation = hasErrors;

    // Disable save button on validation errors
    newState.disabled = hasErrors;

    // Send changes to React to handle component update
    this.setState(newState);
  }

  componentWillUnmount = () => {
    if (isIos) {
      UIEvents.removeAllListeners(events.APP_BAR_SAVE_BUTTON_CLICK);
    }
  }

  /**
   * @returns {boolean}
   */
  enableSaveButton = () => UIEvents.emit(events.APP_BAR_SAVE_BUTTON_ENABLE);
  /**
   * @returns {boolean}
   */
  disableSaveButton = () => UIEvents.emit(events.APP_BAR_SAVE_BUTTON_DISABLE);
  /**
   * @returns {boolean}
   */
  registerSaveButton = () => UIEvents
    .addListener(events.APP_BAR_SAVE_BUTTON_CLICK, this.updatePassword);

  /**
   * Takes an object to add into the state
   * @param {Object} field field
   */
  handleFormUpdate = (field) => {
    this.setState({
      user: {
        ...this.state.user,
        ...field,
      },
    }, this.validateInline);
  }

  /**
   * Triggers validation of the user fields in the state and updates the "error" field in the state.
   */
  validateInline = () => {
    // Inline validation is only enabled after the first form submit
    if (!this.state.inlineValidation) {
      // Enable the save button as soon as all fields are set for better usability (no validation)
      const newState = {
        disabled: this.state.user.password === ''
          || this.state.user.oldPassword === ''
          || this.state.user.repeatPassword === '',
      };

      if (isIos) {
        if (!newState.disabled) {
          this.enableSaveButton();
        } else {
          this.disableSaveButton();
        }
      }
      this.setState(newState);

      return;
    }

    // Check validation whenever inline validation is active (on form submit)
    const errors = this.props.validatePassword(this.state.user);
    const disabled = Object.keys(errors).length > 0;
    this.setState({
      errors,
      disabled,
    });
    if (isIos) {
      if (disabled) {
        this.disableSaveButton();
      } else {
        this.enableSaveButton();
      }
    }
  }

  /**
   * Forwards the save action to update the given password.
   */
  updatePassword = () => {
    const errors = this.props.validatePassword(this.state.user);
    const hasErrors = Object.keys(errors).length > 0;
    this.setState({
      inlineValidation: hasErrors,
      errors,
      disabled: true,
    });
    if (isIos) {
      this.disableSaveButton();
    }

    if (Object.keys(errors).length > 0) {
      return;
    }

    const { password, oldPassword } = this.state.user;
    this.props.updatePassword({
      password,
      oldPassword,
    });
  }

  /**
   * @return {JSX}
   */
  render() {
    const { cancel } = this.props;
    return (
      <Fragment>
        <Portal name={portals.USER_PASSWORD_FORM_BEFORE} />
        <Portal name={portals.USER_PASSWORD_FORM}>

          <TextField
            name="oldPassword"
            type="password"
            label="password.current"
            value={this.state.user.oldPassword}
            onChange={(oldPassword) => { this.handleFormUpdate({ oldPassword }); }}
            errorText={this.state.errors.oldPassword}
          />

          <Password
            name="password"
            label="password.new"
            value={this.state.user.password}
            onChange={(password) => { this.handleFormUpdate({ password }); }}
            errorText={this.state.errors.password}
          />

          <Password
            name="repeatPassword"
            label="password.repeat"
            value={this.state.user.repeatPassword}
            onChange={(repeatPassword) => { this.handleFormUpdate({ repeatPassword }); }}
            errorText={this.state.errors.repeatPassword}
          />

          {!isIos &&
            <Grid className={styles.buttons}>
              <Grid.Item grow={1} />
              <Grid.Item grow={0}>
                <RippleButton type="regular" onClick={cancel}>
                  <I18n.Text string="common.cancel" />
                </RippleButton>
              </Grid.Item>
              <Grid.Item grow={0}>
                <RippleButton type="secondary" disabled={this.state.disabled} onClick={this.updatePassword}>
                  <I18n.Text string="password.save" />
                </RippleButton>
              </Grid.Item>
            </Grid>
          }

        </Portal>
        <Portal name={portals.USER_PASSWORD_FORM_AFTER} />
      </Fragment>
    );
  }
}

export default connect(ChangePasswordForm);
