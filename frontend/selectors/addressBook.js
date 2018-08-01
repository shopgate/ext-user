import { createSelector } from 'reselect';
import { getUserData } from '@shopgate/pwa-common/selectors/user';

const statePrefix = '@shopgate/user/UserReducers';

/**
 * Gets user.data.addresses from the redux store.
 * @param {Object} state The application state.
 * @return {UserAddress[]|null}
 */
export const getUserAddresses = createSelector(
  getUserData,
  ({ addresses }) => addresses
);

/**
 * Gets user.data.addresses.default from the redux store.
 * @param {Object} state The application state.
 * @returns {Object|null}
 */
export const getUserDefaultAddresses = createSelector(
  state => state.extensions[statePrefix].addressBook.default,
  defaults => defaults
);

/**
 * Get user address selector to fetch address by id
 * @example
 * getUserAddressIdSelector(state)(addressId)
 *
 * @param {Object} state The application state.
 * @return {function(string): UserAddress|undefined}
 */
export const getUserAddressIdSelector = createSelector(
  getUserAddresses,
  addresses => addressId => addresses.find(address => address.id === addressId)
);
