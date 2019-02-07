import { connect } from 'react-redux';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { getUserAddressIdSelector } from '../../../selectors/addressBook';

/**
 * Match current route and fetch user address for a form
 * @param {Object} state state
 * @return {UserAddress}
 */
const getAddressByRoute = (state) => {
  const { params: { id = '' } = {} } = getCurrentRoute();
  return getUserAddressIdSelector(state)(decodeURIComponent(id));
};

/**
 * @param {Object} state state
 * @return {{addressType: (*|string)}}
 */
const mapStateToProps = state => ({
  address: getAddressByRoute(state),
});

export default connect(mapStateToProps);
