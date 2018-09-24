import { routeDidEnter, routeDidLeave } from '@shopgate/pwa-common/streams/history';
import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import EventEmitter from '@shopgate/user/events/emitter';
import {
  NAVIGATOR_SAVE_BUTTON_CLICK,
  NAVIGATOR_SAVE_BUTTON_HIDE,
} from '@shopgate/user/constants/EventTypes';
import { toggleNavigatorCart, toggleNavigatorSearch } from '../action-creators/ui';
import {
  USER_PROFILE_PATH,
  USER_REGISTER_PATH,
  USER_ADDRESS_BOOK_PATH,
  userAddressPathPattern,
  USER_PASSWORD_PATH,
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

export default (subscribe) => {
  const userAddressPath = userAddressPathPattern.stringify();
  const fullPageViewEnter$ = routeDidEnter(USER_REGISTER_PATH)
    .merge(
      routeDidEnter(USER_PROFILE_PATH),
      routeDidEnter(USER_ADDRESS_BOOK_PATH),
      routeDidEnter(userAddressPath),
      routeDidEnter(USER_PASSWORD_PATH)
    );
  const fullPageViewLeave$ = routeDidLeave(USER_REGISTER_PATH)
    .merge(
      routeDidLeave(USER_PROFILE_PATH),
      routeDidLeave(USER_ADDRESS_BOOK_PATH),
      routeDidLeave(userAddressPath),
      routeDidLeave(USER_PASSWORD_PATH)
    );

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
    dispatch(setViewLoading(getHistoryPathname(getState())));
  });

  // View is idle
  subscribe(viewIsIdle$, ({ dispatch, getState }) => {
    dispatch(unsetViewLoading(getHistoryPathname(getState())));
  });
};
