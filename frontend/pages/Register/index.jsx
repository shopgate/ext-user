import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import UserForm from '@shopgate/user/components/UserForm';
import connect from './connector';
import styles from './style';

const isIos = themeName.includes('ios');

/**
 * Register component
 */
class Register extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    i18n: PropTypes.func,
  };

  /**
   * Returns the translated view title.
   * @return {string}
   */
  get title() {
    const { __ } = this.context.i18n();
    return __('register.title');
  }

  /**
   * @return {*}
   */
  render() {
    // eslint-disable-next-line react/prop-types
    const { View, isLoggedIn } = this.props;
    return (
      <View title={isIos ? undefined : this.title}>
        <section className={styles.container} data-test-id="RegisterPage">
          <div className={styles.subline}>
            <I18n.Text string="register.subTitle" />
          </div>
          {/* Kick of user form immediately after register */}
          {!isLoggedIn && <UserForm />}
        </section>
      </View>
    );
  }
}

export default connect(Register);
