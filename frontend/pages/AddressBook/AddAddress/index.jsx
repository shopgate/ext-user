import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '@shopgate/user/constants/Portals';
import AddressForm from '@shopgate/user/components/AddressForm';
import styles from './style';

/**
 * The User AddressBook component.
 */
class AddressBook extends Component {
  static propTypes = {
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
    return __('address.add.title');
  }

  /**
   * @return {*}
   */
  render() {
    const { View } = this.props;
    return (
      <View title={this.title}>
        <section className={styles.container} data-test-id="UserAddressBookAddPage">
          <Portal name={portals.USER_ADDRESSES_ADD_BEFORE} />
          <Portal name={portals.USER_ADDRESSES_ADD}>
            <AddressForm disableBilling />
          </Portal>
          <Portal name={portals.USER_ADDRESSES_ADD_AFTER} />
        </section>
      </View>
    );
  }
}

export default AddressBook;
