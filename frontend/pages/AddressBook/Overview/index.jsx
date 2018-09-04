import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import Portal from '@shopgate/pwa-common/components/Portal';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import { userAddressPathPattern } from '../../../constants/RoutePaths';
import * as portals from '../../../constants/Portals';
import AddressList from './components/AddressList';
import NoAddresses from './components/NoAddresses';
import connect from './connector';
import styles from './style';

const isIos = themeName.includes('ios');

/**
 * The User AddressBook component.
 */
class AddressBook extends Component {
  static propTypes = {
    hasAddresses: PropTypes.bool.isRequired,
    View: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    i18n: PropTypes.func,
  };

  /**
   * @return {string}
   */
  get title() {
    const { __ } = this.context.i18n();
    return __('addresses.title');
  }

  /**
   * @return {*}
   */
  render() {
    const { hasAddresses, View, isFetching } = this.props;
    return (
      <View title={!isIos ? this.title : ''}>
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
              <Link className={styles.link} href={userAddressPathPattern.stringify({ id: 0 })}>
                <RippleButton className={styles.button} type="secondary" disabled={isFetching}>
                  <I18n.Text string="addresses.button" />
                </RippleButton>
              </Link>
            </div>
          </Portal>
          <Portal name={portals.USER_ADDRESSES_ADD_AFTER} />

        </section>
      </View>
    );
  }
}

export default connect(AddressBook);
