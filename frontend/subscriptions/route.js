import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import { authRoutes } from '@shopgate/pwa-common/collections';
import { LOGIN_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import * as path from '../constants/RoutePaths';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  subscribe(appDidStart$, () => {
    authRoutes.set(path.USER_PROFILE_PATH, LOGIN_PATH);
    authRoutes.set(path.USER_ADDRESS_BOOK_PATH, LOGIN_PATH);
    authRoutes.set(path.USER_ADDRESS_PATH, LOGIN_PATH);
  });
};
