const InternalError = require('./../common/Error/InternalError')
const UserError = require('./../common/Error/UserError')

/**
 * @param {SDKContext} context
 * @param {{addressId: string}} input
 * @return {Promise<{address: ExtUserAddress}>}
 */
module.exports = async (context, input) => {
  let addresses
  try {
    addresses = (await context.storage.user.get('addresses')) || []
  } catch (err) {
    context.log.warn(err, 'User storage error')
    throw new InternalError('User storage error')
  }
  const address = addresses.find(/** @type ExtUserAddress */address => address.id === input.addressId)

  if (!address) {
    throw new UserError('Address not found')
  }

  return {address}
}
