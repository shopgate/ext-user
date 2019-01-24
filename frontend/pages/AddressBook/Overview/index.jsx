import React from 'react';
import PropTypes from 'prop-types';
import { Route } from '@shopgate/pwa-common/components';
import { Theme } from '@shopgate/pwa-common/context';
import I18n from '@shopgate/pwa-common/components/I18n';
import Link from '@shopgate/pwa-common/components/Link';
import Portal from '@shopgate/pwa-common/components/Portal';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import { USER_ADDRESS_BOOK_PATH, addressUri } from '../../../constants/RoutePaths';
import * as portals from '../../../constants/Portals';
import AddressList from './components/AddressList';
import NoAddresses from './components/NoAddresses';
import connect from './connector';
import styles from './style';

const isIos = themeName.includes('ios');

/**
 * The User AddressBook component.
 * @returns {JSX}
 */
const AddressBook = ({ hasAddresses }) => (
  <Theme>
    {({ View, AppBar }) => (
      <View>
        <AppBar title={isIos ? '' : 'addresses.title'} right={null} />
        <section className={styles.container} data-test-id="UserAddressBookPage">

          {isIos &&
            <h1 className={styles.headline}>
              <I18n.Text string="addresses.headline" />
            </h1>
          }

          <Portal name={portals.USER_ADDRESSES_BEFORE} />
          <Portal name={portals.USER_ADDRESSES} >
            {!hasAddresses && <NoAddresses />}
            {hasAddresses && <AddressList />}
          </Portal>
          <Portal name={portals.USER_ADDRESSES_AFTER} />

          <Portal name={portals.USER_ADDRESSES_ADD_BEFORE} />
          <Portal name={portals.USER_ADDRESSES_ADD}>
            <div className={styles.buttonWrapper} data-test-id="AddAddressButton">
              <Link className={styles.link} href={addressUri({ id: 0 })}>
                <RippleButton className={styles.button} type="secondary">
                  <I18n.Text string="addresses.button" />
                </RippleButton>
              </Link>
            </div>
          </Portal>
          <Portal name={portals.USER_ADDRESSES_ADD_AFTER} />

        </section>
      </View>
      )}
  </Theme>
);

AddressBook.propTypes = {
  hasAddresses: PropTypes.bool.isRequired,
};

export default () => (
  <Route pattern={USER_ADDRESS_BOOK_PATH} component={connect(AddressBook)} />
);
