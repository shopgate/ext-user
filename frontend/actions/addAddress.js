import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_ADD_ADDRESS } from './../constants/Pipelines';
import { addUserAddress, addUserAddressSuccess, addUserAddressFailed } from './../action-creators/addressBook';

/**
 * @param {Object} address address
 * @returns {function(*): *}
 */
export default address => (dispatch) => {
  dispatch(addUserAddress());

  new PipelineRequest(PIPELINE_ADD_ADDRESS)
    .setTrusted()
    .setInput(address)
    .dispatch()
    .then(() => {
      dispatch(addUserAddressSuccess());
    })
    .catch((error) => {
      dispatch(addUserAddressFailed(error));
    });
};
