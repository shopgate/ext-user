import { connect } from 'react-redux';
import { getUserData } from '@shopgate/pwa-common/selectors/user';
import buildValidationErrorList from '@shopgate/pwa-ui-shared/Form/Builder/builders/buildValidationErrorList';
import registerUser from '../../actions/registerUser';
import updateUser from '../../actions/updateUser';
import userSchema from '../../common/userSchema';
import { joiToValidationErrors } from '../../common/transform';
import { getValidationErrors } from '../../selectors/user';

/**
 * @param {Object} user user
 * @param {boolean} isUpdate is for update
 * @return {Object}
 */
const validateUser = (user, isUpdate = true) => {
  const result = userSchema(isUpdate).validate(user, { abortEarly: false });
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
  return buildValidationErrorList(validationErrors);
};

/**
 * @param {Object} state state
 * @return {{user: User, validationErrors: Object}}
 */
const mapStateToProps = state => ({
  user: getUserData(state),
  validationErrors: getValidationErrors(state) || [],
});

/**
 * @param {function} dispatch dispatch
 * @return {{registerUser: function, updateUser: function, validateUser: function}}
 */
const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(registerUser(user)),
  updateUser: user => dispatch(updateUser(user)),
  validateUser,
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true });
