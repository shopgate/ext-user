import { USER_VIEW_IS_LOADING } from './../constants/ActionTypes';

const initialState = {
  pathName: '',
};

/**
 * @param {Object} state state
 * @param {Object} action The action
 * @return {Object} The new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_VIEW_IS_LOADING:
      return {
        pathName: action.pathName,
      };

    default:
      return state;
  }
};
