import { connect } from 'react-redux';
import { getUserAddresses, getUserDefaultAddresses } from '../../../../../selectors/addressBook';
import { getConfig } from '../../../../../selectors/config';
import { setDefaultAddress } from '../../../../../action-creators/addressBook';

/**
 * @param {Object} state state
 * @return {{addresses: Array}}
 */
const mapStateToProps = state => ({
  addresses: getUserAddresses(state) || [],
  defaults: getUserDefaultAddresses(state) || {},
  defaultTags: getConfig(state).addressDefaultGroups,
});

/**
 * Connects the dispatch function to a callable function in the props.
 * @param {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  setDefault: (addressId, tag) => dispatch(setDefaultAddress(addressId, tag)),
});

export default connect(mapStateToProps, mapDispatchToProps);
