import React from 'react';
import AuthRoutes from '@shopgate/pwa-common/components/Router/components/AuthRoutes';
import Route from '@shopgate/pwa-common/components/Router/components/Route';
import { LOGIN_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import { USER_ADDRESS_BOOK_PATH } from './../../constants/RoutePaths';
import AddressBook from './index';

/**
 * @param {Object} props props
 * @return {*}
 * @constructor
 */
const AddAddressRoute = props => (
  <AuthRoutes to={LOGIN_PATH}>
    <Route
      path={USER_ADDRESS_BOOK_PATH}
      component={AddressBook}
      {...props}
    />
  </AuthRoutes>
);

export default AddAddressRoute;
