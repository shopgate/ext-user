const statePrefix = '@shopgate/user/UserReducers';

/**
 * Gets a pathName where view was set as loading
 * @param {Object} state The application state.
 * @return {string}
 */
export const getLoadingViewPathName = state => state.extensions[statePrefix].ui.pathName;
