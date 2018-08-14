const assert = require('assert')
const InternalError = require('./../common/Error/InternalError')

/**
 * @param {SDKContext} context
 * @param {ExtUserAddress} address
 * @return {Promise<{id: ?string}>}
 */
module.exports = async (context, address) => {
  let addresses
  try {
    addresses = (await context.storage.user.get('addresses')) || []
  } catch (err) {
    context.log.warn(err, 'User storage error: Failed to load the user\'s addresses.')
    throw new InternalError()
  }

  const existingAddress = addresses.find(/** @type ExtUserAddress */addr => {
    return matchAddress(address, addr)
  })

  return existingAddress || {
    id: null
  }
}

const addressKeysToMatch = [
  'firstName',
  'lastName',
  'street1',
  'city',
  'country'
]

/**
 * Prepare address before match
 * @param {Object} address address
 * @return {Object}
 */
function prepareAddress (address) {
  return addressKeysToMatch.reduce((addr, key) => {
    addr[key] = address[key]
    return addr
  }, {})
}

/**
 * @param addressA
 * @param addressB
 * @throws Error
 */
function matchAddress (addressA, addressB) {
  try {
    assert.deepEqual(prepareAddress(addressA), prepareAddress(addressB))
    return true
  } catch (assertionErrIgnore) {}
}
