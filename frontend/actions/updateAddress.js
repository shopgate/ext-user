import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_UPDATE_ADDRESS } from './../constants/Pipelines';
import { updateUserAddress, updateUserAddressSuccess, updateUserAddressFailed } from './../action-creators';

/**
 * @param {Object} address address
 * @return {function(*): *}
 */
export default address => (dispatch) => {
  dispatch(updateUserAddress());

  new PipelineRequest(PIPELINE_UPDATE_ADDRESS)
    .setTrusted()
    .setInput({ address })
    .dispatch()
    .then(() => {
      dispatch(updateUserAddressSuccess(address));
    })
    .catch((error) => {
      dispatch(updateUserAddressFailed(error));
    });
};
