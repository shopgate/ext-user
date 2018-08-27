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
