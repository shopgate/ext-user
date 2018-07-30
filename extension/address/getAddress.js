const InternalError = require('./../common/Error/InternalError')
const NotFoundError = require('./../common/Error/NotFoundError')

/**
 * @param {SDKContext} context
 * @param {{updateAddress: {id: string}}} input address id
 * @return {Promise<{address: ExtUserAddress}>}
 */
module.exports = async (context, { updateAddress: { id: addressId } }) => {
  let addresses
  try {
    addresses = (await context.storage.user.get('addresses')) || []
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to load the user\'s addresses.')
    throw new InternalError()
  }
  const address = addresses.find(/** @type ExtUserAddress */address => address.id === addressId)

  if (!address) {
    throw new NotFoundError('Address not found')
  }

  return {address}
}
