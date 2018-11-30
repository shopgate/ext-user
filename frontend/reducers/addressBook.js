import { SUCCESS_LOGOUT } from '@shopgate/pwa-common/constants/ActionTypes';
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
  USER_ADDRESS_FORM_LEAVE,
} from './../constants/ActionTypes';

/**
 * Prepare default addresses map by given addresses
 * @param {UserAddress[]} addresses user addresses
 * @returns {Object}
 */
const getDefaultsByAddresses = (addresses) => {
  const defaultAddresses = {};

  addresses.forEach((address) => {
    if (!address.tags) {
      return;
    }
    address.tags.forEach((tag) => {
      if (tag.startsWith('default')) {
        // Remove default prefix to have simple shipping, billing as a map
        const normTag = tag.replace('default_', '');
        defaultAddresses[normTag] = address.id;
      }
    });
  });
  return defaultAddresses;
};

const initialState = {
  addresses: [],
  default: {},
  busy: false,
};

/**
 * Stores the user addresses
 * @param {Object} state The current user state
 * @param {Object} action The action object
 * @return {Object} The new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ADDRESSES_RECEIVED: {
      const { addresses = [] } = action;
      return {
        ...state,
        addresses,
        default: getDefaultsByAddresses(addresses),
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

    // Add address to redux immediately after we have success response
    case ADD_USER_ADDRESS_SUCCESS: {
      return {
        ...state,
        busy: false,
      };
    }

    // Update address in redux immediately after we have success response
    case UPDATE_USER_ADDRESS_SUCCESS: {
      return {
        ...state,
        addresses: state.addresses.map(address => (
          // Replace with updated address
          address.id === action.address.id ? action.address : address
        )),
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
        validationErrors: action.error ? action.error.validationErrors : [],
      };

    // Leave address form, reset form related data
    case USER_ADDRESS_FORM_LEAVE: {
      return {
        ...state,
        busy: false,
        validationErrors: [],
      };
    }

    case SUCCESS_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
