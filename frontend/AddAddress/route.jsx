import React from 'react';
import Route from '@shopgate/pwa-common/components/Router/components/Route';
import AuthRoutes from '@shopgate/pwa-common/components/Router/components/AuthRoutes';
import AddAddress from './index';

/**
 * @param {Object} props props
 * @return {*}
 * @constructor
 */
const AddAddressRoute = props => (
  <AuthRoutes to="/login">
    <Route
      path="/add_address"
      component={AddAddress}
      {...props}
    />
  </AuthRoutes>
);

export default AddAddressRoute;
