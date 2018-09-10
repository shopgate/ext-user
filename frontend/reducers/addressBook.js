import { SUCCESS_LOGOUT } from '@shopgate/pwa-common/constants/ActionTypes';
import config from '../config';
import {
  USER_ADDRESSES_RECEIVED,
  SET_DEFAULT_ADDRESS,
  ADD_USER_ADDRESS_SUCCESS,
  UPDATE_USER_ADDRESS_SUCCESS,
  ADD_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  ADD_USER_ADDRESS_FAILED,
  UPDATE_USER_ADDRESS_FAILED,
  USER_ADDRESS_VALIDATION_FAILED,
} from './../constants/ActionTypes';

const { splitDefaultAddressesByTags = [] } = config;

/**
 * Stores the user addresses
 * @param {Object} state The current user state
 * @param {Object} action The action object
 * @return {Object} The new state
 */
export default (state = {}, action) => {
  switch (action.type) {
    case USER_ADDRESSES_RECEIVED: {
      const { addresses } = action;

      const defaultAddresses = {};
      splitDefaultAddressesByTags.forEach((tag) => {
        // Tag is prefixed with default_ for shipping, billing, etc
        const defTag = tag === 'default' ? tag : `default_${tag}`;

        const defA = addresses.find(a => a.tags && a.tags.includes(defTag));
        defaultAddresses[tag] = defA ? defA.id : null;
      });

      return {
        ...state,
        addresses,
        default: defaultAddresses,
      };
    }

    case SET_DEFAULT_ADDRESS: {
      return {
        ...state,
        default: {
          ...state.default,
          [action.tag]: action.addressId,
        },
      };
    }

    case ADD_USER_ADDRESS_SUCCESS:
    case UPDATE_USER_ADDRESS_SUCCESS: {
      return {
        ...state,
        busy: false,
      };
    }

    case ADD_USER_ADDRESS:
    case UPDATE_USER_ADDRESS:
      return {
        ...state,
        busy: true,
        validationErrors: [],
      };

    case ADD_USER_ADDRESS_FAILED:
    case UPDATE_USER_ADDRESS_FAILED:
    case USER_ADDRESS_VALIDATION_FAILED:
      return {
        ...state,
        busy: false,
        validationErrors: action.error.validationErrors,
      };

    case SUCCESS_LOGOUT:
      return {};
    default:
      return state;
  }
};
