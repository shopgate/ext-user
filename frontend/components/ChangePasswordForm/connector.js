import { connect } from 'react-redux';
import updatePassword from '@shopgate/user/actions/updatePassword';
import { changePasswordSchema } from '@shopgate/user/common/userSchema';
import { joiToValidationErrors, validationErrorsToMap } from '@shopgate/user/common/transform';

/**
 * @param {Object} passwords passwords
 * @return {Object}
 */
const validatePassword = (passwords) => {
  const result = changePasswordSchema.validate(passwords, { abortEarly: false });
  if (!result.error) {
    return {};
  }
  const validationErrors = joiToValidationErrors(result.error, 'password.errors')
    // Make error message empty when input is empty
    .map(err => ({
      ...err,
      message: passwords[err.path] ? err.message : 'user.errors.blank',
    }));
  return validationErrorsToMap(validationErrors);
};

/**
 * @param {function} dispatch dispatch
 * @return {{updatePassword: function, validatePassword: function}}
 */
const mapDispatchToProps = dispatch => ({
  updatePassword: passwords => dispatch(updatePassword(passwords)),
  validatePassword,
});

export default connect(null, mapDispatchToProps);
