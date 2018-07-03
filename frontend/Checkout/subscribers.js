import { main$ } from '@shopgate/pwa-common/streams/main';
import { getUserData } from '@shopgate/pwa-common/selectors/user';
import { userDidLogin$, userDataReceived$ } from '@shopgate/pwa-common/streams/user';
import getUser from '@shopgate/pwa-common/actions/user/getUser';

export default (subscribe) => {
  const checkoutEnter$ = main$.filter(({ action }) => action.type === 'CHECKOUT_ENTER');

  /**
   * After entering checkout, user data can be fetched (after login)
   * Zip both streams to have 1 subscriber to set checkout data
   */
  const userDataReceivedCheckout$ = checkoutEnter$
    .zip(userDataReceived$)
    .map(([checkoutEnterAction]) => checkoutEnterAction);

  /**
   * Merge streams of entering into checkout and user data
   * to update checkout state
   */
  const checkoutEnterUser$ = checkoutEnter$.merge(userDataReceivedCheckout$);

  /**
   * Request user data with addresses, if addresses not fetched yet
   */
  subscribe(userDidLogin$, ({ dispatch, getState }) => {
    const { addresses } = getUserData(getState());
    if (!addresses) {
      dispatch(getUser());
    }
  });

  /**
   * Add addresses selection to checkout
   */
  subscribe(checkoutEnterUser$, ({ dispatch, getState, action }) => {
    const { addresses } = getUserData(getState());
    const { checkout } = action;

    if (!checkout.shippingAddress && addresses) {
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

    if (!checkout.billingAddress && addresses) {
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
