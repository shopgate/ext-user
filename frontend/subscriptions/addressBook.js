import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';
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
  addressBookDidEnter$,
  addressBookDidLeave$,
} from './../streams';
import { toggleNavigatorSearch, toggleNavigatorCart } from '../action-creators';
import { getUserAddressIdSelector } from './../selectors/addressBook';
import updateAddress from './../actions/updateAddress';

export default (subscribe) => {
  const userAddressChanged$ = userAddressAdded$.merge(userAddressUpdated$);
  const userAddressBusy$ = userAddressAdd$.merge(userAddressUpdate$);

  // Hide search and cart buttons in navigator when address book is opened.
  subscribe(addressBookDidEnter$, ({ dispatch }) => {
    dispatch(toggleNavigatorCart(false));
    dispatch(toggleNavigatorSearch(false));
  });

  // SHow search and cart buttons in navigator again after address book is closed.
  subscribe(addressBookDidLeave$, ({ dispatch }) => {
    dispatch(toggleNavigatorCart(true));
    dispatch(toggleNavigatorSearch(true));
  });

  // Show a toast message when validation is failed
  subscribe(userAddressValidationFailed$, ({ dispatch }) => {
    dispatch(createToast({ message: 'address.validationFailedToastMessage' }));
  });

  // Return back to address bok, when address is added/updated
  subscribe(userAddressBusy$, ({ dispatch, getState }) => {
    dispatch(setViewLoading(getHistoryPathname(getState())));
  });

  // Return back to address book, when address is added/updated
  subscribe(userAddressChanged$, ({ dispatch, getState }) => {
    dispatch(unsetViewLoading(getHistoryPathname(getState())));
    dispatch(goBackHistory());
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
