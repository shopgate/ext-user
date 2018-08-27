const InternalError = require('./../../common/Error/InternalError')
const InvalidCredentialsError = require('./../../common/Error/InvalidCredentialsError')
const ValidationError = require('./../../common/Error/ValidationError')
const Password = require('./../Password')
const { passwordSchema } = require('./../../common/userSchema')

/**
 * @param {SDKContext} context
 * @param {{oldPassword: string, password: string}} input
 * @return {Promise<{messages: Object[]}>}
 */
module.exports = async (context, { oldPassword, password }) => {
  let user
  try {
    user = await context.storage.extension.get(context.meta.userId)
  } catch (err) {
    context.log.warn(err, 'Extension storage error')
    throw new InternalError()
  }

  // Check password match
  const userOldPassword = new Password(oldPassword)
  if (user.password !== userOldPassword.password) {
    throw new InvalidCredentialsError()
  }

  // Validate new password
  let validationResult = passwordSchema.validate(password)
  if (validationResult.error) {
    throw new ValidationError([{
      path: 'password',
      message: validationResult.error.message
    }])
  }

  // Update user
  const patchUser = {
    ...user,
    password: (new Password(password)).password
  }

  // Save user under id
  try {
    await context.storage.extension.set(context.meta.userId, patchUser)
  } catch (err) {
    context.log.warn(err, 'Extension storage error')
    throw new InternalError()
  }
}
