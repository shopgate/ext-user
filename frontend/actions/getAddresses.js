import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_GET_ADDRESSES } from './../constants/Pipelines';
import { getUserAddresses, getUserAddressesSuccess, getUserAddressesFailed } from './../action-creators/addressBook';

/**
 * @param {boolean} silent silent fetch of addresses
 * @returns {function(*): *}
 */
export default (silent = true) => (dispatch) => {
  if (!silent) {
    dispatch(getUserAddresses());
  }

  return new PipelineRequest(PIPELINE_GET_ADDRESSES)
    .setTrusted()
    .dispatch()
    .then(({ addresses }) => dispatch(getUserAddressesSuccess(addresses)))
    .catch(error => dispatch(getUserAddressesFailed(error)));
};
