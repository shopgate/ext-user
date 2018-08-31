import { connect } from 'react-redux';
import joi from 'joi-browser';
import addAddress from '../../actions/addAddress';
import updateAddress from '../../actions/updateAddress';
import { deleteUserAddresses } from '../../action-creators/addressBook';
import { isBusy, getValidationErrors } from '../../selectors/addressBook';
import { getConfig } from '../../selectors/config';
import { joiToValidationErrors, validationErrorsToMap } from '../../common/transform';
import userAddressSchema from '../../common/userAddressSchema';

/**
 * @param {Object} address address
 * @return {Object}
 */
const validateAddress = (address) => {
  const result = userAddressSchema(joi).validate(address, { abortEarly: false });
  if (!result.error) {
    return {};
  }
  const validationErrors = joiToValidationErrors(result.error, 'address.errors')
  // Make error message empty when input is empty
    .map((err) => {
      if (address[err.path] === '') {
        return {
          ...err,
          message: 'user.errors.blank',
        };
      }
      return err;
    });
  return validationErrorsToMap(validationErrors);
};

/**
 * @param {Object} state state
 * @return {{disabled: boolean, validationErrors: Object, config: UserConfig}}
 */
const mapStateToProps = state => ({
  disabled: isBusy(state),
  validationErrors: validationErrorsToMap(getValidationErrors(state)),
  config: getConfig(state),
});

/**
 * @param {function} dispatch dispatch
 * @return {{addAddress: function, updateAddress: function, deleteAddress: function, validateAddress: function}}
 */
const mapDispatchToProps = dispatch => ({
  addAddress: address => dispatch(addAddress(address)),
  updateAddress: address => dispatch(updateAddress(address)),
  deleteAddress: addressId => dispatch(deleteUserAddresses([addressId])),
  validateAddress,
});

export default connect(mapStateToProps, mapDispatchToProps);
