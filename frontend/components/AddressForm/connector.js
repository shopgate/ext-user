import { connect } from 'react-redux';
import joi from 'joi-browser';
import addAddress from '@shopgate/user/actions/addAddress';
import updateAddress from '@shopgate/user/actions/updateAddress';
import { isBusy, getValidationErrors } from '@shopgate/user/selectors/addressBook';
import { joiToValidationErrors, validationErrorsToMap } from './../../common/transform';
import userAddressSchema from './../../common/userAddressSchema';

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
  validateAddress,
});

export default connect(mapStateToProps, mapDispatchToProps);
