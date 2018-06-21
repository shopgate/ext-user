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
    context.log.warn(err, 'User storage error')
    throw new InternalError('User storage error')
  }

  const addressTags = input.address.tags

  // Replace address
  addresses = addresses.map(address => {
    if (address.id === input.address.id) {
      return input.address
    }

    if ((!addressTags || !addressTags.length) || (!address.tags || !address.tags.length)) {
      return address
    }

    // Remove concurrent tags from other address
    return {
      ...address,
      tags: address.tags.filter(tag => !addressTags.includes(tag))
    }
  })

  try {
    await context.storage.user.set('addresses', addresses)
  } catch (err) {
    context.log.warn(err, 'User storage error')
    throw new InternalError('User storage error')
  }
}
