import replaceHistory from '@shopgate/pwa-common/actions/history/replaceHistory';
import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import createToast from '@shopgate/pwa-common/actions/toast/createToast';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import getUser from '@shopgate/pwa-common/actions/user/getUser';
import { USER_ADDRESS_BOOK_PATH } from './../constants/RoutePaths';
import {
  userAddressAdd$,
  userAddressUpdate$,
  userSetDefaultAddress$,
  userAddressValidationFailed$,
  userAddressChanged$,
  userAddressFailed$,
} from './../streams';
import { getUserAddressIdSelector } from './../selectors/addressBook';
import updateAddress from './../actions/updateAddress';

export default (subscribe) => {
  const userAddressBusy$ = userAddressAdd$.merge(userAddressUpdate$);
  const userAddressIdle$ = userAddressChanged$.merge(userAddressFailed$);

  // Show a toast message when validation is failed
  subscribe(userAddressValidationFailed$, ({ dispatch }) => {
    dispatch(createToast({ message: 'address.validationFailedToastMessage' }));
  });

  // Addresses actions are in progress
  subscribe(userAddressBusy$, ({ dispatch, getState }) => {
    dispatch(setViewLoading(getHistoryPathname(getState())));
  });

  // Address actions are released
  subscribe(userAddressIdle$, ({ dispatch, getState }) => {
    dispatch(unsetViewLoading(getHistoryPathname(getState())));
  });

  // User addresses are changed
  subscribe(userAddressChanged$, ({ dispatch }) => {
    // Go back to address book
    // TODO later, go to previous page hen defined
    dispatch(replaceHistory({ pathname: USER_ADDRESS_BOOK_PATH }));

    // Fetch user data with addresses to sync redux store
    dispatch(getUser());
  });

  // Dispatch action to backend to sync user selection
  subscribe(userSetDefaultAddress$, ({ dispatch, action, getState }) => {
    const { addressId, tag } = action;
    const address = getUserAddressIdSelector(getState())(addressId);
    if (!address) {
      return;
    }

    const addressClone = { ...address };

    if (!addressClone.tags) {
      addressClone.tags = [];
    }
    // Tag is prefixed with default_ for shipping, billing, etc
    const defTag = tag === 'default' ? tag : `default_${tag}`;

    addressClone.tags.push(defTag);
    dispatch(updateAddress(addressClone));
  });
};
