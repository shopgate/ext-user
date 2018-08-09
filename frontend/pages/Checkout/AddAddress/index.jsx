import React from 'react';
import PropTypes from 'prop-types';
import Title from '@shopgate/user/components/Title';
import AddressForm from '@shopgate/user/components/AddressForm';
import connect from './connector';
import styles from './style';

/**
 * Add user address component
 * @returns {JSX}
 */
const AddAddress = ({ View, isShipping }) => (
  <View>
    <section className={styles.page} data-test-id="AddAddressPage">
      <Title className={styles.title} title={isShipping ? 'checkout.shipping.address.title' : 'checkout.billing.address.title'} />
      <AddressForm />
    </section>
  </View>
);

AddAddress.propTypes = {
  isShipping: PropTypes.bool.isRequired,
  View: PropTypes.node.isRequired,
};

export default connect(AddAddress);
