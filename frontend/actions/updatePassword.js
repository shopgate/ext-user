import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { EINVALIDCREDENTIALS } from '@shopgate/pwa-core/constants/Pipeline';
import { PIPELINE_UPDATE_PASSWORD } from './../constants/Pipelines';
import { updateUser, updateUserSuccess, updateUserFailed } from './../action-creators/user';

/**
 * @param {Object} passwords old and new passwords
 * @return {function(*): *}
 */
export default passwords => (dispatch) => {
  dispatch(updateUser());

  new PipelineRequest(PIPELINE_UPDATE_PASSWORD)
    .setTrusted()
    .setInput(passwords)
    .setErrorBlacklist([EINVALIDCREDENTIALS])
    .dispatch()
    .then(() => {
      dispatch(updateUserSuccess());
    })
    .catch((error) => {
      dispatch(updateUserFailed(error));
    });
};
