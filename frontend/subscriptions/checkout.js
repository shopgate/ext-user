import { main$ } from '@shopgate/pwa-common/streams/main';
import { routeDidChange$ } from '@shopgate/pwa-common/streams/router';
import { getUserData } from '@shopgate/pwa-common/selectors/user';
import { userDataReceived$ } from '@shopgate/pwa-common/streams/user';
import getUser from '@shopgate/pwa-common/actions/user/getUser';
import { historyReplace } from '@shopgate/pwa-common/actions/router/historyReplace';

export default (subscribe) => {
  const selectAddressRouteDidEnter$ = routeDidChange$.filter(({ pathname }) => pathname === '/checkout/selectAddress');
  const checkoutEnter$ = main$.filter(({ action }) => action.type === 'CHECKOUT_ENTER');
  const addAddressSuccess$ = main$.filter(({ action }) => action.type === 'ADD_ADDRESS_SUCCESS');

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
   * Add addresses selection to checkout
   */
  subscribe(checkoutEnterUser$, ({ dispatch, getState, action }) => {
    const { addresses } = getUserData(getState());
    const { checkout } = action;

    // Checkout has no selected address yet, preselect from user
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

    // Checkout has no selected address yet, preselect from user
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

  /**
   * User added an address
   */
  subscribe(addAddressSuccess$, ({ dispatch, action }) => {
    const { address } = action;
    const { tags: ignore, ...restAddress } = address;

    // Refresh user data
    dispatch(getUser());

    if (address.tags.includes('shipping')) {
      // Append checkout data
      dispatch({
        type: 'CHECKOUT_DATA',
        id: 'shippingAddress',
        data: restAddress,
      });
    }
    if (address.tags.includes('billing')) {
      // Append checkout data
      dispatch({
        type: 'CHECKOUT_DATA',
        id: 'billingAddress',
        data: restAddress,
      });
    }
  });

  /**
   * Redirect to add address when select address page navigated with no addresses
   */
  subscribe(selectAddressRouteDidEnter$, ({ dispatch, getState }) => {
    const { addresses } = getUserData(getState());
    if (!addresses || !addresses.length) {
      dispatch(historyReplace({ pathname: '/checkout/addAddress' }));
    }
  });
};
