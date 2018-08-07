const InternalError = require('./../common/Error/InternalError')
const NotFoundError = require('./../common/Error/NotFoundError')

/**
 * @param {SDKContext} context
 * @param {{ids: number[]}} input
 * @return {Promise<>}
 */
module.exports = async (context, { ids }) => {
  // Read all addresses from user storage
  let addresses
  try {
    addresses = (await context.storage.user.get('addresses')) || []
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to load the user\'s addresses.')
    throw new InternalError()
  }

  // Check for existence
  ids.forEach(id => {
    const address = addresses.find(addr => addr.id === id)
    if (!address) {
      context.log.warn(`The address id "${id}" was not found.`)
      throw new NotFoundError()
    }
  })

  // Remove given addresses from list
  addresses = addresses.filter(addr => !(ids && ids.find(id => id === addr.id)))

  // Save back to user storage
  try {
    await context.storage.user.set('addresses', addresses)
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to save the user\'s addresses.')
    throw new InternalError()
  }
}
