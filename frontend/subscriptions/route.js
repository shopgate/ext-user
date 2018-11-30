import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import { authRouter } from '@shopgate/pwa-common/collections';
import { LOGIN_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import * as path from '../constants/RoutePaths';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  subscribe(appDidStart$, () => {
    authRouter.set(path.USER_PROFILE_PATH, LOGIN_PATH);
    authRouter.set(path.USER_ADDRESS_BOOK_PATH, LOGIN_PATH);
    authRouter.set(path.USER_ADDRESS_PATH, LOGIN_PATH);
  });
};
