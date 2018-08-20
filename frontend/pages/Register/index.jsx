import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import UserForm from '@shopgate/user/components/UserForm';
import styles from './style';

/**
 * Register component
 */
class Register extends Component {
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
    const { View } = this.props;
    return (
      <View title={this.title}>
        <section className={styles.container} data-test-id="RegisterPage">
          <div className={styles.subline}>
            <I18n.Text string="register.subTitle" />
          </div>
          <UserForm />
        </section>
      </View>
    );
  }
}

export default Register;
