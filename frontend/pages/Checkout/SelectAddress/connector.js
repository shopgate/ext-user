import { connect } from 'react-redux';
import { getUserData } from '@shopgate/pwa-common/selectors/user';
import { getQueryParam } from '@shopgate/pwa-common/selectors/history';
import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';
import updateAddress from '../../../actions/updateAddress';

/**
 * @param {Object} state state
 * @return {{addresses: Object[]}}
 */
const mapStateToProps = state => ({
  addresses: getUserData(state).addresses,
  addressType: getQueryParam(state, 'type') || 'shipping',
  selectedId: getQueryParam(state, 'selected') || '',
});

/**
 * @param {function} dispatch redux
 * @return {{selectAddress: (function(*): *)}}
 */
const mapDispatchToProps = dispatch => ({
  selectAddress: (address, id, returnToCheckout) => {
    dispatch({
      type: 'CHECKOUT_DATA',
      id: `${id}Address`,
      data: {
        ...address,
      },
    });

    if (returnToCheckout) {
      dispatch(goBackHistory());
    }
  },
  updateAddress: (address) => {
    dispatch(updateAddress(address));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true });
