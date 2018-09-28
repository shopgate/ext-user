import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import I18n from '@shopgate/pwa-common/components/I18n';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '../../constants/Portals';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import styles from './style';

const isIos = themeName.includes('ios');

/**
 * The Change password page.
 */
class ChangePassword extends Component {
  static contextTypes = {
    i18n: PropTypes.func,
  };

  /**
   * @return {string}
   */
  get title() {
    const { __ } = this.context.i18n();
    return __('password.update');
  }

  /**
   * @return {*}
   */
  render() {
    // eslint-disable-next-line react/prop-types
    const { View } = this.props;
    return (
      <View title={isIos ? '' : this.title}>
        <section className={styles.container} data-test-id="ChangePasswordPage">

          <h1 className={styles.headline}>
            <I18n.Text string={this.title} />
          </h1>

          <Portal name={portals.USER_PASSWORD_BEFORE} />
          <Portal name={portals.USER_PASSWORD} >
            <ChangePasswordForm />
          </Portal>
          <Portal name={portals.USER_PASSWORD_AFTER} />

        </section>
      </View>
    );
  }
}

export default ChangePassword;
