import {
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
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
 * Creates the dispatched UPDATE_USER action object.
 * @returns {Object} The dispatched action object.
 */
export const updateUser = () => ({
  type: UPDATE_USER,
});

/**
 * Creates the dispatched UPDATE_USER_SUCCESS action object.
 * @returns {Object} The dispatched action object.
 */
export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
});
