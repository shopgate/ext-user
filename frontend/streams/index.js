import { main$ } from '@shopgate/pwa-common/streams/main';
import {
  ADD_USER_ADDRESS,
  ADD_USER_ADDRESS_SUCCESS,
  ADD_USER_ADDRESS_FAILED,
  UPDATE_USER_ADDRESS,
  UPDATE_USER_ADDRESS_SUCCESS,
  UPDATE_USER_ADDRESS_FAILED,
  SET_DEFAULT_ADDRESS,
  USER_ADDRESS_VALIDATION_FAILS,
} from './../constants/ActionTypes';

/**
 * Gets triggered when user address is going to be added
 * @type {Observable}
 */
export const userAddressAdd$ = main$.filter(({ action }) => (
  action.type === ADD_USER_ADDRESS
));

/**
 * Gets triggered when user address is going to be updated
 * @type {Observable}
 */
export const userAddressUpdate$ = main$.filter(({ action }) => (
  action.type === UPDATE_USER_ADDRESS
));

/**
 * Gets triggered when user address is added
 * @type {Observable}
 */
export const userAddressAdded$ = main$.filter(({ action }) => (
  action.type === ADD_USER_ADDRESS_SUCCESS
));

/**
 * Gets triggered when user address adding failed
 * @type {Observable}
 */
export const userAddressAddFailed$ = main$.filter(({ action }) => (
  action.type === ADD_USER_ADDRESS_FAILED));

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

/**
 * Gets triggered when user address validation is failed
 * @type {Observable}
 */
export const userAddressValidationFailed$ = main$.filter(({ action }) => (
  action.type === USER_ADDRESS_VALIDATION_FAILS));

