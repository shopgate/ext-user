import joi from 'joi-browser';
import connect from '@shopgate/pwa-common/components/Router/helpers/connect';
import addAddress from './action';
import { joiToValidationErrors, validationErrorsToMap } from './../../common/transform';
import userAddressSchema from './../../common/userAddressSchema';

/**
 * @param {function} dispatch dispatch
 * @return {{addAddress: (function(*=): *), validateAddress: validateAddress}}
 */
const mapDispatchToProps = dispatch => ({
  addAddress: address => dispatch(addAddress(address)),
  validateAddress: (address) => {
    const result = userAddressSchema(joi).validate(address, { abortEarly: false });
    if (!result.error) {
      return {};
    }
    const validationErrors = joiToValidationErrors(result.error, 'address.add.errors')
      // Make error message empty when input is empty
      .map((err) => {
        if (address[err.path] === '') {
          return {
            ...err,
            message: '',
          };
        }
        return err;
      });
    return validationErrorsToMap(validationErrors);
  },
});

export default connect(null, mapDispatchToProps);
