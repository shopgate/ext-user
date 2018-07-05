import getUser from '@shopgate/pwa-common/actions/user/getUser';
import { getRedirectLocation } from '@shopgate/pwa-common/selectors/history';
import replaceHistory from '@shopgate/pwa-common/actions/history/replaceHistory';
import { successLogin } from '@shopgate/pwa-common/action-creators/user';
import { userDataReceived$ } from '@shopgate/pwa-common/streams/user';
import { setRedirectLocation } from '@shopgate/pwa-common/action-creators/history';
import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';

import { registerFailed$, registerSuccess$ } from './streams';

/**
 * Register subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  const registerAndDataReceived$ = registerSuccess$.zip(userDataReceived$).map(([first]) => first);

  subscribe(registerFailed$, () => {
    // Dispatch action here
  });

  subscribe(registerSuccess$, ({ dispatch }) => {
    dispatch(getUser());
  });

  /**
   * After register and user data received
   */
  subscribe(registerAndDataReceived$, ({ dispatch, getState }) => {
    const redirectLocation = getRedirectLocation(getState());

    dispatch(setRedirectLocation(null));

    dispatch(successLogin());

    if (redirectLocation) {
      setTimeout(dispatch, 50, replaceHistory(redirectLocation));
    } else {
      dispatch(goBackHistory(1));
    }
  });
};
