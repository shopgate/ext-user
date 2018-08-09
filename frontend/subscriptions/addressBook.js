import getUser from '@shopgate/pwa-common/actions/user/getUser';
import { userSetDefaultAddress$, userDeleteAddresses$, userAddressesDeleted$ } from './../streams';
import { getUserAddressIdSelector } from './../selectors/addressBook';
import updateAddress from './../actions/updateAddress';
import deleteAddresses from './../actions/deleteAddresses';

export default (subscribe) => {
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

  // Dispatch action to backend to delete the given addresses
  subscribe(userDeleteAddresses$, ({ dispatch, action }) => {
    const { addressIds } = action;
    dispatch(deleteAddresses(addressIds));
  });

  // Dispatch action to fetch the user data again after deletion is done
  subscribe(userAddressesDeleted$, ({ dispatch }) => {
    dispatch(getUser());
  });
};
