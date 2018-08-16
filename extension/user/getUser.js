const InternalError = require('./../common/Error/InternalError')
const NotFoundError = require('./../common/Error/NotFoundError')

/**
 * @param {SDKContext} context
 * @return {Promise<Object>}
 */
module.exports = async (context) => {
  let user
  try {
    user = await context.storage.extension.get(context.meta.userId)
  } catch (err) {
    context.log.warn(err, 'Extension storage error')
    throw new InternalError()
  }

  if (!user) {
    throw new NotFoundError('User not found')
  }

  return user
}
