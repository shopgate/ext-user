import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { getUserData } from '@shopgate/pwa-common/selectors/user';
import { PIPELINE_UPDATE_USER, PIPELINE_UPDATE_MAIL } from './../constants/Pipelines';
import { updateUser, updateUserSuccess, updateUserFailed } from './../action-creators/user';

/**
 * Update mail pipeline action
 * @param {string} mail mail
 * @return {Promise}
 */
const updateMailAction = mail => new PipelineRequest(PIPELINE_UPDATE_MAIL)
  .setTrusted()
  .setInput({ mail })
  .dispatch();

/**
 * Update user pipeline action
 * @param {User} user user
 * @return {Promise}
 */
const updateUserAction = user => new PipelineRequest(PIPELINE_UPDATE_USER)
  .setTrusted()
  .setInput(user)
  .dispatch();

export default ({ mail, password: ignore, ...restUser }) => async (dispatch, getState) => {
  dispatch(updateUser(restUser));

  let messages;

  // Update user data
  try {
    await updateUserAction(restUser);
  } catch (error) {
    dispatch(updateUserFailed(error, restUser));
    return;
  }

  // Update mail if changed
  if (mail) {
    const { mail: oldMail } = getUserData(getState());
    if (oldMail !== mail) {
      try {
        ({ messages } = await updateMailAction(mail));
      } catch (error) {
        dispatch(updateUserFailed(error, restUser));
        return;
      }
    }
  }

  // Success after all
  dispatch(updateUserSuccess(messages, {
    ...restUser,
    // Add "mail" property only if it was set
    ...mail && { mail },
  }));
};

