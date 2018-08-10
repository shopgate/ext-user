import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';
import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import createToast from '@shopgate/pwa-common/actions/toast/createToast';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import getUser from '@shopgate/pwa-common/actions/user/getUser';
import {
  userAddressAdd$,
  userAddressUpdate$,
  userSetDefaultAddress$,
  userAddressValidationFailed$,
  addressBookDidEnter$,
  addressBookDidLeave$,
  userAddressChanged$,
  userAddressFailed$,
} from './../streams';
import { toggleNavigatorSearch, toggleNavigatorCart } from '../action-creators';
import { getUserAddressIdSelector } from './../selectors/addressBook';
import updateAddress from './../actions/updateAddress';
import EventEmitter from './../events/emitter';
import { NAVIGATOR_USER_ADDRESS_BUTTON_HIDE } from './../constants/EventTypes';

export default (subscribe) => {
  const userAddressBusy$ = userAddressAdd$.merge(userAddressUpdate$);
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
    dispatch(getUser());

    if (!action.silent) {
      dispatch(goBackHistory());

      EventEmitter.emit(NAVIGATOR_USER_ADDRESS_BUTTON_HIDE);
    }
  });

  // Address actions are released
  subscribe(userAddressIdle$, ({ dispatch, getState }) => {
    dispatch(unsetViewLoading(getHistoryPathname(getState())));
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
