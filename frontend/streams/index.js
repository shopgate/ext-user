import { main$ } from '@shopgate/pwa-common/streams/main';
import { routeDidChange$ } from '@shopgate/pwa-common/streams/history';
import { EVALIDATION } from '@shopgate/pwa-core/constants/Pipeline';
import {
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
import {
  USER_ADDRESS_BOOK_PATH,
  userAddressPathPattern,
} from './../constants/RoutePaths';

/**
 * Get triggered when the address book route is entered.
 * @type {Observable}
 */
export const addressBookDidEnter$ = routeDidChange$
  .filter(({ pathname, prevPathname }) =>
    pathname === USER_ADDRESS_BOOK_PATH &&
    prevPathname !== USER_ADDRESS_BOOK_PATH);

/**
 * Gets triggered when the address book route was left.
 * @type {Observable}
 */
export const addressBookDidLeave$ = routeDidChange$
  .filter(({ pathname, prevPathname }) =>
    (pathname !== USER_ADDRESS_BOOK_PATH && !userAddressPathPattern.match(pathname)) &&
    (prevPathname === USER_ADDRESS_BOOK_PATH || userAddressPathPattern.match(pathname)));

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
 * Gets triggered when user addresses are changed: new added, existing updated or deleted
 * @type {Observable}
 */
export const userAddressChanged$ = userAddressAdded$
  .merge(userAddressUpdated$)
  .merge(userAddressesDeleted$);

/**
 * Gets triggered when adding/updating or deleting address is failed
 * @type {Observable}
 */
export const userAddressFailed$ = userAddressAddFailed$
  .merge(userAddressUpdateFailed$)
  .merge(userAddressesDeleteFailed$);
