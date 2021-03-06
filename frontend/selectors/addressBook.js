import { createSelector } from 'reselect';

const statePrefix = '@shopgate/user/UserReducers';

/**
 * Gets user.data.addresses from the redux store.
 * @param {Object} state The application state.
 * @return {UserAddress[]|null}
 */
export const getUserAddresses = createSelector(
  state => state.extensions[statePrefix].addressBook.addresses,
  addresses => addresses
);

/**
 * Get count of user.data.addresses from the redux store.
 * @param {Object} state The application state.
 * @return {number}
 */
export const getUserAddressesCount = createSelector(
  state => state.extensions[statePrefix].addressBook.addresses,
  (addresses = []) => addresses.length
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

/**
 * Selector for address book in progress actions
 * @param {Object} state The application state.
 * @return {boolean}
 */
export const isBusy = state => state.extensions[statePrefix].addressBook.busy || false;

/**
 * Validation errors
 * @param {Object} state The application state.
 * @return {Object[]}
 */
export const getValidationErrors = state => (
  state.extensions[statePrefix].addressBook.validationErrors
);
