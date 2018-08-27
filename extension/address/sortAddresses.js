const InternalError = require('./../common/Error/InternalError')

/**
 * Checks if tags contain a default config.
 * @param {array} tags List of tags.
 * @returns {bool}
 */
const hasDefault = (tags) => {
  return tags.filter(tag => tag.startsWith('default')).length > 0
}

/**
 * Step to sort addresses.
 * @param {SDKContext} context
 * @param {ExtUserAddress} address
 * @return {Promise<>}
 */
module.exports = async (context, address) => {
  // Read addresses.
  let addresses
  try {
    addresses = (await context.storage.user.get('addresses')) || []
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to load the user\'s addresses.')
    throw new InternalError()
  }

  // Default addresses are always shown on top of the address book
  const sortedAddresses = addresses.sort(({ tags: tagsA }, {tags: tagsB}) => {
    if (hasDefault(tagsA) && hasDefault(tagsB)) {
      return 0
    }
    return hasDefault(tagsA) ? -1 : (hasDefault(tagsB) ? 1 : 0)
  })

  // Write back to storage.
  try {
    await context.storage.user.set('addresses', sortedAddresses)
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to save the user\'s addresses.')
    throw new InternalError()
  }
}
