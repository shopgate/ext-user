import getUser from '@shopgate/pwa-common/actions/user/getUser';
import { getRedirectLocation, getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import replaceHistory from '@shopgate/pwa-common/actions/history/replaceHistory';
import { successLogin } from '@shopgate/pwa-common/action-creators/user';
import { userDataReceived$ } from '@shopgate/pwa-common/streams/user';
import { setRedirectLocation } from '@shopgate/pwa-common/action-creators/history';
import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import createToast from '@shopgate/pwa-common/actions/toast/createToast';
import {
  userRegisterSuccess$,
  userUpdateSuccess$,
} from './../streams';

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
  subscribe(userUpdateSuccess$, ({ dispatch }) => {
    dispatch(createToast({ message: 'profile.updated' }));
  });
};
