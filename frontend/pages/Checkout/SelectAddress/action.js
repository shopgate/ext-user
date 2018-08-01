import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import getUser from '@shopgate/pwa-common/actions/user/getUser';

export default address => (dispatch) => {
  new PipelineRequest('shopgate.user.updateAddress')
    .setTrusted()
    .setInput({
      addressId: address.id,
      address,
    })
    .dispatch()
    .then(() => {
      dispatch(getUser());
    })
    .catch(() => {
      // Ignore
    });
};
