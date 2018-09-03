import * as types from './../constants/ActionTypes';

/**
 * Creates the dispatched USER_ADDRESSES_RECEIVED action object.
 * @param {UserAddress[]} addresses address id
 * @return {{type: string, addresses: UserAddress[]}}
 */
export const getUserAddressesSuccess = addresses => ({
  type: types.USER_ADDRESSES_RECEIVED,
  addresses,
});

/**
 * Creates the dispatched USER_ADDRESSES_FAILED action object.
 * @param {Object} error error
 * @return {{type: string, error: Object}}
 */
export const getUserAddressesFailed = error => ({
  type: types.USER_ADDRESSES_FAILED,
  error,
});

/**
 * Creates the dispatched SET_DEFAULT_ADDRESS action object.
 * @param {string} addressId address id
 * @param {string} tag tag of address
 * @return {{type: string, addressId: string, tag: string}}
 */
export const setDefaultAddress = (addressId, tag = 'default') => ({
  type: types.SET_DEFAULT_ADDRESS,
  addressId,
  tag,
});

/**
 * Creates the dispatched DELETE_ADDRESSES action object.
 * @param {string[]} addressIds list of address ids
 * @return {{type: string, addressIds: string[]}}
 */
export const deleteUserAddresses = addressIds => ({
  type: types.DELETE_USER_ADDRESSES,
  addressIds,
});

/**
 * Creates the dispatched ADD_USER_ADDRESS action object.
 * @returns {Object} The dispatched action object.
 */
export const addUserAddress = () => ({
  type: types.ADD_USER_ADDRESS,
});

/**
 * Creates the dispatched ADD_USER_ADDRESS_SUCCESS action object.
 * @returns {Object} The dispatched action object.
 */
export const addUserAddressSuccess = () => ({
  type: types.ADD_USER_ADDRESS_SUCCESS,
});

/**
 * Creates the dispatched ADD_USER_ADDRESS_FAILED action object.
 * @param {Object} error error
 * @returns {Object} The dispatched action object.
 */
export const addUserAddressFailed = error => ({
  type: types.ADD_USER_ADDRESS_FAILED,
  error,
});

/**
 * Creates the dispatched UPDATE_USER_ADDRESS action object.
 * @param {boolean} silent Updates without notifying the user (route changes, loading, ..)
 * @returns {Object} The dispatched action object.
 */
export const updateUserAddress = (silent = false) => ({
  type: types.UPDATE_USER_ADDRESS,
  silent,
});

/**
 * Creates the dispatched UPDATE_USER_ADDRESS_SUCCESS action object.
 * @param {UserAddress} address address id
 * @param {boolean} silent Updates without notifying the user (route changes, loading, ..)
 * @returns {Object} The dispatched action object.
 */
export const updateUserAddressSuccess = (address, silent) => ({
  type: types.UPDATE_USER_ADDRESS_SUCCESS,
  address,
  silent,
});

/**
 * Creates the dispatched UPDATE_USER_ADDRESS_SUCCESS action object.
 * @param {Object} error error
 * @param {boolean} silent suppresses the info when true
 * @returns {Object} The dispatched action object.
 */
export const updateUserAddressFailed = (error, silent = false) => ({
  type: types.UPDATE_USER_ADDRESS_FAILED,
  error,
  silent,
});

/**
 * Creates the dispatched USER_ADDRESS_VALIDATION_FAILS action object.
 * @param {Object} errors validation errors
 * @returns {Object} The dispatched action object.
 */
export const userAddressValidationFailed = errors => ({
  type: types.USER_ADDRESS_VALIDATION_FAILED,
  errors,
});

/**
 * Creates the dispatched DELETE_USER_ADDRESSES_CONFIRMED action object.
 * @returns {Object} The dispatched action object.
 */
export const deleteUserAddressesConfirmed = () => ({
  type: types.DELETE_USER_ADDRESSES_CONFIRMED,
});

/**
 * Creates the dispatched DELETE_USER_ADDRESS_SUCCESS action object.
 * @returns {Object} The dispatched action object.
 */
export const deleteUserAddressesSuccess = () => ({
  type: types.DELETE_USER_ADDRESSES_SUCCESS,
});

/**
 * Creates the dispatched DELETE_USER_ADDRESS_FAILED action object.
 * @param {Object} error error
 * @returns {Object} The dispatched action object.
 */
export const deleteUserAddressesFailed = error => ({
  type: types.DELETE_USER_ADDRESSES_FAILED,
  error,
});
