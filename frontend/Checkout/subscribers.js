import { main$ } from '@shopgate/pwa-common/streams/main';
import { getUserData } from '@shopgate/pwa-common/selectors/user';

export default (subscribe) => {
  const checkoutEnter$ = main$.filter(({ action }) => action.type === 'CHECKOUT_ENTER');

  /**
   * Add addresses selection to checkout
   */
  subscribe(checkoutEnter$, ({ dispatch, getState, action }) => {
    const { addresses } = getUserData(getState());
    const { checkout } = action;

    if (!checkout.shippingAddress) {
      const shipAddress = addresses.find(address => address.tags && address.tags.includes('shipping'));
      if (shipAddress) {
        const { tags: ignore, ...restAddress } = shipAddress;
        dispatch({
          type: 'CHECKOUT_DATA',
          id: 'shippingAddress',
          data: restAddress,
        });
      }
    }

    if (!checkout.billingAddress) {
      const bilAddress = addresses.find(address => address.tags && address.tags.includes('billing'));
      if (bilAddress) {
        const { tags: ignore, ...restAddress } = bilAddress;
        dispatch({
          type: 'CHECKOUT_DATA',
          id: 'billingAddress',
          data: restAddress,
        });
      }
    }
  });
};
