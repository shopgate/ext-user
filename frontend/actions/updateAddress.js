import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_UPDATE_ADDRESS } from './../constants/Pipelines';
import { updateUserAddressSuccess, updateUserAddressFailed } from './../action-creators';

/**
 * @param {Object} address address
 * @return {function(*): *}
 */
export default address => dispatch =>
  new PipelineRequest(PIPELINE_UPDATE_ADDRESS)
    .setTrusted()
    .setInput({ address })
    .dispatch()
    .then(() => {
      dispatch(updateUserAddressSuccess());
    })
    .catch((error) => {
      dispatch(updateUserAddressFailed(error));
    });
