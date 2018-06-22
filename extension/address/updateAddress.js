const InternalError = require('./../common/Error/InternalError')

/**
 * @param {SDKContext} context
 * @param {{address: ExtUserAddress}} input
 * @return {Promise<>}
 */
module.exports = async (context, input) => {
  let addresses
  try {
    addresses = (await context.storage.user.get('addresses')) || []
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to load the user\'s addresses.')
    throw new InternalError()
  }

  const currentAddressTags = input.address.tags

  // Replace address
  addresses = addresses.map(address => {
    if (address.id === input.address.id) {
      // Replace address with the given one
      return input.address
    }

    // Keep address of the iteration as is, when no tags are to be changed
    if ((!currentAddressTags || !currentAddressTags.length) || (!address.tags || !address.tags.length)) {
      return address
    }

    // Remove tags from all addresses that have been set for the current address
    return {
      ...address,
      tags: address.tags.filter(tag => !currentAddressTags.includes(tag))
    }
  })

  try {
    await context.storage.user.set('addresses', addresses)
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to save the user\'s addresses.')
    throw new InternalError()
  }
}
