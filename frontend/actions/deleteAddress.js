import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { logger } from '@shopgate/pwa-core/helpers';
import { PIPELINE_DELETE_ADDRESS } from './../constants/Pipelines';
import { updateUser, updateUserSuccess } from './../action-creators';

/**
 * @param {string} addressId addressId
 * @return {function(*): *}
 */
export default addressId => (dispatch) => {
  dispatch(updateUser());

  return new PipelineRequest(PIPELINE_DELETE_ADDRESS)
    .setTrusted()
    .setInput({ addressId })
    .dispatch()
    .then(() => {
      dispatch(updateUserSuccess());
    })
    .catch((error) => {
      logger.error(error);
    });
};
