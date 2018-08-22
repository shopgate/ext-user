import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '@shopgate/user/constants/Portals';
import UserForm from '@shopgate/user/components/UserForm';
import styles from './style';

/**
 * The User Profile component.
 */
export class MyProfile extends Component {
  static contextTypes = {
    i18n: PropTypes.func,
  };

  /**
   * @return {string}
   */
  get title() {
    const { __ } = this.context.i18n();
    return __('profile.title');
  }

  /**
   * @return {*}
   */
  render() {
    // eslint-disable-next-line react/prop-types
    const { View } = this.props;
    return (
      <View title={this.title}>
        <section className={styles.container} data-test-id="UserProfilePage">

          <h1 className={styles.headline}>
            <I18n.Text string={this.title} />
          </h1>

          <Portal name={portals.USER_PROFILE_BEFORE} />
          <Portal name={portals.USER_PROFILE} >
            <UserForm />
          </Portal>
          <Portal name={portals.USER_PROFILE_AFTER} />

        </section>
      </View>
    );
  }
}

export default MyProfile;
