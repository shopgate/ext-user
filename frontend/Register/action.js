import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';

export default user => (dispatch) => {
  new PipelineRequest('shopgate.user.registerUser')
    .setTrusted()
    .setInput(user)
    .dispatch()
    .then(({ userId }) => {
      dispatch({
        type: 'REGISTER_SUCCESS',
        userId,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'REGISTER_FAIL',
        error,
      });
    });
};
