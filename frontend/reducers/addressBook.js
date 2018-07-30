import { RECEIVE_USER, SUCCESS_LOGOUT } from '@shopgate/pwa-common/constants/ActionTypes';
import { SET_DEFAULT_ADDRESS } from './../constants/ActionTypes';
import config from './../config';

const { splitDefaultAddressesByTags = [] } = config;

/**
 * Stores the user addresses
 * @param {Object} state The current user state
 * @param {Object} action The action object
 * @return {Object} The new state
 */
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER: {
      const { addresses } = action.user;

      const defaultAddresses = {};
      splitDefaultAddressesByTags.forEach((tag) => {
        // Tag is prefixed with default_ for shipping, billing, etc
        const defTag = tag === 'default' ? tag : `default_${tag}`;

        const defA = addresses.find(a => a.tags && a.tags.includes(defTag));
        defaultAddresses[tag] = defA ? defA.id : null;
      });

      return {
        ...state,
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
    case SUCCESS_LOGOUT:
      return {};
    default:
      return state;
  }
};
