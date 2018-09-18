import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import { Theme } from '@shopgate/pwa-common/context';
import UserForm from '../../components/UserForm';
import connect from './connector';
import styles from './style';

/**
 * @param {Object} props The component props.
 * @param {boolean} props.isLoggedIn The user's logged in state.
 * @returns {JSX}
 */
const Register = ({ isLoggedIn }) => (
  <Theme>
    {({ View }) => (
      <View>
        <section className={styles.container}>
          <div className={styles.subline}>
            <I18n.Text string="register.subTitle" />
          </div>
          {/* Kick off user form immediately after register */}
          {!isLoggedIn && <UserForm />}
        </section>
      </View>
    )}
  </Theme>
);

Register.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

Register.contextTypes = {
  i18n: PropTypes.func,
};

export default connect(Register);
