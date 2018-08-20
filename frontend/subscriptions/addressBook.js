import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';
import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import showModal from '@shopgate/pwa-common/actions/modal/showModal';
import createToast from '@shopgate/pwa-common/actions/toast/createToast';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import { userDidLogin$ } from '@shopgate/pwa-common/streams/user';
import getAddresses from './../actions/getAddresses';
import {
  userAddressAdd$,
  userAddressUpdate$,
  userAddressesDelete$,
  userAddressesDeleteConfirmed$,
  userAddressesDeleted$,
  userSetDefaultAddress$,
  userAddressValidationFailed$,
  addressBookDidEnter$,
  addressBookDidLeave$,
  userAddressChanged$,
  userAddressFailed$,
} from './../streams';
import { deleteUserAddressesConfirmed, toggleNavigatorSearch, toggleNavigatorCart } from '../action-creators';
import { getUserAddressIdSelector } from './../selectors/addressBook';
import updateAddress from './../actions/updateAddress';
import deleteAddresses from './../actions/deleteAddresses';
import EventEmitter from './../events/emitter';
import { NAVIGATOR_SAVE_BUTTON_HIDE } from './../constants/EventTypes';

export default (subscribe) => {
  const userAddressBusy$ = userAddressAdd$
    .merge(userAddressUpdate$)
    .merge(userAddressesDeleteConfirmed$);
  const userAddressIdle$ = userAddressChanged$.merge(userAddressFailed$);

  // Hide search and cart buttons in navigator when address book is opened.
  subscribe(addressBookDidEnter$, ({ dispatch }) => {
    dispatch(toggleNavigatorCart(false));
    dispatch(toggleNavigatorSearch(false));
  });

  // SHow search and cart buttons in navigator again after address book is closed.
  subscribe(addressBookDidLeave$, ({ dispatch }) => {
    dispatch(toggleNavigatorCart(true));
    dispatch(toggleNavigatorSearch(true));

    EventEmitter.emit(NAVIGATOR_SAVE_BUTTON_HIDE);
  });

  // Show a toast message when validation is failed
  subscribe(userAddressValidationFailed$, ({ dispatch }) => {
    dispatch(createToast({ message: 'address.validationFailedToastMessage' }));
  });

  // Addresses actions are in progress
  subscribe(userAddressBusy$, ({ dispatch, getState }) => {
    dispatch(setViewLoading(getHistoryPathname(getState())));
  });

  // Return back to address book, when address is added/updated
  subscribe(userAddressChanged$, ({ dispatch, getState, action }) => {
    dispatch(unsetViewLoading(getHistoryPathname(getState())));

    // Wait for getUser action to finish before continuing to avoid changing view
    dispatch(getAddresses()).then(() => {
      if (!action.silent) {
        dispatch(goBackHistory());
      }
    });
  });

  // Address actions are released
  subscribe(userAddressIdle$, ({ dispatch, getState }) => {
    dispatch(unsetViewLoading(getHistoryPathname(getState())));
  });

  // Fetch user addresses after login
  subscribe(userDidLogin$, ({ dispatch }) => {
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
