import { ToastProvider, LoadingProvider } from '@shopgate/pwa-common/providers';
import getUser from '@shopgate/pwa-common/actions/user/getUser';
import showModal from '@shopgate/pwa-common/actions/modal/showModal';
import { successLogin } from '@shopgate/pwa-common/action-creators/user';
import { userDataReceived$ } from '@shopgate/pwa-common/streams/user';
import { getCurrentRoute } from '@shopgate/pwa-common/selectors/router';
import {
  userRegisterSuccess$,
  userUpdateSuccess$,
} from './../streams/user';

/**
 * Register subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  const fetchUser$ = userRegisterSuccess$.merge(userUpdateSuccess$);

  /** After register and user data received */
  const registerAndDataReceived$ = userRegisterSuccess$.switchMap(() => userDataReceived$.first());

  subscribe(fetchUser$, ({ dispatch }) => {
    dispatch(getUser());
  });

  subscribe(registerAndDataReceived$, ({ dispatch }) => {
    const { pathname } = getCurrentRoute();
    LoadingProvider.unsetLoading(pathname);
    dispatch(successLogin('/'));
  });

  /** Profile is updated */
  subscribe(userUpdateSuccess$, ({ dispatch, action, events }) => {
    const { messages } = action;
    if (Array.isArray(messages) && messages.length > 0) {
      dispatch(showModal({
        confirm: 'modal.ok',
        dismiss: null,
        message: messages.join(' '),
      }));
      return;
    }

    events.emit(ToastProvider.ADD, {
      id: 'profile.updated',
      message: 'profile.updated',
    });
  });
};
