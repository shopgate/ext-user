const ValidationError = require('./../../common/Error/ValidationError')
const { userUpdateSchema } = require('./../../common/userSchema')
const joiErrorToValidationErrors = require('./../../common/joiErrorToValidationErrors')

/**
 * @param {SDKContext} context
 * @param {Object} user
 * @return {Promise<Object>}
 */
module.exports = async (context, user) => {
  let validationResult = userUpdateSchema.validate(user, { abortEarly: false })
  if (validationResult.error) {
    throw new ValidationError(joiErrorToValidationErrors(validationResult.error))
  }
  return validationResult.value
}
