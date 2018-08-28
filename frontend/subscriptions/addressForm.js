import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import { getAddressFields as getAddressFieldsSelector } from '@shopgate/user/selectors/addressForm';
import getAddressFields from '@shopgate/user/actions/getAddressFields';
import { routeDidEnter } from '@shopgate/pwa-common/streams/history';
import { USER_ADDRESS_BOOK_PATH } from '../constants/RoutePaths';

export default (subscribe) => {
  // Fetches address fields when not available yet.
  const fullPageViewEnter$ = routeDidEnter(USER_ADDRESS_BOOK_PATH);
  subscribe(fullPageViewEnter$, async ({ dispatch, getState }) => {
    const state = getState();
    const hasConfig = getAddressFieldsSelector(state) !== null;

    if (!hasConfig) {
      dispatch(setViewLoading(getHistoryPathname(state)));

      try {
        await dispatch(getAddressFields());
      } catch (_) {
        // Catch error to avoid the log in the console, because the pipeline error was already shown
      }

      dispatch(unsetViewLoading(getHistoryPathname(state)));
    }
  });
};
