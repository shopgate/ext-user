import { routeDidEnter, routeDidLeave } from '@shopgate/pwa-common/streams/history';
import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import EventEmitter from '../events/emitter';
import * as events from '../constants/EventTypes';
import { toggleNavigatorCart, toggleNavigatorSearch, setUserViewIsLoading } from '../action-creators/ui';
import {
  USER_PROFILE_PATH,
  USER_REGISTER_PATH,
  USER_ADDRESS_BOOK_PATH,
  userAddressPathPattern,
  USER_PASSWORD_PATH,
  USER_ADDRESS_PATH_START,
} from '../constants/RoutePaths';
import {
  userWillRegister$,
  userWillUpdate$,
  userUpdateSuccess$,
  userUpdateFailed$,
  userUpdateMailFailed$,
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
import { getLoadingViewPathName } from '../selectors/ui';

const isIos = themeName.includes('ios');

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

  const userAddressPageViewEnter$ = routeDidEnter(USER_ADDRESS_PATH_START);
  const userAddressPageViewLeave$ = routeDidLeave(USER_ADDRESS_PATH_START);
  const userProfilePageViewEnter$ = routeDidEnter(USER_PROFILE_PATH);
  const userProfilePageViewLeave$ = routeDidLeave(USER_PROFILE_PATH);
  const userPasswordPageViewEnter$ = routeDidEnter(USER_PASSWORD_PATH);
  const userPasswordPageViewLeave$ = routeDidLeave(USER_PASSWORD_PATH);

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
    userUpdateMailFailed$,
    userRegisterFailed$,
    userAddressChanged$,
    userAddressFailed$
  );

  subscribe(userAddressPageViewEnter$, ({ pathname }) => {
    // Only show when editing an address
    if (!pathname.endsWith('/0')) {
      EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_SHOW);
    }
  });

  subscribe(userAddressPageViewLeave$, ({ pathname }) => {
    // Only hide when an address was edited
    if (!pathname.endsWith('/0')) {
      EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_HIDE);
    }
  });

  subscribe(userProfilePageViewEnter$, () => {
    EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_SHOW);
  });

  subscribe(userProfilePageViewLeave$, () => {
    EventEmitter.emit(events.NAVIGATOR_SAVE_BUTTON_HIDE);
  });

  subscribe(userPasswordPageViewEnter$, () => {
    // When the change password page is shown, it has it's own save button (depending on theme)
    if (isIos) {
      EventEmitter.emit(events.NAVIGATOR_CHANGE_PASSWORD_BUTTON_SHOW);
    }
  });

  subscribe(userPasswordPageViewLeave$, () => {
    if (isIos) {
      EventEmitter.emit(events.NAVIGATOR_CHANGE_PASSWORD_BUTTON_HIDE);
    }
  });

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
  subscribe(viewIsLoading$, ({ dispatch, getState }) => {
    const historyPathname = getHistoryPathname(getState());
    dispatch(setUserViewIsLoading(historyPathname));
    dispatch(setViewLoading(historyPathname));
  });

  // View is idle
  subscribe(viewIsIdle$, ({ dispatch, getState }) => {
    dispatch(unsetViewLoading(getLoadingViewPathName(getState())));
  });
};
