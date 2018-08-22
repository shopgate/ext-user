import { routeDidEnter, routeDidLeave } from '@shopgate/pwa-common/streams/history';
import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import EventEmitter from '@shopgate/user/events/emitter';
import {
  NAVIGATOR_SAVE_BUTTON_CLICK,
  NAVIGATOR_SAVE_BUTTON_HIDE,
} from '@shopgate/user/constants/EventTypes';
import { toggleNavigatorCart, toggleNavigatorSearch } from '../action-creators';
import {
  USER_PROFILE_PATH,
  USER_REGISTER_PATH,
  USER_ADDRESS_BOOK_PATH,
  USER_ADDRESS_PATH,
} from '../constants/RoutePaths';
import {
  userWillRegister$,
  userWillUpdate$,
  userUpdateSuccess$,
  userUpdateFailed$,
  userAddressAdd$,
  userAddressUpdate$,
  userAddressChanged$,
  userAddressFailed$,
  userAddressesDeleteConfirmed$,
} from '../streams';

export default (subscribe) => {
  const fullPageViewEnter$ = routeDidEnter(USER_REGISTER_PATH)
    .merge(
      routeDidEnter(USER_PROFILE_PATH),
      routeDidEnter(USER_ADDRESS_BOOK_PATH),
      routeDidEnter(USER_ADDRESS_PATH)
    );
  const fullPageViewLeave$ = routeDidLeave(USER_REGISTER_PATH)
    .merge(
      routeDidLeave(USER_PROFILE_PATH),
      routeDidLeave(USER_ADDRESS_BOOK_PATH),
      routeDidLeave(USER_ADDRESS_PATH)
    );

  const viewIsLoading$ = userWillRegister$.merge(
    userWillUpdate$,
    userAddressAdd$,
    userAddressUpdate$,
    userAddressesDeleteConfirmed$
  );
  const viewIsIdle$ = userUpdateSuccess$.merge(
    userUpdateFailed$,
    userAddressChanged$,
    userAddressFailed$
  );

  // Hide search and cart buttons in navigator when address book is opened.
  subscribe(fullPageViewEnter$, ({ dispatch }) => {
    dispatch(toggleNavigatorCart(false));
    dispatch(toggleNavigatorSearch(false));
  });

  // Show search and cart buttons in navigator again after address book is closed.
  subscribe(fullPageViewLeave$, ({ dispatch }) => {
    dispatch(toggleNavigatorCart(true));
    dispatch(toggleNavigatorSearch(true));

    EventEmitter.removeAllListeners(NAVIGATOR_SAVE_BUTTON_CLICK);
    EventEmitter.emit(NAVIGATOR_SAVE_BUTTON_HIDE);
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
