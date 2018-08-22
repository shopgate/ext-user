import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_GET_ADDRESSES } from './../constants/Pipelines';
import { getUserAddressesSuccess, getUserAddressesFailed } from './../action-creators/addressBook';

/**
 * @returns {function(*): *}
 */
export default () => dispatch =>
  new PipelineRequest(PIPELINE_GET_ADDRESSES)
    .setTrusted()
    .dispatch()
    .then(({ addresses }) => {
      dispatch(getUserAddressesSuccess(addresses));
    })
    .catch((error) => {
      dispatch(getUserAddressesFailed(error));
    });
