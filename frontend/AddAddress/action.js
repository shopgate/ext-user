import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import getUser from '@shopgate/pwa-common/actions/user/getUser';
import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';

export default address => (dispatch) => {
  new PipelineRequest('shopgate.user.addAddress')
    .setTrusted()
    .setInput(address)
    .dispatch()
    .then(() => {
      dispatch(getUser());
      dispatch(goBackHistory());
    })
    .catch((error) => {
      dispatch({
        type: 'ADD_ADDRESS_FAIL',
        error,
      });
    });
};
