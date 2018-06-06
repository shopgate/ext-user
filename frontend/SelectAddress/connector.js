import { connect } from 'react-redux';
import { getUserData } from '@shopgate/pwa-common/selectors/user';
import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';

/**
 * @param {Object} state state
 * @return {{addresses: Object[]}}
 */
const mapStateToProps = state => ({
  addresses: getUserData(state).addresses,
});

/**
 * @param {function} dispatch redux
 * @return {{selectAddress: (function(*): *)}}
 */
const mapDispatchToProps = dispatch => ({
  selectAddress: (address) => {
    dispatch({
      type: 'CHECKOUT_DATA',
      id: 'shippingAddress',
      data: {
        ...address,
      },
    });

    dispatch(goBackHistory());
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true });
