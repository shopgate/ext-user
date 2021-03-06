import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from '@shopgate/pwa-common/components';
import { Theme, RouteContext } from '@shopgate/pwa-common/context';
import I18n from '@shopgate/pwa-common/components/I18n';
import Portal from '@shopgate/pwa-common/components/Portal';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import * as portals from '../../../constants/Portals';
import AddressForm from '../../../components/AddressForm';
import { USER_ADDRESS_PATH } from '../../../constants/RoutePaths';
import AppBarSaveButton from '../../../components/AppBarSaveButton';
import connect from './connector';
import style from './style';

const isIos = themeName.includes('ios');

/**
 * Get page title
 * @param {Object} address address
 * @returns {string}
 */
const title = (address) => {
  if (isIos) {
    return '';
  }
  return address.id ? 'address.update.title' : 'address.add.title';
};

/**
 * The Add address component.
 * @returns {JSX}
 */
const AddressDetails = ({ address }) => (
  <Theme>
    {({ View, AppBar }) => (
      <RouteContext.Consumer>
        {({ visible }) => (
          <View>
            <AppBar
              title={title(address)}
              right={(visible && address.id) ? <AppBarSaveButton testId="UserAddressSaveButton" key="right" /> : null}
            />
            <section className={style.container} data-test-id="UserAddressBookAddPage">

              {isIos &&
                <h1 className={style.headline}>
                  <I18n.Text string={title(address)} />
                </h1>
              }

              {visible && /* kick form off, when route is not visible */
                <Fragment>
                  <Portal name={portals.USER_ADDRESSES_ADD_BEFORE} />
                  <Portal name={portals.USER_ADDRESSES_ADD}>
                    <AddressForm address={address} />
                  </Portal>
                  <Portal name={portals.USER_ADDRESSES_ADD_AFTER} />
                </Fragment>
              }

            </section>
          </View>
        )}
      </RouteContext.Consumer>
    )}
  </Theme>
);

AddressDetails.propTypes = {
  address: PropTypes.shape(),
};

AddressDetails.defaultProps = {
  address: {},
};

export default () => (
  <Route pattern={USER_ADDRESS_PATH} component={connect(AddressDetails)} />
);
