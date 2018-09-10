import { connect } from 'react-redux';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import { getUserAddressIdSelector } from '../../../selectors/addressBook';
import { getAddressFields } from '../../../selectors/addressForm';
import { userAddressPathPattern } from '../../../constants/RoutePaths';

/**
 * Match current route and fetch user address for a form
 * @param {Object} state state
 * @return {UserAddress}
 */
const getAddressByRoute = (state) => {
  const { id: addressId = 0 } = userAddressPathPattern.match(getHistoryPathname(state)) || {};
  return getUserAddressIdSelector(state)(addressId);
};

/**
 * @param {Object} state state
 * @return {{addressType: (*|string)}}
 */
const mapStateToProps = state => ({
  address: getAddressByRoute(state),
  addressFields: getAddressFields(state),
});

export default connect(mapStateToProps, null, null, { withRef: true });
