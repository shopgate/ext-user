import { connect } from 'react-redux';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import { getUserAddressIdSelector } from '@shopgate/user/selectors/addressBook';
import { userAddressPathPattern } from '@shopgate/user/constants/RoutePaths';
import { deleteAddresses } from '@shopgate/user/action-creators';

/**
 * Match current route and fetch user address for a form
 * @param {Object} state state
 * @return {UserAddress}
 */
const getAddressByRoute = (state) => {
  const { id: addressId = 0 } = userAddressPathPattern.match(getHistoryPathname(state));
  return getUserAddressIdSelector(state)(addressId);
};

/**
 * @param {Object} state state
 * @return {{addressType: (*|string)}}
 */
const mapStateToProps = state => ({
  address: getAddressByRoute(state),
});

/**
 * Connects the dispatch function to a callable function in the props.
 * @param {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  deleteAddresses: addressIds => dispatch(deleteAddresses(addressIds)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true });
