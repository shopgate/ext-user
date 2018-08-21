import { connect } from 'react-redux';
import joi from 'joi-browser';
import addAddress from '@shopgate/user/actions/addAddress';
import updateAddress from '@shopgate/user/actions/updateAddress';
import { deleteUserAddresses } from '@shopgate/user/action-creators';
import { isBusy, getValidationErrors } from '@shopgate/user/selectors/addressBook';
import { joiToValidationErrors, validationErrorsToMap } from './../../common/transform';
import userAddressSchema from './../../common/userAddressSchema';

/**
 * Takes an address and validates it agains a default joi validation schema
 * @param {Object} address The address to be validated using the default joi schema
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
          message: 'register.errors.blank',
        };
      }
      return err;
    });
  return validationErrorsToMap(validationErrors);
};

/**
 * @param {Object} state state
 * @return {{addressType: (*|string)}}
 */
const mapStateToProps = state => ({
  disabled: isBusy(state),
  validationErrors: validationErrorsToMap(getValidationErrors(state)),
});

/**
 * @param {function} dispatch dispatch
 * @return {{addAddress: function, updateAddress: function, validateAddress: function}}
 */
const mapDispatchToProps = dispatch => ({
  addAddress: address => dispatch(addAddress(address)),
  updateAddress: address => dispatch(updateAddress(address)),
  deleteAddress: addressId => dispatch(deleteUserAddresses([addressId])),
  validateAddress,
});

export default connect(mapStateToProps, mapDispatchToProps);
