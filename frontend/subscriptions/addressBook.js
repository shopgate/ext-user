import { userSetDefaultAddress$ } from './../streams';
import { getUserAddressIdSelector } from './../selectors/addressBook';
import updateAddress from './../actions/updateAddress';

export default (subscribe) => {
  // Dispatch action to backend to sync user selection
  subscribe(userSetDefaultAddress$, ({ dispatch, action, getState }) => {
    const { addressId, tag } = action;
    const address = getUserAddressIdSelector(getState())(addressId);
    if (!address) {
      return;
    }

    if (!address.tags) {
      address.tags = [];
    }
    // Tag is prefixed with default_ for shipping, billing, etc
    const defTag = tag === 'default' ? tag : `default_${tag}`;

    address.tags.push(defTag);
    dispatch(updateAddress(address));
  });
};
