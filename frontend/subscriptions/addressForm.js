import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import { addressBookDidEnter$ } from '@shopgate/user/streams';
import { getAddressFields as getAddressFieldsSelector } from '@shopgate/user/selectors/addressForm';
import getAddressFields from '@shopgate/user/actions/getAddressFields';

export default (subscribe) => {
  // Fetches address fields when not available yet.
  subscribe(addressBookDidEnter$, async ({ dispatch, getState }) => {
    const state = getState();
    const hasConfig = getAddressFieldsSelector(state) !== null;

    if (!hasConfig) {
      dispatch(setViewLoading(getHistoryPathname(state)));

      try {
        await dispatch(getAddressFields());
      } catch (_) {}

      dispatch(unsetViewLoading(getHistoryPathname(state)));
    }
  });
};