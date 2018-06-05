const InternalError = require('./../common/Error/InternalError')

/**
 * @param {SDKContext} context
 * @return {Promise<{addresses: ExtUserAddress[]}>}
 */
module.exports = async (context) => {
  let addresses
  try {
    addresses = (await context.storage.user.get('addresses')) || []
  } catch (err) {
    context.log.warn(err, 'User storage error')
    throw new InternalError('User storage error')
  }

  return {addresses}
}
