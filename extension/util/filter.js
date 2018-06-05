/**
 * @typedef {Object} FilterResult
 */

/**
 * Takes one object and a list of properties to return only the whitelisted properties
 *
 * @param {SDKContext} context
 * @param {Object} input
 * @param {string[]} input.properties
 * @param {Object} input.hydratedObject
 *
 * @returns {Promise<FilterResult>}
 */
module.exports = async (context, input) => {
  if (!input.hydratedObject) {
    return
  }

  const result = {}
  input.properties.forEach(propName => { result[propName] = input.hydratedObject[propName] })
  return {filteredObject: result}
}
