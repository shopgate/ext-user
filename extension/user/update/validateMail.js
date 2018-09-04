const ValidationError = require('./../../common/Error/ValidationError')
const { mailSchema } = require('./../../common/userSchema')

/**
 * @param {SDKContext} context
 * @param {{mail: string}} input
 * @return {Promise<Object>}
 */
module.exports = async (context, {mail}) => {
  let validationResult = mailSchema.validate(mail)
  if (validationResult.error) {
    throw new ValidationError([{
      path: 'mail',
      message: validationResult.error.message
    }])
  }
  return {
    mail: validationResult.value
  }
}
