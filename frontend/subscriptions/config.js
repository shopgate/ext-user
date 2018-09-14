import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import getConfig from './../actions/getConfig';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  // Fetch config on app start
  subscribe(appDidStart$, ({ dispatch }) => {
    dispatch(getConfig());
  });
};
