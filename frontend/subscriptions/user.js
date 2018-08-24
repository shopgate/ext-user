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
import { EINVALIDCREDENTIALS } from '@shopgate/pwa-core/constants/Pipeline';
import {
  userRegisterSuccess$,
  userUpdateSuccess$,
  userUpdateFailed$,
} from './../streams/user';

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

  // Modal message when profile or password update failed
  subscribe(userUpdateFailed$, ({ dispatch, action }) => {
    const { error } = action;

    if (error.code === EINVALIDCREDENTIALS) {
      dispatch(showModal({
        confirm: 'modal.ok',
        dismiss: null,
        message: 'password.errors.oldPassword',
      }));
    } else {
      dispatch(createToast({ message: 'profile.failed' }));
    }
  });
};
