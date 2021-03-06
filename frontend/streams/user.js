import { main$ } from '@shopgate/pwa-common/streams/main';
import { routeWillEnter$ } from '@shopgate/pwa-common/streams/router';
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_MAIL_FAILED,
} from './../constants/ActionTypes';
import { USER_REGISTER_PATH } from '../constants/RoutePaths';

/**
 * Get triggered when user will update.
 * @type {Observable}
 */
export const registerRouteWillEnter$ = routeWillEnter$
  .filter(({ action }) => action.route.pattern === USER_REGISTER_PATH);

/**
 * Get triggered when user will register.
 * @type {Observable}
 */
export const userWillRegister$ = main$.filter(({ action }) => action.type === REGISTER_USER);

/**
 * Get triggered when user will update.
 * @type {Observable}
 */
export const userWillUpdate$ = main$.filter(({ action }) => action.type === UPDATE_USER);

/**
 * Get triggered when user is registered.
 * @type {Observable}
 */
export const userRegisterSuccess$ = main$
  .filter(({ action }) => action.type === REGISTER_USER_SUCCESS);

/**
 * Get triggered when user registration failed
 * @type {Observable}
 */
export const userRegisterFailed$ = main$
  .filter(({ action }) => action.type === REGISTER_USER_FAILED);

/**
 * Get triggered when user is updated.
 * @type {Observable}
 */
export const userUpdateSuccess$ = main$
  .filter(({ action }) => action.type === UPDATE_USER_SUCCESS);

/**
 * Get triggered when user update failed
 * @type {Observable}
 */
export const userUpdateFailed$ = main$
  .filter(({ action }) => action.type === UPDATE_USER_FAILED);

/**
 * Get triggered when user mail update failed
 * @type {Observable}
 */
export const userUpdateMailFailed$ = main$
  .filter(({ action }) => action.type === UPDATE_USER_MAIL_FAILED);
