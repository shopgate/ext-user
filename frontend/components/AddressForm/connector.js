import { connect } from 'react-redux';
import addAddress from '../../actions/addAddress';
import updateAddress from '../../actions/updateAddress';
import { deleteUserAddresses } from '../../action-creators/addressBook';
import { isBusy, getUserAddressesCount } from '../../selectors/addressBook';
import { getConfig } from '../../selectors/config';

/**
 * @param {Object} state state
 * @return {{isFirstAddress: boolean, isBusy: boolean, config: UserConfig}}
 */
const mapStateToProps = state => ({
  isFirstAddress: !getUserAddressesCount(state),
  isBusy: isBusy(state),
  config: getConfig(state),
});

/**
 * @param {function} dispatch dispatch
 * @return {{addAddress: function, updateAddress: function, deleteAddress: function}}
 */
const mapDispatchToProps = dispatch => ({
  addAddress: address => dispatch(addAddress(address)),
  updateAddress: address => dispatch(updateAddress(address)),
  deleteAddress: addressId => dispatch(deleteUserAddresses([addressId])),
});

export default connect(mapStateToProps, mapDispatchToProps);
