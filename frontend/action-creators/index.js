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
 * @param {string} addressId address id
 * @returns {Object} The dispatched action object.
 */
export const addUserAddressSuccess = addressId => ({
  type: types.ADD_USER_ADDRESS_SUCCESS,
  addressId,
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
 * @returns {Object} The dispatched action object.
 */
export const updateUserAddressSuccess = () => ({
  type: types.UPDATE_USER_ADDRESS_SUCCESS,
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
  type: types.USER_ADDRESS_VALIDATION_FAILS,
  errors,
});

/**
 * Toggles the cart icon in the gmd theme.
 * @param {bool} value Whether hidden or visible.
 * @returns {Object}
 */
export const toggleNavigatorCart = value => ({
  type: 'TOGGLE_NAVIGATOR_CART_ICON',
  value,
});

/**
 * Toggles the search icon in the gmd theme.
 * @param {bool} value Whether hidden or visible.
 * @returns {Object}
 */
export const toggleNavigatorSearch = value => ({
  type: value ? 'SET_SEARCH_ENABLED' : 'SET_SEARCH_DISABLED',
});
