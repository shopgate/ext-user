const InternalError = require('./../common/Error/InternalError')

/**
 * @param {SDKContext} context
 * @param {ExtUserAddress} address
 * @return {Promise<>}
 */
module.exports = async (context, address) => {
  let addresses
  try {
    addresses = (await context.storage.user.get('addresses')) || []
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to load the user\'s addresses.')
    throw new InternalError()
  }

  // Find default tags for address
  const addressDefaultTags = address.tags.filter(tag => tag.startsWith('default'))

  // Replace address
  addresses = addresses.map(addr => {
    if (addr.id === address.id) {
      // Replace address with the given one
      return address
    }

    // Keep address of the iteration as is, when no tags are to be changed
    if (!addressDefaultTags.length || (!addr.tags || !addr.tags.length)) {
      return addr
    }

    // Remove all tags, prefixed as default from all others addresses
    return {
      ...addr,
      tags: addr.tags.filter(tag => !addressDefaultTags.includes(tag))
    }
  })

  try {
    await context.storage.user.set('addresses', addresses)
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to save the user\'s addresses.')
    throw new InternalError()
  }
}
