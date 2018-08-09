import React from 'react';
import Route from '@shopgate/pwa-common/components/Router/components/Route';
import SelectAddress from './index';

/**
 * @param {Object} props props
 * @return {*}
 * @constructor
 */
const SelectAddressRoute = props => (
  <Route
    path="/checkout/selectAddress"
    component={SelectAddress}
    {...props}
  />
);

export default SelectAddressRoute;
