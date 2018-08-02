import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_ADD_ADDRESS } from './../constants/Pipelines';
import { addUserAddress, addUserAddressSuccess, addUserAddressFailed } from './../action-creators';

/**
 * @param {Object} address address
 * @return {function(*): *}
 */
export default address => (dispatch) => {
  dispatch(addUserAddress());

  new PipelineRequest(PIPELINE_ADD_ADDRESS)
    .setTrusted()
    .setInput({ address })
    .dispatch()
    .then(({ addressId }) => {
      dispatch(addUserAddressSuccess(addressId));
    })
    .catch((error) => {
      dispatch(addUserAddressFailed(error));
    });
};
