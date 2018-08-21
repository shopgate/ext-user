import { connect } from 'react-redux';
import joi from 'joi-browser';
import { getUserData } from '@shopgate/pwa-common/selectors/user';
import registerUser from '@shopgate/user/actions/registerUser';
import updateUser from '@shopgate/user/actions/updateUser';
import updateMail from '@shopgate/user/actions/updateMail';
import userSchema from '@shopgate/user/common/userSchema';
import { joiToValidationErrors, validationErrorsToMap } from '@shopgate/user/common/transform';

/**
 * @param {Object} user user
 * @param {boolean} isUpdate is for update
 * @return {Object}
 */
const validateUser = (user, isUpdate = true) => {
  const result = userSchema(joi, isUpdate).validate(user, { abortEarly: false });
  if (!result.error) {
    return {};
  }
  const validationErrors = joiToValidationErrors(result.error, 'user.errors')
    // Make error message empty when input is empty
    .map((err) => {
      if (!user[err.path]) {
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
 * @return {{user: User}}
 */
const mapStateToProps = state => ({
  user: getUserData(state),
});

/**
 * @param {function} dispatch dispatch
 * @return {{registerUser: function, updateUser: function, validateUser: function}}
 */
const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(registerUser(user)),
  updateUser: user => dispatch(updateUser(user)),
  updateMail: mail => dispatch(updateMail(mail)),
  validateUser,
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true });
