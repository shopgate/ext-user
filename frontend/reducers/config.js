import { USER_CONFIG_RECEIVED, USER_CONFIG_FAILED } from './../constants/ActionTypes';

/**
 * @param {Object} state state
 * @param {Object} action The action
 * @return {Object} The new state
 */
export default (state = {}, action) => {
  switch (action.type) {
    case USER_CONFIG_RECEIVED:
      return action.config;

    case USER_CONFIG_FAILED:
      return {
        error: action.error,
      };

    default:
      return state;
  }
};
