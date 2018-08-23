import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_UPDATE_USER } from './../constants/Pipelines';
import { updateUser, updateUserSuccess, updateUserFailed } from './../action-creators/user';

export default user => (dispatch) => {
  dispatch(updateUser());

  new PipelineRequest(PIPELINE_UPDATE_USER)
    .setTrusted()
    .setInput(user)
    .dispatch()
    .then(() => dispatch(updateUserSuccess()))
    .catch(error => dispatch(updateUserFailed(error)));
};
