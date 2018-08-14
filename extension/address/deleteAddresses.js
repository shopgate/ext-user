const InternalError = require('./../common/Error/InternalError')
const InvalidCallError = require('./../common/Error/InvalidCallError')
const NotFoundError = require('./../common/Error/NotFoundError')

/**
 * @param {SDKContext} context
 * @param {{ids: string[]}} input
 * @return {Promise<>}
 */
module.exports = async (context, input) => {
  if (!input.ids) {
    context.log.error('Mandatory property "ids" is not set!')
    throw new InvalidCallError(
      'Invalid pipeline call: The mandatory property "ids" was not provided!'
    )
  }

  // Read all addresses from user storage
  let addresses
  try {
    addresses = (await context.storage.user.get('addresses')) || []
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to load the user\'s addresses.')
    throw new InternalError()
  }

  // Check for existence
  const { ids } = input
  ids.forEach(id => {
    const address = addresses.find(addr => addr.id === id)
    if (!address) {
      context.log.error(`The address id "${id}" was not found.`)
      throw new NotFoundError()
    }
  })

  // Remove given addresses from list
  addresses = addresses.filter(addr => !ids.includes(addr.id))

  // Save back to user storage
  try {
    await context.storage.user.set('addresses', addresses)
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to save the user\'s addresses.')
    throw new InternalError()
  }
}
