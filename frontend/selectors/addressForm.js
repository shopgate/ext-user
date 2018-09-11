const statePrefix = '@shopgate/user/UserReducers';

/**
 * Returns the address form state.
 * @param {Object} state The application state.
 * @returns {Object}
 */
const getState = state => state.extensions[statePrefix].addressForm;

/**
 * Returns whether the form is still being fetched.
 * @param {Object} state The application state.
 * @returns {boolean}
 */
export const isFetching = state => getState(state).isFetching;

/**
 * Returns the configured address fields.
 * @param {Object} state The application state.
 * @returns {Object}
 */
export const getConfig = state => getState(state).config;

/**
 * Returns whether the request had any errors.
 * @param {Object} state The application state.
 * @returns {boolean}
 */
export const hasErrors = state => getState(state).error !== null;

/**
 * Returns the errors from the response.
 * @param {Object} state The application state.
 * @returns {Object}
 */
export const getErrors = state => getState(state).error;
