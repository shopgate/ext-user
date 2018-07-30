import { main$ } from '@shopgate/pwa-common/streams/main';
import {
  UPDATE_USER,
  SET_DEFAULT_ADDRESS,
} from './../constants/ActionTypes';

/**
 * Gets triggered when we update user data (personal, addresses, etc)
 * @type {Observable}
 */
export const userWillUpdate$ = main$.filter(({ action }) => action.type === UPDATE_USER);

/**
 * Gets triggered when user requested to set address as default
 * @type {Observable}
 */
export const userSetDefaultAddress$ = main$
  .filter(({ action }) => action.type === SET_DEFAULT_ADDRESS);
