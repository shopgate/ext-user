const statePrefix = '@shopgate/user/UserReducers';

/**
 * Gets user extension config
 * @param {Object} state The application state.
 * @return {UserConfig}
 */
export const getConfig = state => state.extensions[statePrefix].config;
