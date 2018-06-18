import React from 'react';
import Route from '@shopgate/pwa-common/components/Router/components/Route';
import AuthRoutes from '@shopgate/pwa-common/components/Router/components/AuthRoutes';
import SelectAddress from './index';

/**
 * @param {Object} props props
 * @return {*}
 * @constructor
 */
const SelectAddressRoute = props => (
  <AuthRoutes to="/login">
    <Route
      path="/user/selectAddress"
      component={SelectAddress}
      {...props}
    />
  </AuthRoutes>
);

export default SelectAddressRoute;
