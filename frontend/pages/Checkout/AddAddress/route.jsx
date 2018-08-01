import React from 'react';
import Route from '@shopgate/pwa-common/components/Router/components/Route';
import AddAddress from './index';

/**
 * @param {Object} props props
 * @return {*}
 * @constructor
 */
const AddAddressRoute = props => (
  <Route
    path="/checkout/addAddress"
    component={AddAddress}
    {...props}
  />
);

export default AddAddressRoute;
