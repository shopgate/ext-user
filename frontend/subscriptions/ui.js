import { routeDidEnter$, routeDidLeave$ } from '@shopgate/pwa-common/streams/router';
import { LoadingProvider } from '@shopgate/pwa-common/providers';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { setUserViewIsLoading, toggleNavigatorCart, toggleNavigatorSearch } from '../action-creators/ui';
import {
  USER_ADDRESS_BOOK_PATH,
  USER_ADDRESS_PATH,
  USER_PASSWORD_PATH,
  USER_PROFILE_PATH,
  USER_REGISTER_PATH,
} from '../constants/RoutePaths';
import {
  userRegisterFailed$,
  userUpdateFailed$,
  userUpdateSuccess$,
  userUpdateMailFailed$,
  userWillRegister$,
  userWillUpdate$,
} from '../streams/user';
import {
  getUserAddresses$,
  userAddressAdd$,
  userAddressChanged$,
  userAddressesDeleteConfirmed$,
  userAddressesReceived$,
  userAddressFailed$,
  userAddressReceiveFailed$,
  userAddressUpdate$,
} from '../streams/addressBook';
import { getLoadingViewPathName } from '../selectors/ui';

const userRoutePatterns = [
  USER_REGISTER_PATH,
  USER_PROFILE_PATH,
  USER_PASSWORD_PATH,
  USER_ADDRESS_BOOK_PATH,
  USER_ADDRESS_PATH,
];

export default (subscribe) => {
  const fullPageViewEnter$ = routeDidEnter$
    .filter(({ action }) => userRoutePatterns.includes(action.route.pattern));
  const fullPageViewLeave$ = routeDidLeave$
    .filter(({ action }) => userRoutePatterns.includes(action.route.pattern));

  const viewIsLoading$ = userWillRegister$.merge(
    userWillUpdate$,
    getUserAddresses$,
    userAddressAdd$,
    userAddressUpdate$,
    userAddressesDeleteConfirmed$
  );
  const viewIsIdle$ = userUpdateSuccess$.merge(
    userAddressesReceived$,
    userAddressReceiveFailed$,
    userUpdateFailed$,
    userRegisterFailed$,
    userUpdateMailFailed$,
    userAddressChanged$,
    userAddressFailed$
  );

  // Show search and cart buttons in navigator again after address book is closed.
  subscribe(fullPageViewLeave$, ({ dispatch }) => {
    dispatch(toggleNavigatorCart(true));
    dispatch(toggleNavigatorSearch(true));
  });

  // Hide search and cart buttons in navigator when address book is opened.
  subscribe(fullPageViewEnter$, ({ dispatch }) => {
    dispatch(toggleNavigatorCart(false));
    dispatch(toggleNavigatorSearch(false));
  });

  // View is loading
  subscribe(viewIsLoading$, ({ dispatch }) => {
    const { pattern } = getCurrentRoute();
    dispatch(setUserViewIsLoading(pattern));
    LoadingProvider.setLoading(pattern);
  });

  // View is idle
  subscribe(viewIsIdle$, ({ getState }) => {
    LoadingProvider.unsetLoading(getLoadingViewPathName(getState()));
  });
};
