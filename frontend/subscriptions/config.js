import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import getConfig from './../actions/getConfig';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  /** Fetch config after app start */
  const appDidStartDebounced$ = appDidStart$.debounceTime(500);
  subscribe(appDidStartDebounced$, ({ dispatch }) => {
    dispatch(getConfig());
  });
};
