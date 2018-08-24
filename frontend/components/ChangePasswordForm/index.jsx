import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import Grid from '@shopgate/pwa-common/components/Grid';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import TextField from '@shopgate/pwa-ui-shared/Form/TextField';
import Password from '@shopgate/pwa-ui-shared/Form/Password';
import * as portals from '@shopgate/user/constants/Portals';
import EventEmitter from '@shopgate/user/events/emitter';
import * as events from '@shopgate/user/constants/EventTypes';
import { USER_PROFILE_PATH } from '@shopgate/user/constants/RoutePaths';
import connect from './connector';
import styles from './style';

const isIos = themeName.includes('ios');

// eslint-disable-next-line valid-jsdoc
/**
 * User form component
*/
export class ChangePasswordForm extends Component {
  static propTypes = {
    updatePassword: PropTypes.func.isRequired,
    validatePassword: PropTypes.func.isRequired,
    validationErrors: PropTypes.shape(),
  }

  static defaultProps = {
    validationErrors: {},
  }

  /**
   * Initializes the component.
   * @param {Object} props The components props.
   */
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      user: {
        password: '',
        oldPassword: '',
        repeatPassword: '',
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
    if (isIos) {
      EventEmitter.on(events.NAVIGATOR_SAVE_BUTTON_CLICK, this.updatePassword);
      EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_SHOW);
      EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_ENABLE);
    }
  }

  handleOldPassword = (oldPassword) => {
    // eslint-disable-next-line extra-rules/no-single-line-objects
    this.setState({ user: { ...this.state.user, oldPassword } }, this.validateInline);
  }

  handlePassword = (password) => {
    // eslint-disable-next-line extra-rules/no-single-line-objects
    this.setState({ user: { ...this.state.user, password } }, this.validateInline);
  }

  handleRepeatPassword = (repeatPassword) => {
    // eslint-disable-next-line extra-rules/no-single-line-objects
    this.setState({ user: { ...this.state.user, repeatPassword } }, this.validateInline);
  }

  validateInline = () => {
    if (!this.state.inlineValidation) {
      return;
    }
    const errors = this.props.validatePassword(this.state.user);
    this.setState({
      errors,
      disabled: Object.keys(errors).length > 0,
    });
    if (isIos) {
      EventEmitter.emit(Object.keys(errors).length ?
        events.NAVIGATOR_SAVE_BUTTON_DISABLE :
        events.NAVIGATOR_SAVE_BUTTON_ENABLE);
    }
  }

  updatePassword = () => {
    const errors = this.props.validatePassword(this.state.user);
    this.setState({
      inlineValidation: true,
      errors,
      disabled: Object.keys(errors).length > 0,
    });

    if (Object.keys(errors).length > 0) {
      if (isIos) {
        EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_DISABLE);
      }
      return;
    }

    const { password, oldPassword } = this.state.user;
    this.props.updatePassword({
      password,
      oldPassword,
    });
  }

  /**
   * @return {*}
   */
  render() {
    return (
      <Fragment>
        <Portal name={portals.USER_PASSWORD_FORM_BEFORE} />
        <Portal name={portals.USER_PASSWORD_FORM}>

          <TextField
            name="oldPassword"
            type="password"
            label="password.current"
            value={this.state.user.oldPassword}
            onChange={this.handleOldPassword}
            errorText={this.state.errors.oldPassword}
          />

          <Password
            name="password"
            label="password.new"
            value={this.state.user.password}
            onChange={this.handlePassword}
            errorText={this.state.errors.password}
          />

          <Password
            name="repeatPassword"
            label="password.repeat"
            value={this.state.user.repeatPassword}
            onChange={this.handleRepeatPassword}
            errorText={this.state.errors.repeatPassword}
          />

          {!isIos &&
            <Grid className={styles.buttons}>
              <Grid.Item grow={1} />
              <Grid.Item grow={0} className={styles.cancelItem}>
                <Link
                  href={USER_PROFILE_PATH}
                  className={styles.cancel}
                >
                  <I18n.Text string="common.cancel" />
                </Link>
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
