import { connect } from 'react-redux';
import joi from 'joi-browser';
import register from './action';
import userSchema from './../common/userSchema';
import { joiToValidationErrors, validationErrorsToMap } from './../common/transform';

/**
 * @param {Object} user user
 * @return {Object}
 */
const validateUser = (user) => {
  const result = userSchema(joi).validate(user, { abortEarly: false });
  if (!result.error) {
    return {};
  }
  const validationErrors = joiToValidationErrors(result.error, 'register.errors')
    // Make error message empty when input is empty
    .map((err) => {
      if (user[err.path] === '') {
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
 * @param {function} dispatch dispatch
 * @return {{register: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => ({
  register: user => dispatch(register(user)),
  validateUser,
});

export default connect(null, mapDispatchToProps, null, { withRef: true });
