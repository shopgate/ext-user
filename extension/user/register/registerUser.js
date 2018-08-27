const uuidv4 = require('uuid/v4')
const UnauthorizedError = require('../../common/Error/UnauthorizedError')
const InternalError = require('./../../common/Error/InternalError')
const UserExistError = require('./../../common/Error/UserExistError')
const Password = require('./../Password')

/**
 * Validation and sanitation is done at previous step
 * @param {SDKContext} context
 * @param {ExtUser} input
 * @return {Promise<{userId: string}>}
 */
module.exports = async (context, input) => {
  // forbid for logged in user
  if (context.meta.userId) {
    throw new UnauthorizedError('User is logged in')
  }

  let existingUserId
  try {
    existingUserId = await context.storage.extension.get(input.mail)
  } catch (err) {
    context.log.warn(err, 'Extension storage error')
    throw new InternalError()
  }

  if (existingUserId) {
    context.log.info(`User already exists with given email [${input.mail}]`)
    throw new UserExistError()
  }

  const password = new Password(input.password)
  const userId = uuidv4()
  const user = {
    id: userId,
    mail: input.mail,
    password: password.password,
    firstName: input.firstName,
    lastName: input.lastName
  }

  // Save user under id
  try {
    await context.storage.extension.set(user.id, user)
  } catch (err) {
    context.log.warn(err, 'Extension storage error')
    throw new InternalError()
  }

  // Save reference email > user id
  try {
    await context.storage.extension.set(input.mail, user.id)
  } catch (err) {
    context.log.warn(err, 'Extension storage error')
    throw new InternalError()
  }

  return {
    userId
  }
}
