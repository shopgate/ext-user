import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_UPDATE_USER } from './../constants/Pipelines';
import { updateUser, updateUserSuccess, updateUserFailed } from './../action-creators';

export default ({ mail: ignore, password: ignore2, ...restUser }) => (dispatch) => {
  dispatch(updateUser());

  new PipelineRequest(PIPELINE_UPDATE_USER)
    .setTrusted()
    .setInput(restUser)
    .dispatch()
    .then(() => dispatch(updateUserSuccess()))
    .catch(error => dispatch(updateUserFailed(error)));
};
