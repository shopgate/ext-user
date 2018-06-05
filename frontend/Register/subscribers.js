import { successLogin } from '@shopgate/pwa-common/action-creators/user';
import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';
import { registerFailed$, registerSuccess$ } from './streams';

/**
 * Register subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  subscribe(registerFailed$, () => {
    // Dispatch action here
  });

  subscribe(registerSuccess$, ({ dispatch }) => {
    dispatch(successLogin());
    dispatch(goBackHistory());
  });
};
