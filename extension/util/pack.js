/**
 * @typedef {Object} PackResult
 * @property {Object} data
 */

/**
 * Takes multiple objects and packs them all as properties into one single output object.
 *
 * @param {SDKContext} context
 * @param {Object} input
 * @returns {Promise<PackResult>}
 */
module.exports = async (context, input) => {
  return {
    data: input
  }
}
