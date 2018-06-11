import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import connect from './connector';
import Title from './components/Title';
import Addresses from './components/Addresses';
import styles from '../Register/style';

/**
 * @param {Object} props props
 * @return {*}
 */
const SelectAddress = ({
  View, selectAddress, addresses, addressType, selectedId,
}) => (
  <View>
    <section className={styles.container} data-test-id="AddAddressPage">
      <Title />
      <Addresses
        addresses={addresses}
        selectedId={selectedId}
        selectAddress={address => selectAddress(address, addressType)}
      />
      <Link href="/user/addAddress">
        <I18n.Text string="address.add.title" />
      </Link>
    </section>
  </View>
);

SelectAddress.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addressType: PropTypes.string.isRequired,
  selectAddress: PropTypes.func.isRequired,
  selectedId: PropTypes.string.isRequired,
  View: PropTypes.func.isRequired,
};

export default connect(SelectAddress);
