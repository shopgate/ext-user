import { ToastProvider } from '@shopgate/pwa-common/providers';
import { historyPop } from '@shopgate/pwa-common/actions/router/historyPop';
import { routeDidEnter$, routeDidLeave$ } from '@shopgate/pwa-common/streams/router';
import showModal from '@shopgate/pwa-common/actions/modal/showModal';
import { userDidUpdate$ } from '@shopgate/pwa-common/streams/user';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import getAddresses from './../actions/getAddresses';
import {
  userAddressChanged$,
  userAddressesDelete$,
  userAddressesDeleted$,
  userAddressValidationFailed$,
  userSetDefaultAddress$,
  userAddressesDeleteFailed$,
} from './../streams/addressBook';
import { deleteUserAddressesConfirmed, userAddressFormLeave } from '../action-creators/addressBook';
import { getUserAddressIdSelector } from './../selectors/addressBook';
import updateAddress from './../actions/updateAddress';
import deleteAddresses from './../actions/deleteAddresses';
import { USER_ADDRESS_PATH, USER_ADDRESS_BOOK_PATH } from '../constants/RoutePaths';
import { ENOREMOVEDEFAULT } from '../constants/Pipelines';

export default (subscribe) => {
  // Fetch addresses after login
  const userDidUpdateDebounced$ = userDidUpdate$.debounceTime(0);

  const userAddressBookEnter$ = routeDidLeave$
    .filter(({ action }) => action.route.pattern !== USER_ADDRESS_PATH)
    .switchMap(() => routeDidEnter$
      .filter(({ action }) => action.route.pattern === USER_ADDRESS_BOOK_PATH));

  const addressFormLeave$ = routeDidLeave$
    .filter(({ action }) => action.route.pattern === USER_ADDRESS_PATH);

  // Leave address form
  subscribe(addressFormLeave$, ({ dispatch }) => {
    dispatch(userAddressFormLeave());
  });

  // Show a toast message when validation is failed
  subscribe(userAddressValidationFailed$, ({ events }) => {
    events.emit(ToastProvider.ADD, {
      id: 'address.validationFailed',
      message: 'address.validationFailedToastMessage',
    });
  });

  // Return back to address book, when address is added/updated
  subscribe(userAddressChanged$, ({ dispatch, action }) => {
    // Wait for getUser action to finish before continuing to avoid changing view
    dispatch(getAddresses(false)).then(() => {
      if (!action.silent) {
        const { pattern } = getCurrentRoute();
        // Check if we still on address page
        if (pattern === USER_ADDRESS_PATH) {
          dispatch(historyPop());
        }
      }
    });
  });

  // Fetch user addresses on user account enter
  subscribe(userAddressBookEnter$, ({ dispatch }) => {
    dispatch(getAddresses(false));
  });

  // Fetch user addresses silently
  subscribe(userDidUpdateDebounced$, ({ dispatch, getState }) => {
    const { user: { data: { id: userId = null } = {} } = {} } = getState();
    if (userId) {
      dispatch(getAddresses());
    }
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
  subscribe(userAddressesDeleted$, ({ events }) => {
    events.emit(ToastProvider.ADD, {
      id: 'address.delete',
      message: 'address.delete.successMessage',
    });
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

  // Dispatch action to show a toast message that deletion failed
  subscribe(userAddressesDeleteFailed$, ({ action, events }) => {
    const { error: { code } = {} } = action;
    if (code === ENOREMOVEDEFAULT) {
      events.emit(ToastProvider.ADD, {
        id: 'address.delete',
        message: 'address.delete.noRemoveDefault',
      });
    }
  });
};
