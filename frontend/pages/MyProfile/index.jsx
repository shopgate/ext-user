import React, { Fragment } from 'react';
import { Route } from '@shopgate/pwa-common/components';
import { Theme, RouteContext } from '@shopgate/pwa-common/context';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import I18n from '@shopgate/pwa-common/components/I18n';
import Portal from '@shopgate/pwa-common/components/Portal';
import { USER_PROFILE_PATH } from '../../constants/RoutePaths';
import * as portals from '../../constants/Portals';
import UserForm from '../../components/UserForm';
import AppBarSaveButton from '../../components/AppBarSaveButton';
import styles from './style';

const isIos = themeName.includes('ios');

/**
 * The User Profile component.
 * @returns {JSX}
 */
const MyProfile = () => (
  <Theme>
    {({ View, AppBar }) => (
      <RouteContext.Consumer>
        {({ visible }) => (
          <View>
            <AppBar
              title={isIos ? '' : 'profile.title'}
              right={visible ? <AppBarSaveButton testId="UserProfileSaveButton" /> : null}
            />
            <section className={styles.container} data-test-id="UserProfilePage">

              <h1 className={styles.headline}>
                <I18n.Text string="profile.title" />
              </h1>

              {visible &&
                <Fragment>
                  <Portal name={portals.USER_PROFILE_BEFORE} />
                  <Portal name={portals.USER_PROFILE}>
                    <UserForm />
                  </Portal>
                  <Portal name={portals.USER_PROFILE_AFTER} />
                </Fragment>
              }

            </section>
          </View>
        )}
      </RouteContext.Consumer>
    )}
  </Theme>
);

export default () => (
  <Route pattern={USER_PROFILE_PATH} component={MyProfile} />
);
