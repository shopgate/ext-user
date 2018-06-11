const uuidv4 = require('uuid/v4')
const InternalError = require('./../common/Error/InternalError')

/**
 * @param {SDKContext} context
 * @param {{address: ExtUserAddress}} input
 * @return {Promise<{id: string}>}
 */
module.exports = async (context, input) => {
  let addresses
  try {
    addresses = (await context.storage.user.get('addresses')) || []
  } catch (err) {
    context.log.warn(err, 'User storage error')
    throw new InternalError('User storage error')
  }

  const newAddress = {
    ...input.address,
    id: uuidv4()
  }

  addresses.push(newAddress)

  try {
    await context.storage.user.set('addresses', addresses)
  } catch (err) {
    context.log.warn(err, 'User storage error')
    throw new InternalError('User storage error')
  }

  return newAddress
}
