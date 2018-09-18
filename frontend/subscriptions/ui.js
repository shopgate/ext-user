import { routeDidEnter$, routeDidLeave$ } from '@shopgate/pwa-common/streams/router';
import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import EventEmitter from '../events/emitter';
import {
  NAVIGATOR_SAVE_BUTTON_CLICK,
  NAVIGATOR_SAVE_BUTTON_HIDE,
} from '../constants/EventTypes';
import { toggleNavigatorCart, toggleNavigatorSearch } from '../action-creators/ui';
import {
  USER_ADDRESS_PATH,
  USER_ADDRESS_BOOK_PATH,
  USER_PROFILE_PATH,
  USER_REGISTER_PATH,
} from '../constants/RoutePaths';
import {
  userWillRegister$,
  userWillUpdate$,
  userUpdateSuccess$,
  userUpdateFailed$,
  userRegisterFailed$,
} from '../streams/user';
import {
  getUserAddresses$,
  userAddressesReceived$,
  userAddressReceiveFailed$,
  userAddressAdd$,
  userAddressUpdate$,
  userAddressChanged$,
  userAddressFailed$,
  userAddressesDeleteConfirmed$,
} from '../streams/addressBook';

const USER_PATHS = [
  USER_ADDRESS_PATH,
  USER_ADDRESS_BOOK_PATH,
  USER_PROFILE_PATH,
  USER_REGISTER_PATH,
];

export default (subscribe) => {
  const fullPageViewEnter$ = routeDidEnter$
    .filter(({ action }) => USER_PATHS.includes(action.route.pattern));

  const fullPageViewLeave$ = routeDidLeave$
    .filter(({ action }) => USER_PATHS.includes(action.route.pattern));

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
    userAddressChanged$,
    userAddressFailed$
  );

  // Show search and cart buttons in navigator again after address book is closed.
  subscribe(fullPageViewLeave$, ({ dispatch }) => {
    dispatch(toggleNavigatorCart(true));
    dispatch(toggleNavigatorSearch(true));

    EventEmitter.removeAllListeners(NAVIGATOR_SAVE_BUTTON_CLICK);
    EventEmitter.emit(NAVIGATOR_SAVE_BUTTON_HIDE);
  });

  // Hide search and cart buttons in navigator when address book is opened.
  subscribe(fullPageViewEnter$, ({ dispatch }) => {
    dispatch(toggleNavigatorCart(false));
    dispatch(toggleNavigatorSearch(false));
  });

  // View is loading
  subscribe(viewIsLoading$, ({ dispatch, getState }) => {
    // TODO: change
    dispatch(setViewLoading(getHistoryPathname(getState())));
  });

  // View is idle
  subscribe(viewIsIdle$, ({ dispatch, getState }) => {
    // TODO: change
    dispatch(unsetViewLoading(getHistoryPathname(getState())));
  });
};
