const Joi = require('joi')
const ValidationError = require('./../../common/Error/ValidationError')
const userSchema = require('./../../common/userSchema')(Joi, true)
const joiErrorToValidationErrors = require('./../../common/joiErrorToValidationErrors')

/**
 * @param {SDKContext} context
 * @param {Object} user
 * @return {Promise<Object>}
 */
module.exports = async (context, user) => {
  let validationResult = userSchema.validate(user)
  if (validationResult.error) {
    throw new ValidationError(joiErrorToValidationErrors(validationResult.error))
  }
  return validationResult.value
}
