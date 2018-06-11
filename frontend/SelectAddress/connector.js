import { connect } from 'react-redux';
import { getUserData } from '@shopgate/pwa-common/selectors/user';
import { getQueryParam } from '@shopgate/pwa-common/selectors/history';
import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';

/**
 * @param {Object} state state
 * @return {{addresses: Object[]}}
 */
const mapStateToProps = state => ({
  addresses: getUserData(state).addresses,
  addressType: getQueryParam(state, 'type') || '',
  selectedId: getQueryParam(state, 'selected') || '',
});

/**
 * @param {function} dispatch redux
 * @return {{selectAddress: (function(*): *)}}
 */
const mapDispatchToProps = dispatch => ({
  selectAddress: (address, id) => {
    dispatch({
      type: 'CHECKOUT_DATA',
      id: `${id}Address`,
      data: {
        ...address,
      },
    });

    dispatch(goBackHistory());
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true });
