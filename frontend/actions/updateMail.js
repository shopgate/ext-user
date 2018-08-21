import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PIPELINE_UPDATE_MAIL } from './../constants/Pipelines';
import { updateUserMailSuccess, updateUserMailFailed } from './../action-creators';

export default mail => dispatch =>
  new PipelineRequest(PIPELINE_UPDATE_MAIL)
    .setTrusted()
    .setInput({ mail })
    .dispatch()
    .then(({ messages = [] }) => dispatch(updateUserMailSuccess(messages)))
    .catch(error => dispatch(updateUserMailFailed(error)));
