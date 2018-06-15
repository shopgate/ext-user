import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import getUser from '@shopgate/pwa-common/actions/user/getUser';
import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';

export default (address, addressType, makeBilling) => (dispatch) => {
  new PipelineRequest('shopgate.user.addAddress')
    .setTrusted()
    .setInput({ address })
    .dispatch()
    .then(({ id }) => {
      dispatch(getUser());

      dispatch({
        type: 'CHECKOUT_DATA',
        id: `${addressType}Address`,
        data: {
          id,
          ...address,
        },
      });
      if (makeBilling) {
        dispatch({
          type: 'CHECKOUT_DATA',
          id: 'billingAddress',
          data: {
            id,
            ...address,
          },
        });
      }
      dispatch(goBackHistory(2));
    })
    .catch((error) => {
      dispatch({
        type: 'ADD_ADDRESS_FAIL',
        error,
      });
    });
};
