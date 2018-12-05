import React, { Fragment } from 'react';
import { LOGIN_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import AuthRoutes from '@shopgate/pwa-common/components/Router/components/AuthRoutes';
import Route from '@shopgate/pwa-common/components/Router/components/Route';
import * as path from '../constants/RoutePaths';
import Register from './Register';
import AddressBook from './AddressBook/Overview';
import AddressDetails from './AddressBook/AddressDetails';
import MyProfile from './MyProfile';
import AddAddress from './Checkout/AddAddress';
import SelectAddress from './Checkout/SelectAddress';
import ChangePassword from './ChangePassword';

/**
 * @param {Object} props props
 * @return {*}
 * @constructor
 */
const UserRoutes = props => (
  <Fragment>
    <AuthRoutes to={LOGIN_PATH}>
      <Route path={path.USER_ADDRESS_BOOK_PATH} component={AddressBook} {...props} />
      <Route path={path.USER_ADDRESS_PATH} component={AddressDetails} {...props} />
      <Route path={path.USER_PROFILE_PATH} component={MyProfile} {...props} />
      <Route path={path.USER_PASSWORD_PATH} component={ChangePassword} {...props} />
      <Route path="/checkout/addAddress" component={AddAddress} {...props} />
      <Route path="/checkout/selectAddress" component={SelectAddress} {...props} />
    </AuthRoutes>
    <Route path={path.USER_REGISTER_PATH} component={Register} {...props} />
  </Fragment>
);

export default UserRoutes;
