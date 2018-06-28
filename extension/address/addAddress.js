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
    context.log.warn(err, 'User storage error: Failed to load the user\'s addresses.')
    throw new InternalError()
  }

  const newAddress = {
    ...input.address,
    id: uuidv4()
  }

  const currentAddressTags = newAddress.tags

  // Normalize tags for addresses
  if (Array.isArray(currentAddressTags) && currentAddressTags.length > 0) {
    addresses = addresses.map(address => {
      // Keep address of the iteration as is, when no tags are to be changed
      if (!address.tags || !address.tags.length) {
        return address
      }
      // Remove tags from all addresses that have been set for the current address
      return {
        ...address,
        tags: address.tags.filter(tag => !currentAddressTags.includes(tag))
      }
    })
  }

  addresses.push(newAddress)

  try {
    await context.storage.user.set('addresses', addresses)
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to save the user\'s addresses.')
    throw new InternalError()
  }

  return newAddress
}
