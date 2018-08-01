import { main$ } from '@shopgate/pwa-common/streams/main';
import {
  UPDATE_USER_ADDRESS_SUCCESS,
  UPDATE_USER_ADDRESS_FAILED,
  SET_DEFAULT_ADDRESS,
} from './../constants/ActionTypes';

/**
 * Gets triggered when we updated user address
 * @type {Observable}
 */
export const userAddressUpdated$ = main$.filter(({ action }) => (
  action.type === UPDATE_USER_ADDRESS_SUCCESS
));

/**
 * Gets triggered when we updated user address
 * @type {Observable}
 */
export const userAddressUpdateFailed$ = main$.filter(({ action }) => (
  action.type === UPDATE_USER_ADDRESS_FAILED));

/**
 * Gets triggered when user requested to set address as default
 * @type {Observable}
 */
export const userSetDefaultAddress$ = main$
  .filter(({ action }) => action.type === SET_DEFAULT_ADDRESS);
