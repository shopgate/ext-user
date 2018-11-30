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
 * @param {Object|undefined} user user
 * @return {{type: string, user: Object}}
 */
export const updateUser = user => ({
  type: types.UPDATE_USER,
  user,
});

/**
 * Creates the dispatched UPDATE_USER_SUCCESS action object.
 * @param {string[]|undefined} messages messages
 * @param {Object|undefined} user user
 * @return {{type: string, user: Object}}
 */
export const updateUserSuccess = (messages = [], user) => ({
  type: types.UPDATE_USER_SUCCESS,
  messages,
  user,
});

/**
 * Creates the dispatched UPDATE_USER_FAILED action object.
 * @param {Object} error error
 * @param {Object|undefined} user user
 * @return {{type: string, error: Object, user: Object}}
 */
export const updateUserFailed = (error, user) => ({
  type: types.UPDATE_USER_FAILED,
  error,
  user,
});
