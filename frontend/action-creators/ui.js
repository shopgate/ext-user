import { USER_VIEW_IS_LOADING } from './../constants/ActionTypes';

/**
 * Toggles the cart icon in the gmd theme.
 * @param {boolean} active Whether hidden or visible.
 * @returns {Object}
 */
export const toggleNavigatorCart = active => ({
  type: 'TOGGLE_NAVIGATOR_CART_ICON',
  active,
});

/**
 * Toggles the search icon in the gmd theme.
 * @param {boolean} value Whether hidden or visible.
 * @returns {Object}
 */
export const toggleNavigatorSearch = value => ({
  type: value ? 'SET_SEARCH_ENABLED' : 'SET_SEARCH_DISABLED',
});

/**
 * @param {string} pathName loading view
 * @returns {Object}
 */
export const setUserViewIsLoading = pathName => ({
  type: USER_VIEW_IS_LOADING,
  pathName,
});
