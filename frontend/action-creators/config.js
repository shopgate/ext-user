import { USER_CONFIG_RECEIVED, USER_CONFIG_FAILED } from '../constants/ActionTypes';

/**
 * Creates the dispatched USER_CONFIG_RECEIVED action object.
 * @param {Object} config user ext config
 * @return {{type: string, config: Object}}
 */
export const userConfigReceived = config => ({
  type: USER_CONFIG_RECEIVED,
  config,
});

/**
 * Creates the dispatched USER_CONFIG_FAILED action object.
 * @param {Object} error error
 * @return {{type: string, error: Object}}
 */
export const userConfigFailed = error => ({
  type: USER_CONFIG_FAILED,
  error,
});
