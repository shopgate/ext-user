import { connect } from 'react-redux';
import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';
import updatePassword from '../../actions/updatePassword';
import { changePasswordSchema } from '../../common/userSchema';
import { joiToValidationErrors, validationErrorsToMap } from '../../common/transform';

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
  cancel: () => dispatch(goBackHistory(1)),
  updatePassword: passwords => dispatch(updatePassword(passwords)),
  validatePassword,
});

export default connect(null, mapDispatchToProps);
