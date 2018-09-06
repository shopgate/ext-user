import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';
import { routeDidChange$ } from '@shopgate/pwa-common/streams/history';
import showModal from '@shopgate/pwa-common/actions/modal/showModal';
import createToast from '@shopgate/pwa-common/actions/toast/createToast';
import { userDidUpdate$ } from '@shopgate/pwa-common/streams/user';
import getAddresses from './../actions/getAddresses';
import {
  userAddressChanged$,
  userAddressesDelete$,
  userAddressesDeleted$,
  userAddressValidationFailed$,
  userSetDefaultAddress$,
} from './../streams/addressBook';
import { deleteUserAddressesConfirmed } from '../action-creators/addressBook';
import { getUserAddressIdSelector } from './../selectors/addressBook';
import updateAddress from './../actions/updateAddress';
import deleteAddresses from './../actions/deleteAddresses';
import { userAddressPathPattern, USER_ADDRESS_BOOK_PATH } from '../constants/RoutePaths';

const userAddressPathPrefix = userAddressPathPattern.stringify();

export default (subscribe) => {
  // Fetch addresses after login
  const userDidUpdateDebounced$ = userDidUpdate$.debounceTime(0);
  const userAddressBookEnter$ = routeDidChange$
    .filter(({ pathname, prevPathname }) => pathname === USER_ADDRESS_BOOK_PATH &&
      !prevPathname.startsWith(userAddressPathPrefix));

  // Show a toast message when validation is failed
  subscribe(userAddressValidationFailed$, ({ dispatch }) => {
    dispatch(createToast({ message: 'address.validationFailedToastMessage' }));
  });

  // Return back to address book, when address is added/updated
  subscribe(userAddressChanged$, ({ dispatch, action }) => {
    // Wait for getUser action to finish before continuing to avoid changing view
    dispatch(getAddresses(false)).then(() => {
      if (!action.silent) {
        dispatch(goBackHistory());
      }
    });
  });

  // Fetch user addresses on user account enter
  subscribe(userAddressBookEnter$, ({ dispatch }) => {
    dispatch(getAddresses(false));
  });

  // Fetch user addresses silently
  subscribe(userDidUpdateDebounced$, ({ dispatch }) => {
    dispatch(getAddresses());
  });

  // Dispatch action to backend to delete the given addresses after successful confirmation
  subscribe(userAddressesDelete$, ({ dispatch, action }) => {
    const { addressIds } = action;

    dispatch(showModal({
      confirm: 'address.delete.button',
      dismiss: 'modal.dismiss',
      title: 'address.delete.confirmationDialog.title',
      message: 'address.delete.confirmationDialog.message',
    })).then((confirmed) => {
      if (confirmed) {
        dispatch(deleteUserAddressesConfirmed());
        dispatch(deleteAddresses(addressIds));
      }
    });
  });

  // Dispatch action to show a toast message after the deletion was successfully performed
  subscribe(userAddressesDeleted$, ({ dispatch }) => {
    dispatch(createToast({ message: 'address.delete.successMessage' }));
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
    dispatch(updateAddress(addressClone, true));
  });
};
