import {
  GET_ADDRESS_FIELDS,
  GET_ADDRESS_FIELDS_SUCCESS,
  GET_ADDRESS_FIELDS_FAILED,
} from '@shopgate/user/constants/ActionTypes';

const initialState = {
  isFetching: false,
  error: null,
  config: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESS_FIELDS:
      return {
        ...state,
        isFetching: true,
      };

    case GET_ADDRESS_FIELDS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_ADDRESS_FIELDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        config: action.config,
      };

    default:
      return state;
  }
};
