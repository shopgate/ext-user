import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_DELETE_ADDRESSES, ENOREMOVEDEFAULT } from './../constants/Pipelines';
import { deleteUserAddressesSuccess, deleteUserAddressesFailed } from './../action-creators/addressBook';

/**
 * @param {Object[]} addressIds list of address ids
 * @returns {function(*): *}
 */
export default addressIds => (dispatch) => {
  new PipelineRequest(PIPELINE_DELETE_ADDRESSES)
    .setTrusted()
    .setInput({ ids: addressIds })
    .setErrorBlacklist([ENOREMOVEDEFAULT])
    .dispatch()
    .then(() => {
      dispatch(deleteUserAddressesSuccess());
    })
    .catch((error) => {
      dispatch(deleteUserAddressesFailed(error));
    });
};
