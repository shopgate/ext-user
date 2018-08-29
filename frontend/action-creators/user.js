import * as types from './../constants/ActionTypes';

/**
 * Creates the dispatched REGISTER_USER action object.
 * @return {{type: string}}
 */
export const registerUser = () => ({
  type: types.REGISTER_USER,
});

/**
 * Creates the dispatched REGISTER_USER_SUCCESS action object.
 * @param {string} userId user id
 * @return {{type: string, userId: string}}
 */
export const registerUserSuccess = userId => ({
  type: types.REGISTER_USER_SUCCESS,
  userId,
});

/**
 * Creates the dispatched REGISTER_USER_FAILED action object.
 * @param {Object} error error
 * @return {{type: string, error: Object}}
 */
export const registerUserFailed = error => ({
  type: types.REGISTER_USER_FAILED,
  error,
});

/**
 * Creates the dispatched UPDATE_USER action object.
 * @return {{type: string}}
 */
export const updateUser = () => ({
  type: types.UPDATE_USER,
});

/**
 * Creates the dispatched UPDATE_USER_SUCCESS action object.
 * @param {string[]} messages messages
 * @return {{type: string}}
 */
export const updateUserSuccess = messages => ({
  type: types.UPDATE_USER_SUCCESS,
  messages,
});

/**
 * Creates the dispatched UPDATE_USER_FAILED action object.
 * @param {Object} error error
 * @return {{type: string, error: Object}}
 */
export const updateUserFailed = error => ({
  type: types.UPDATE_USER_FAILED,
  error,
});
