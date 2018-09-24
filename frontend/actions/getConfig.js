import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { ERROR_HANDLE_SUPPRESS } from '@shopgate/pwa-core/constants/ErrorHandleTypes';
import { PIPELINE_GET_CONFIG } from './../constants/Pipelines';
import { userConfigReceived, userConfigFailed } from './../action-creators/config';

/**
 * @returns {function(*): *}
 */
export default () => (dispatch) => {
  new PipelineRequest(PIPELINE_GET_CONFIG)
    .setTrusted()
    .setHandleErrors(ERROR_HANDLE_SUPPRESS)
    .dispatch()
    .then(config => dispatch(userConfigReceived(config)))
    .catch(error => dispatch(userConfigFailed(error)));
};
