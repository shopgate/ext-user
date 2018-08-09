import { main$ } from '@shopgate/pwa-common/streams/main';
import {
  UPDATE_USER_ADDRESS_SUCCESS,
  UPDATE_USER_ADDRESS_FAILED,
  DELETE_USER_ADDRESS_SUCCESS,
  DELETE_USER_ADDRESS_FAILED,
  SET_DEFAULT_ADDRESS,
  DELETE_ADDRESSES,
} from './../constants/ActionTypes';

/**
 * Gets triggered when the user address is updated
 * @type {Observable}
 */
export const userAddressUpdated$ = main$.filter(({ action }) => (
  action.type === UPDATE_USER_ADDRESS_SUCCESS
));

/**
 * Gets triggered when the user address update fails
 * @type {Observable}
 */
export const userAddressUpdateFailed$ = main$.filter(({ action }) => (
  action.type === UPDATE_USER_ADDRESS_FAILED));

/**
 * Gets triggered when the given user addresses were deleted
 * @type {Observable}
 */
export const userAddressesDeleted$ = main$.filter(({ action }) => (
  action.type === DELETE_USER_ADDRESS_SUCCESS
));

/**
 * Gets triggered when the user address deletion failed
 * @type {Observable}
 */
export const userAddressesDeletionFailed$ = main$.filter(({ action }) => (
  action.type === DELETE_USER_ADDRESS_FAILED));

/**
 * Gets triggered when user requested to set address as default
 * @type {Observable}
 */
export const userSetDefaultAddress$ = main$
  .filter(({ action }) => action.type === SET_DEFAULT_ADDRESS);

/**
 * Gets triggered when user requested to delete addresses
 * @type {Observable}
 */
export const userDeleteAddresses$ = main$
  .filter(({ action }) => action.type === DELETE_ADDRESSES);
