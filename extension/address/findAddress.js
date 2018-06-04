const assert = require('assert')
const InternalError = require('./../common/Error/InternalError')

/**
 * @param {SDKContext} context
 * @param {ExtUserAddress} input
 * @return {Promise<{id: ?string}>}
 */
module.exports = async (context, input) => {
  let addresses
  try {
    addresses = await context.storage.user.get('addresses')
  } catch (err) {
    context.log.warn(err, 'User storage error')
    throw new InternalError('User storage error')
  }

  const existingAddress = addresses.find(/** @type ExtUserAddress */address => {
    try {
      assert.deepEqual(input, address)
      return address
    } catch (assertionErrIgnore) {}
  })

  if (existingAddress) {
    return existingAddress
  }

  return {
    id: null
  }
}
