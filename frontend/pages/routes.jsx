import React from 'react';
import Route from '@virtuous/react-conductor/Route';
import * as path from '../constants/RoutePaths';
import Register from './Register';
// import AddressBook from './AddressBook/Overview';
// import AddressDetails from './AddressBook/AddressDetails';
// import MyProfile from './MyProfile';
// import AddAddress from './Checkout/AddAddress';
// import SelectAddress from './Checkout/SelectAddress';

/**
 * @return {JSX}
 */
const UserRoutes = () => (
  <Route pattern={path.USER_REGISTER_PATH} component={Register} />
);

export default UserRoutes;
