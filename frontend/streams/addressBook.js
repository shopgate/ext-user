import { main$ } from '@shopgate/pwa-common/streams/main';
import { EVALIDATION } from '@shopgate/pwa-core/constants/Pipeline';
import {
  GET_USER_ADDRESSES,
  USER_ADDRESSES_RECEIVED,
  USER_ADDRESSES_FAILED,
  ADD_USER_ADDRESS,
  ADD_USER_ADDRESS_SUCCESS,
  ADD_USER_ADDRESS_FAILED,
  UPDATE_USER_ADDRESS,
  UPDATE_USER_ADDRESS_SUCCESS,
  UPDATE_USER_ADDRESS_FAILED,
  DELETE_USER_ADDRESSES,
  DELETE_USER_ADDRESSES_CONFIRMED,
  DELETE_USER_ADDRESSES_SUCCESS,
  DELETE_USER_ADDRESSES_FAILED,
  SET_DEFAULT_ADDRESS,
} from './../constants/ActionTypes';

/**
 * Gets triggered when we fetch user addresses
 * @type {Observable}
 */
export const getUserAddresses$ = main$.filter(({ action }) => (
  action.type === GET_USER_ADDRESSES
));

/**
 * Gets triggered when user addresses are received
 * @type {Observable}
 */
export const userAddressesReceived$ = main$.filter(({ action }) => (
  action.type === USER_ADDRESSES_RECEIVED
));

/**
 * Gets triggered when user addresses are failed to receive
 * @type {Observable}
 */
export const userAddressReceiveFailed$ = main$.filter(({ action }) => (
  action.type === USER_ADDRESSES_FAILED
));

/**
 * Gets triggered when user address is going to be added
 * @type {Observable}
 */
export const userAddressAdd$ = main$.filter(({ action }) => (
  action.type === ADD_USER_ADDRESS
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
 * Gets triggered when user address is going to be updated
 * @type {Observable}
 */
export const userAddressUpdate$ = main$.filter(({ action }) => (
  action.type === UPDATE_USER_ADDRESS
));

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
 * Gets triggered when user requested to delete addresses
 * @type {Observable}
 */
export const userAddressesDelete$ = main$
  .filter(({ action }) => action.type === DELETE_USER_ADDRESSES);

/**
 * Gets triggered when user requested to delete addresses
 * @type {Observable}
 */
export const userAddressesDeleteConfirmed$ = main$
  .filter(({ action }) => action.type === DELETE_USER_ADDRESSES_CONFIRMED);

/**
 * Gets triggered when the given user addresses were deleted
 * @type {Observable}
 */
export const userAddressesDeleted$ = main$.filter(({ action }) => (
  action.type === DELETE_USER_ADDRESSES_SUCCESS
));

/**
 * Gets triggered when the user address deletion failed
 * @type {Observable}
 */
export const userAddressesDeleteFailed$ = main$.filter(({ action }) => (
  action.type === DELETE_USER_ADDRESSES_FAILED));

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
export const userAddressValidationFailed$ = userAddressAddFailed$
  .merge(userAddressUpdateFailed$)
  .filter(({ action: { error } }) => error.code === EVALIDATION);

/**
 * Gets triggered when user addresses are changed: received, new added, existing updated or deleted
 * @type {Observable}
 */
export const userAddressChanged$ = userAddressAdded$
  .merge(
    userAddressUpdated$,
    userAddressesDeleted$
  );

/**
 * Gets triggered when adding/updating or deleting address is failed
 * @type {Observable}
 */
export const userAddressFailed$ = userAddressAddFailed$
  .merge(
    userAddressUpdateFailed$,
    userAddressesDeleteFailed$
  );
