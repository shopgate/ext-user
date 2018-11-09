import { SUCCESS_LOGOUT } from '@shopgate/pwa-common/constants/ActionTypes';
import {
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from './../constants/ActionTypes';

const initialState = {
  validationErrors: [],
};

/**
 * Stores the user update responses
 * @param {Object} state The current user state
 * @param {Object} action The action object
 * @return {Object} The new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_FAILED:
      return {
        ...state,
        validationErrors: action.error ? action.error.validationErrors : [],
      };
    case UPDATE_USER:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        validationErrors: [],
      };

    case SUCCESS_LOGOUT:
      return {};
    default:
      return state;
  }
};
