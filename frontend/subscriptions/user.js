import getUser from '@shopgate/pwa-common/actions/user/getUser';
import showModal from '@shopgate/pwa-common/actions/modal/showModal';
import { LoadingProvider, ToastProvider } from '@shopgate/pwa-common/providers';
import { historyPop } from '@shopgate/pwa-common/actions/router';
import { successLogin } from '@shopgate/pwa-common/action-creators/user';
import { userDataReceived$ } from '@shopgate/pwa-common/streams/user';
import { EINVALIDCREDENTIALS } from '@shopgate/pwa-core/constants/Pipeline';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import {
  userRegisterSuccess$,
  userUpdateFailed$,
  userUpdateSuccess$,
  userUpdateMailFailed$,
} from './../streams/user';
import { USER_PASSWORD_PATH } from './../constants/RoutePaths';

/**
 * Register subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  const fetchUser$ = userRegisterSuccess$.merge(userUpdateSuccess$);

  const registerAndDataReceived$ = userRegisterSuccess$.switchMap(() => userDataReceived$.first());

  subscribe(fetchUser$, ({ dispatch }) => {
    dispatch(getUser());
  });

  /** After register and user data received */
  subscribe(registerAndDataReceived$, ({ dispatch }) => {
    const { pattern } = getCurrentRoute();
    LoadingProvider.setLoading(pattern);
    dispatch(successLogin('/'));
  });

  // Toast message, profile, email, password is updated
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

    // Redirect to profile page after password change
    const { pathname } = getCurrentRoute();
    if (pathname === USER_PASSWORD_PATH) {
      dispatch(historyPop());
    }

    events.emit(ToastProvider.ADD, {
      id: 'profile.updated',
      message: 'profile.updated',
    });
  });

  // Modal message when profile or password update failed
  subscribe(userUpdateFailed$, ({ dispatch, action, events }) => {
    const { error } = action;

    if (error.code === EINVALIDCREDENTIALS) {
      dispatch(showModal({
        confirm: 'modal.ok',
        dismiss: null,
        message: 'password.errors.oldPassword',
      }));
    } else {
      events.emit(ToastProvider.ADD, {
        id: 'profile.failed',
        message: 'profile.failed',
      });
    }
  });

  subscribe(userUpdateMailFailed$, ({ action, events }) => {
    const { error: { validationErrors = [] } = {} } = action;

    const mailError = validationErrors.find(err => err.path === 'mail' || err.path === 'email');
    if (mailError) {
      events.emit(ToastProvider.ADD, {
        id: 'profile.failed',
        message: mailError.message || 'profile.failed',
      });
    } else {
      // Path not found, show general toast
      events.emit(ToastProvider.ADD, {
        id: 'profile.failed',
        message: 'profile.failed',
      });
    }
  });
};
