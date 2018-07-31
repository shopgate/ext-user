import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { logger } from '@shopgate/pwa-core/helpers';
import { PIPELINE_ADD_ADDRESS } from './../constants/Pipelines';
import { updateUser, updateUserSuccess } from './../action-creators';
/**
 * @param {Object} address address
 * @return {function(*): *}
 */
export default address => (dispatch) => {
  dispatch(updateUser());

  return new PipelineRequest(PIPELINE_ADD_ADDRESS)
    .setTrusted()
    .setInput({ address })
    .dispatch()
    .then(() => {
      dispatch(updateUserSuccess());
    })
    .catch((error) => {
      logger.error(error);
    });
};
