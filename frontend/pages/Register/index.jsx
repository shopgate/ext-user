import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import { Route } from '@shopgate/pwa-common/components';
import { Theme } from '@shopgate/pwa-common/context';
import UserForm from '../../components/UserForm';
import { USER_REGISTER_PATH } from './../../constants/RoutePaths';
import connect from './connector';
import styles from './style';

const isIos = themeName.includes('ios');

/**
 * @param {Object} props The component props.
 * @param {boolean} props.isLoggedIn The user's logged in state.
 * @returns {JSX}
 */
const Register = ({ isLoggedIn }) => (
  <Theme>
    {({ View, AppBar }) => (
      <View>
        <AppBar title={isIos ? undefined : 'register.title'} right={null} />
        <section className={styles.container}>
          <div className={styles.subline}>
            <I18n.Text string="register.subTitle" />
          </div>
          {/* Kick off user form immediately after register */}
          {!isLoggedIn && <UserForm register />}
        </section>
      </View>
    )}
  </Theme>
);

Register.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default () => (
  <Route pattern={USER_REGISTER_PATH} component={connect(Register)} />
);
