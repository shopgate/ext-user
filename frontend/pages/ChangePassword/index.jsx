import React from 'react';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import I18n from '@shopgate/pwa-common/components/I18n';
import Portal from '@shopgate/pwa-common/components/Portal';
import { Theme, RouteContext } from '@shopgate/pwa-common/context';
import { Route } from '@shopgate/pwa-common/components';
import * as portals from '../../constants/Portals';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import { USER_PASSWORD_PATH } from '../../constants/RoutePaths';
import AppBarSaveButton from '../../components/AppBarSaveButton';
import connect from '../Register/connector';
import styles from './style';

const isIos = themeName.includes('ios');

/**
 * The Change password page.
 * @returns {JSX}
 */
const ChangePassword = () => (
  <Theme>
    {({ View, AppBar }) => (
      <RouteContext.Consumer>
        {({ visible }) => (
          <View>
            <AppBar
              title={isIos ? '' : 'password.update'}
              right={(isIos && visible) ? <AppBarSaveButton testId="ChangePasswordSaveButton" /> : null}
            />
            <section className={styles.container} data-test-id="ChangePasswordPage">

              <h1 className={styles.headline}>
                <I18n.Text string="password.update" />
              </h1>

              <Portal name={portals.USER_PASSWORD_BEFORE} />
              <Portal name={portals.USER_PASSWORD} >
                <ChangePasswordForm />
              </Portal>
              <Portal name={portals.USER_PASSWORD_AFTER} />

            </section>
          </View>
        )}
      </RouteContext.Consumer>
    )}
  </Theme>
);

export default () => (
  <Route pattern={USER_PASSWORD_PATH} component={connect(ChangePassword)} />
);
