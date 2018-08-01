import React from 'react';
import AuthRoutes from '@shopgate/pwa-common/components/Router/components/AuthRoutes';
import Route from '@shopgate/pwa-common/components/Router/components/Route';
import { LOGIN_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import { USER_ADDRESS_PATH } from '@shopgate/user/constants/RoutePaths';
import AddAddress from '.';

/**
 * @param {Object} props props
 * @return {JSX}
 * @constructor
 */
const AddAddressRoute = props => (
  <AuthRoutes to={LOGIN_PATH}>
    <Route
      path={USER_ADDRESS_PATH}
      component={AddAddress}
      {...props}
    />
  </AuthRoutes>
);

export default AddAddressRoute;
