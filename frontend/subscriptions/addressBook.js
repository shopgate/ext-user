import replaceHistory from '@shopgate/pwa-common/actions/history/replaceHistory';
import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import createToast from '@shopgate/pwa-common/actions/toast/createToast';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import { USER_ADDRESS_BOOK_PATH } from './../constants/RoutePaths';
import {
  userAddressAdd$,
  userAddressUpdate$,
  userSetDefaultAddress$,
  userAddressAdded$,
  userAddressUpdated$,
  userAddressValidationFailed$,
} from './../streams';
import { getUserAddressIdSelector } from './../selectors/addressBook';
import updateAddress from './../actions/updateAddress';

export default (subscribe) => {
  const userAddressChanged$ = userAddressAdded$.merge(userAddressUpdated$);
  const userAddressBusy$ = userAddressAdd$.merge(userAddressUpdate$);

  // Show a toast message when validation is failed
  subscribe(userAddressValidationFailed$, ({ dispatch }) => {
    dispatch(createToast({ message: 'address.validationFailedToastMessage' }));
  });

  // Return back to address bok, when address is added/updated
  subscribe(userAddressBusy$, ({ dispatch, getState }) => {
    dispatch(setViewLoading(getHistoryPathname(getState())));
  });

  // Return back to address bok, when address is added/updated
  subscribe(userAddressChanged$, ({ dispatch, getState }) => {
    dispatch(unsetViewLoading(getHistoryPathname(getState())));

    // Go back to address book
    dispatch(replaceHistory({ pathname: USER_ADDRESS_BOOK_PATH }));
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
