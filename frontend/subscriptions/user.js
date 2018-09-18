import setTitle from '@shopgate/pwa-common/actions/view/setTitle';
import redirects from '@shopgate/pwa-common/collections/Redirects';
import { appWillStart$ } from '@shopgate/pwa-common/streams/app';
import getUser from '@shopgate/pwa-common/actions/user/getUser';
import showModal from '@shopgate/pwa-common/actions/modal/showModal';
import { getRedirectLocation, getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import replaceHistory from '@shopgate/pwa-common/actions/history/replaceHistory';
import { successLogin } from '@shopgate/pwa-common/action-creators/user';
import { userDataReceived$ } from '@shopgate/pwa-common/streams/user';
import { setRedirectLocation } from '@shopgate/pwa-common/action-creators/history';
import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import createToast from '@shopgate/pwa-common/actions/toast/createToast';
import {
  registerRouteWillEnter$,
  userRegisterSuccess$,
  userUpdateSuccess$,
} from './../streams/user';
import { USER_REGISTER_PATH } from '../constants/RoutePaths';

/**
 * Register subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  const fetchUser$ = userRegisterSuccess$.merge(userUpdateSuccess$);

  const registerAndDataReceived$ = userRegisterSuccess$
    .zip(userDataReceived$)
    .map(([first]) => first);

  subscribe(fetchUser$, ({ dispatch }) => {
    dispatch(getUser());
  });

  subscribe(appWillStart$, () => {
    redirects.unset(USER_REGISTER_PATH);
  });

  subscribe(registerRouteWillEnter$, ({ dispatch }) => {
    dispatch(setTitle('register.title'));
  });

  /**
   * After register and user data received
   */
  subscribe(registerAndDataReceived$, ({ dispatch, getState }) => {
    dispatch(unsetViewLoading(getHistoryPathname(getState())));

    const redirectLocation = getRedirectLocation(getState());

    dispatch(setRedirectLocation(null));

    dispatch(successLogin());
    if (redirectLocation) {
      setTimeout(dispatch, 50, replaceHistory(redirectLocation));
    } else {
      dispatch(goBackHistory(1));
    }
  });

  // Toast message, profile is updated
  subscribe(userUpdateSuccess$, ({ dispatch, action }) => {
    const { messages } = action;
    if (Array.isArray(messages) && messages.length > 0) {
      dispatch(showModal({
        confirm: 'modal.ok',
        dismiss: null,
        message: messages.join(' '),
      }));
      return;
    }

    dispatch(createToast({ message: 'profile.updated' }));
  });
};
