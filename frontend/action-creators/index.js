import * as types from './../constants/ActionTypes';

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
 * Creates the dispatched ADD_USER_ADDRESS action object.
 * @returns {Object} The dispatched action object.
 */
export const addUserAddress = () => ({
  type: types.ADD_USER_ADDRESS,
});

/**
 * Creates the dispatched ADD_USER_ADDRESS_SUCCESS action object.
 * @param {UserAddress} address address id
 * @returns {Object} The dispatched action object.
 */
export const addUserAddressSuccess = address => ({
  type: types.ADD_USER_ADDRESS_SUCCESS,
  address,
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
 * @returns {Object} The dispatched action object.
 */
export const updateUserAddress = () => ({
  type: types.UPDATE_USER_ADDRESS,
});

/**
 * Creates the dispatched UPDATE_USER_ADDRESS_SUCCESS action object.
 * @param {UserAddress} address address id
 * @returns {Object} The dispatched action object.
 */
export const updateUserAddressSuccess = address => ({
  type: types.UPDATE_USER_ADDRESS_SUCCESS,
  address,
});

/**
 * Creates the dispatched UPDATE_USER_ADDRESS_SUCCESS action object.
 * @param {Object} error error
 * @returns {Object} The dispatched action object.
 */
export const updateUserAddressFailed = error => ({
  type: types.UPDATE_USER_ADDRESS_FAILED,
  error,
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
