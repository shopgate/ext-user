const statePrefix = '@shopgate/user/UserReducers';

/**
 * Validation errors
 * @param {Object} state The application state.
 * @return {Object[]}
 */
export const getValidationErrors = state => (
  state.extensions[statePrefix].user.validationErrors
);
