const InternalError = require('./../../common/Error/InternalError')

/**
 * Validation and sanitation is done at previous step
 * @param {SDKContext} context
 * @param {ExtUser} updateUser
 * @return {Promise<>}
 */
module.exports = async (context, updateUser) => {
  let user
  try {
    user = await context.storage.extension.get(context.meta.userId)
  } catch (err) {
    context.log.warn(err, 'Extension storage error')
    throw new InternalError()
  }

  const patchUser = {
    ...user,
    ...updateUser
  }

  // Save user under id
  try {
    await context.storage.extension.set(context.meta.userId, patchUser)
  } catch (err) {
    context.log.warn(err, 'Extension storage error')
    throw new InternalError()
  }
}
