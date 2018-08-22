import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_REGISTER_USER } from './../constants/Pipelines';
import { registerUser, registerUserSuccess, registerUserFailed } from './../action-creators/user';

export default user => (dispatch) => {
  dispatch(registerUser());

  new PipelineRequest(PIPELINE_REGISTER_USER)
    .setTrusted()
    .setInput(user)
    .dispatch()
    .then(({ userId }) => dispatch(registerUserSuccess(userId)))
    .catch(error => dispatch(registerUserFailed(error)));
};
