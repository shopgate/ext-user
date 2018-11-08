import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import buildValidationErrorList from '@shopgate/pwa-ui-shared/Form/Builder/builders/buildValidationErrorList';
import TextField from '@shopgate/pwa-ui-shared/Form/TextField';
import LockIcon from '@shopgate/pwa-ui-shared/icons/LockIcon';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import * as portals from '../../constants/Portals';
import EventEmitter from '../../events/emitter';
import * as events from '../../constants/EventTypes';
import { USER_PASSWORD_PATH } from '../../constants/RoutePaths';
import connect from './connector';
import styles from './style';

/**
 * User form component
 */
class UserForm extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.shape().isRequired,
    validateUser: PropTypes.func.isRequired,
    register: PropTypes.bool,
    validationErrors: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      message: PropTypes.string,
    })),
  }

  static defaultProps = {
    register: false,
    validationErrors: [],
  }

  /**
   * Initializes the component.
   * @param {Object} props The components props.
   */
  constructor(props) {
    super(props);

    this.state = {
      disabled: !this.props.register,
      hasChanges: false,
      user: {
        ...this.filterUserProfileData(this.props.user),
      },
      errors: buildValidationErrorList(props.validationErrors),
      // Inline validation is activated on the first click on the "save" or "register" button
      inlineValidation: false,
    };

    if (!props.register) {
      // On the user profile edit page the save button shows up in greyed out state initially
      EventEmitter.on(events.NAVIGATOR_SAVE_BUTTON_CLICK, this.saveUserData);
      EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_SHOW);
      EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_DISABLE);
    }
  }

  /**
   * Update state with next props (on successful or failed "update" with backend validation errors).
   * @param {Object} nextProps The next props.
   */
  componentWillReceiveProps(nextProps) {
    // Check if backend validation errors came in to be displayed (only available on profile page)
    if (!this.props.register) {
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

      // Check for user data changes
      const hasChanges = !Object.keys(this.state.user)
        .every(key => this.state.user[key] === nextProps.user[key]);

      // Disable top right "save" button if no changes or validation errors set
      newState.disabled = hasErrors || !hasChanges;

      // Avoid disabling the already disabled button
      if (this.state.disabled !== newState.disabled) {
        EventEmitter.emit(newState.disabled ?
          events.NAVIGATOR_SAVE_BUTTON_DISABLE :
          events.NAVIGATOR_SAVE_BUTTON_ENABLE);
      }

      // Send changes to React to handle component update
      this.setState(newState);
    }
  }

  /**
   * @param {Object} userData The user data to filter from
   * @returns {{firstName: string, lastName: string, mail: string, password: string}}
   */
  filterUserProfileData = userData => ({
    firstName: userData.firstName,
    lastName: userData.lastName,
    mail: userData.mail,
    password: '',
  });

  // Checks if the user input contains any changes to the previous state and
  handleInputChange = (field, value) => {
    if (this.state[field] !== value) {
      this.updateForm({ [field]: value });
    }
  }

  /**
   * This function should only be called if there actually are any form data changes.
   * @param {Object} user The new user data
   */
  updateForm = (user) => {
    const newState = {
      ...this.state,
      user: {
        ...this.state.user,
        ...user,
      },
    };

    // Check for validation errors if activated.
    let hasErrors = false;
    if (this.state.inlineValidation) {
      newState.errors = this.props.validateUser(newState.user, !this.props.register);
      hasErrors = Object.keys(newState.errors).length > 0;
    }

    // Handle en-/disabling of the register and save buttons
    if (!this.props.register) {
      // Use only relevant data for the differences detection
      const userProps = this.filterUserProfileData(this.props.user);

      // Disabled state of the top right button is controlled by changes to init state and errors
      const hasChanges = !Object.keys(newState.user)
        .every(key => newState.user[key] === userProps[key]);
      newState.disabled = hasErrors || !hasChanges;

      if (this.state.disabled !== newState.disabled) {
        EventEmitter.emit(newState.disabled ?
          events.NAVIGATOR_SAVE_BUTTON_DISABLE :
          events.NAVIGATOR_SAVE_BUTTON_ENABLE);
      }
    } else {
      // Disabled state is only controlled by errors being there or not
      newState.disabled = hasErrors;
    }

    this.setState(newState);
  }

  /**
   * Handles the "Register" and "Save" button clicks. It also checks for validation errors.
   */
  saveUserData = () => {
    /* Disabling the button on errors here is okay, because it must have been active before
       to receive this action! */
    const errors = this.props.validateUser(this.state.user, !this.props.register);
    const hasErrors = Object.keys(errors).length > 0;
    this.setState({
      inlineValidation: hasErrors,
      errors,
      disabled: true,
    });

    // Deactivate the top right "save" button on the edit profile page
    if (!this.props.register) {
      EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_DISABLE);
    }

    // Abort updating user data on validation errors.
    if (hasErrors) {
      return;
    }

    // No validation errors on the frontend side => trigger sending data to the backend.
    if (this.props.register) {
      this.props.registerUser(this.state.user);
    } else {
      this.props.updateUser(this.state.user);
    }
  }

  /**
   * Render text field of form
   * @param {string} name field name
   * @param {?string} type field type
   * @return {JSX}
   */
  renderTextField(name, type = 'text') {
    return (
      <div className={styles.fieldWrapper}>
        <TextField
          name={name}
          type={type}
          label={`user.${name}`}
          onChange={value => this.handleInputChange(name, value)}
          value={this.state.user[name]}
          errorText={this.state.errors[name]}
        />
      </div>
    );
  }

  /**
   * @return {*}
   */
  render() {
    const { register } = this.props;
    return (
      <Fragment>
        <Portal name={portals.USER_FORM_BEFORE} />
        <Portal name={portals.USER_FORM}>

          {this.renderTextField('firstName')}
          {this.renderTextField('lastName')}
          {this.renderTextField('mail')}

          { /* The reister form has an additional "password" field and a "register" button. */ }
          {register &&
            <Fragment>
              {this.renderTextField('password', 'password')}

              <div data-test-id="RegisterButton" className={styles.buttonWrapper}>
                <RippleButton type="secondary" disabled={this.state.disabled} className={styles.button} onClick={this.saveUserData}>
                  <I18n.Text string="register.button" />
                </RippleButton>
              </div>
            </Fragment>
          }

          { /* The user profile editing form shows a "locked" password field and a text
               link to change it. */ }
          {!register &&
            <Fragment>
              <div className={styles.fieldWrapperDisabled}>
                <TextField
                  className={styles.noPad}
                  name="password"
                  type="password"
                  label="user.password"
                  value="**********"
                  disabled
                  rightElement={<LockIcon size="24" />}
                />
              </div>
              <div className={styles.fieldWrapper}>
                <Link
                  href={USER_PASSWORD_PATH}
                  className={styles.changePasswordButton}
                >
                  <I18n.Text string="password.update" />
                </Link>
              </div>
            </Fragment>
          }

        </Portal>
        <Portal name={portals.USER_FORM_AFTER} />
      </Fragment>
    );
  }
}

export { UserForm as UnwrappedUserForm };
export default connect(UserForm);
