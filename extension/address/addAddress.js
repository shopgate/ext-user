const uuidv4 = require('uuid/v4')
const InternalError = require('./../common/Error/InternalError')

/**
 * @param {SDKContext} context
 * @param {ExtUserAddress} address
 * @return {Promise<{id: string}>}
 */
module.exports = async (context, address) => {
  let addresses
  try {
    addresses = (await context.storage.user.get('addresses')) || []
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to load the user\'s addresses.')
    throw new InternalError()
  }

  const newAddress = {
    id: uuidv4(),
    ...address
  }

  // Find default tags for address
  const addressDefaultTags = newAddress.tags.filter(tag => tag.startsWith('default'))

  // Normalize tags for addresses
  if (addressDefaultTags.length > 0) {
    addresses = addresses.map(address => {
      // Keep address of the iteration as is, when no tags are to be changed
      if (!address.tags || !address.tags.length) {
        return address
      }
      // Remove all tags, prefixed as default from all others addresses
      return {
        ...address,
        tags: address.tags.filter(tag => !addressDefaultTags.includes(tag))
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
}
