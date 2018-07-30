import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import Portal from '@shopgate/pwa-common/components/Portal';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import { USER_ADDRESS_PATH } from './../../constants/RoutePaths';
import * as portals from './../../constants/Portals';
import AddressList from './components/AddressList';
import connect from './connector';
import styles from './style';

/**
 * The User AddressBook component.
 */
class AddressBook extends Component {
  static propTypes = {
    hasAddresses: PropTypes.bool.isRequired,
    View: PropTypes.func.isRequired,
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
    const { hasAddresses, View } = this.props;
    return (
      <View title={this.title}>
        <section className={styles.container} data-test-id="UserAddressBookPage">

          <div className={styles.headline}>
            <I18n.Text string="addresses.headline" />
          </div>

          <Portal name={portals.USER_ADDRESSES_BEFORE} />
          <Portal name={portals.USER_ADDRESSES} >
            {!hasAddresses &&
              <div className={styles.subline}>
                <I18n.Text string="addresses.noAddresses" />
              </div>
            }
            {hasAddresses && <AddressList />}
          </Portal>
          <Portal name={portals.USER_ADDRESSES_AFTER} />

          <Portal name={portals.USER_ADDRESSES_ADD_BEFORE} />
          <Portal name={portals.USER_ADDRESSES_ADD}>
            <div className={styles.buttonWrapper} data-test-id="AddAddressButton">
              <Link href={USER_ADDRESS_PATH}>
                <RippleButton className={styles.button} type="secondary">
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
