import { connect } from 'react-redux';
import addAddress from '../../actions/addAddress';
import updateAddress from '../../actions/updateAddress';
import { deleteUserAddresses } from '../../action-creators/addressBook';
import { isBusy } from '../../selectors/addressBook';

/**
 * @param {Object} state state
 * @return {{addressType: (*|string)}}
 */
const mapStateToProps = state => ({
  isBusy: isBusy(state),
});

/**
 * @param {function} dispatch dispatch
 * @return {{addAddress: function, updateAddress: function}}
 */
const mapDispatchToProps = dispatch => ({
  addAddress: address => dispatch(addAddress(address)),
  updateAddress: address => dispatch(updateAddress(address)),
  deleteAddress: addressId => dispatch(deleteUserAddresses([addressId])),
});

export default connect(mapStateToProps, mapDispatchToProps);
