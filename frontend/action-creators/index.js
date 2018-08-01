import {
  UPDATE_USER_ADDRESS_SUCCESS,
  UPDATE_USER_ADDRESS_FAILED,
  SET_DEFAULT_ADDRESS,
} from './../constants/ActionTypes';

/**
 * Creates the dispatched SET_DEFAULT_ADDRESS action object.
 * @param {string} addressId address id
 * @param {string} tag tag of address
 * @return {{type: string, addressId: string, tag: string}}
 */
export const setDefaultAddress = (addressId, tag = 'default') => ({
  type: SET_DEFAULT_ADDRESS,
  addressId,
  tag,
});

/**
 * Creates the dispatched UPDATE_USER_ADDRESS_SUCCESS action object.
 * @returns {Object} The dispatched action object.
 */
export const updateUserAddressSuccess = () => ({
  type: UPDATE_USER_ADDRESS_SUCCESS,
});

/**
 * Creates the dispatched UPDATE_USER_ADDRESS_SUCCESS action object.
 * @param {Object} error error
 * @returns {Object} The dispatched action object.
 */
export const updateUserAddressFailed = error => ({
  type: UPDATE_USER_ADDRESS_FAILED,
  error,
});
