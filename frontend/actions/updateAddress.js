import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_UPDATE_ADDRESS } from './../constants/Pipelines';
import { updateUserAddress, updateUserAddressSuccess, updateUserAddressFailed } from './../action-creators';

/**
 * @param {Object} address address
 * @param {bool} silent Updates without notifying the user (route changes, loading, ..)
 * @return {function(*): *}
 */
export default (address, silent) => (dispatch) => {
  dispatch(updateUserAddress(silent));

  new PipelineRequest(PIPELINE_UPDATE_ADDRESS)
    .setTrusted()
    .setInput({ address })
    .dispatch()
    .then(() => {
      dispatch(updateUserAddressSuccess(address, silent));
    })
    .catch((error) => {
      dispatch(updateUserAddressFailed(error, silent));
    });
};
