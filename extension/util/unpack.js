/**
 * @typedef {Object} UnpackResult
 */

/**
 * Takes one object and a list of properties to unpack to return it as a new object with only the
 * properties in the property list of the input
 *
 * @param {SDKContext} context
 * @param {Object} input
 * @param {string[]} input.properties
 * @param {Object} input.packedInput
 *
 * @returns {Promise<UnpackResult>}
 */
module.exports = async (context, input) => {
  const result = {}
  input.properties.forEach(propName => { result[propName] = input.packedInput[propName] })
  return result
}
