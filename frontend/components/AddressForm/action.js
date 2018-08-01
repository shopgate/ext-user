import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';

export default address => (dispatch) => {
  new PipelineRequest('shopgate.user.addAddress')
    .setTrusted()
    .setInput({ address })
    .dispatch()
    .then(({ id }) => {
      dispatch({
        type: 'ADD_ADDRESS_SUCCESS',
        address: {
          id,
          ...address,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: 'ADD_ADDRESS_FAIL',
        error,
      });
    });
};
