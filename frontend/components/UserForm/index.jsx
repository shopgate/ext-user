import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import * as portals from '../../constants/Portals';
import EventEmitter from '../../events/emitter';
import * as events from '../../constants/EventTypes';
import connect from './connector';
import styles from './style';

// eslint-disable-next-line valid-jsdoc
/**
 * User form component
 */
class UserForm extends Component {
  static propTypes = {
    isRegister: PropTypes.bool.isRequired,
    registerUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.shape().isRequired,
    validateUser: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    validationErrors: PropTypes.shape(),
  }

  static defaultProps = {
    disabled: false,
    validationErrors: {},
  }

  /**
   * Initializes the component.
   * @param {Object} props The components props.
   */
  constructor(props) {
    super(props);

    this.state = {
      disabled: props.disabled,
      hasChanges: false,
      user: {
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        mail: props.user.mail,
        password: '',
      },
      errors: {
        ...props.validationErrors,
      },
      inlineValidation: false,
    };
  }

  /**
   * Did mount
   */
  componentDidMount() {
    EventEmitter.on(events.NAVIGATOR_SAVE_BUTTON_CLICK, this.saveUser);
    if (!this.props.isRegister) {
      EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_SHOW);
    }
  }

  /**
   * Update state with next props.
   * @param {Object} nextProps The next props.
   */
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.validationErrors).length) {
      this.setState({ errors: nextProps.validationErrors });
    }

    if (!this.props.isRegister) {
      EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_DISABLE);
    }

    // Enable / Disable navigation button based on disabled prop.
    if (nextProps.disabled && !this.props.disabled) {
      EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_DISABLE);
    } else if (!nextProps.disabled && this.props.disabled) {
      EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_ENABLE);
    }

    this.setState({ disabled: nextProps.disabled });
  }

  updateUser = (user) => {
    this.setState({
      user: {
        ...this.state.user,
        ...user,
      },
    }, this.state.inlineValidation ? this.validateInline : () => {
      if (!this.state.hasChanges) {
        // Show navigation button when first time updating user.
        const hasChanges = !Object.keys(user)
          .every(key => user[key] === this.props.user[key]);

        if (hasChanges) {
          EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_ENABLE);
          this.setState({
            hasChanges,
          });
        }
      }
    });
  }

  validateInline = () => {
    const errors = this.props.validateUser(this.state.user, !this.props.isRegister);
    this.setState({
      errors,
      disabled: Object.keys(errors).length > 0,
    });
    if (!this.props.isRegister) {
      EventEmitter.emit(Object.keys(errors).length ?
        events.NAVIGATOR_SAVE_BUTTON_DISABLE :
        events.NAVIGATOR_SAVE_BUTTON_ENABLE);
    }
  }

  handleUserChange = (field, value) => {
    this.updateUser({ [field]: value });
  }

  saveUser = () => {
    const errors = this.props.validateUser(this.state.user, !this.props.isRegister);
    this.setState({
      inlineValidation: true,
      errors,
      disabled: Object.keys(errors).length > 0,
    });

    if (Object.keys(errors).length > 0) {
      EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_DISABLE);
      return;
    }

    if (this.props.isRegister) {
      this.props.registerUser(this.state.user);
    } else {
      this.props.updateUser(this.state.user);
    }
  }

  /**
   * Render text field of form
   * @param {string} name field name
   * @param {?string} type field type
   * @return {JSX|null}
   */
  renderTextField(name, type = 'text') {
    return (
      <TextField
        name={name}
        type={type}
        label={`user.${name}`}
        onChange={value => this.handleUserChange(name, value)}
        value={this.state.user[name]}
        errorText={this.state.errors[name]}
      />
    );
  }

  /**
   * @return {*}
   */
  render() {
    const { isRegister } = this.props;
    return (
      <Fragment>
        <Portal name={portals.USER_FORM_BEFORE} />
        <Portal name={portals.USER_FORM}>

          {this.renderTextField('firstName')}
          {this.renderTextField('lastName')}
          {this.renderTextField('mail')}

          {isRegister && this.renderTextField('password', 'password')}

          {!isRegister && null}

          {isRegister &&
            <div data-test-id="RegisterButton" className={styles.buttonWrapper}>
              <RippleButton type="secondary" disabled={this.state.disabled} className={styles.button} onClick={this.saveUser}>
                <I18n.Text string="register.button" />
              </RippleButton>
            </div>
          }

        </Portal>
        <Portal name={portals.USER_FORM_AFTER} />
      </Fragment>
    );
  }
}

export { UserForm as UnwrappedUserForm };
export default connect(UserForm);
