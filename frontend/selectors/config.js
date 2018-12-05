const statePrefix = '@shopgate/user/UserReducers';

/**
 * Gets user extension config
 * @param {Object} state The application state.
 * @return {UserConfig}
 */
export const getConfig = state => state.extensions[statePrefix].config;

/**
 * Gets the user menu entries from the extension config
 * @param {Object} state The application state.
 * @return {UserMenuEntries}
 */
export const getUserMenuEntries = state => getConfig(state) && getConfig(state).userMenuEntries;
