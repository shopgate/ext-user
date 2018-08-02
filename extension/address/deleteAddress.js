const InternalError = require('./../common/Error/InternalError')
const NotFoundError = require('./../common/Error/NotFoundError')

/**
 * @param {SDKContext} context
 * @param {{id: number}} input
 * @return {Promise<>}
 */
module.exports = async (context, { id }) => {
  // Read all addresses from user storage
  let addresses
  try {
    addresses = (await context.storage.user.get('addresses')) || []
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to load the user\'s addresses.')
    throw new InternalError()
  }

  // Check for existence
  const address = addresses.find(addr => addr.id === id)
  if (!address) {
    context.log.warn('The given address id was not found.')
    throw new NotFoundError()
  }

  // Remove address from list
  addresses = addresses.filter(addr => addr.id !== address.id)

  // Save back to user storage
  try {
    await context.storage.user.set('addresses', addresses)
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to save the user\'s addresses.')
    throw new InternalError()
  }
}
