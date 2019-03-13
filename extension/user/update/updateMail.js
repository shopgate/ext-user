const InternalError = require('./../../common/Error/InternalError')
const ValidationError = require('./../../common/Error/ValidationError')

/**
 * @param {SDKContext} context
 * @param {{mail: string, oldMail: string}} input
 * @return {Promise<{messages: Object[]}>}
 */
module.exports = async (context, { mail, oldMail }) => {
  let existingUserId
  try {
    existingUserId = await context.storage.extension.get(mail)
  } catch (err) {
    context.log.warn(err, 'Extension storage error')
    throw new InternalError()
  }

  // Idempotent submit
  if (existingUserId === context.meta.userId) {
    return null
  }

  if (existingUserId) {
    context.log.info(`User already exists with given email [${mail}]`)
    throw new ValidationError([{
      path: 'mail',
      message: 'Email has already been taken'
    }])
  }

  try {
    // Set new reference mail > userId
    await context.storage.extension.set(mail, context.meta.userId)

    // Remove old reference mail > userId
    await context.storage.extension.del(oldMail)
  } catch (err) {
    context.log.warn(err, 'Extension storage error')
    throw new InternalError()
  }
}
