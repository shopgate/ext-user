/**
 * @typedef {Object} MergeResult
 * @property {Object} data
 */

/**
 * Takes two objects and merges their properties together into one object.
 * The second object overwrites properties of the first, if properties ae duplicated.
 *
 * @param {SDKContext} context
 * @param {Object} input
 * @param {?Object} input.first
 * @param {?Object} input.second
 * @returns {Promise<MergeResult>}
 */
module.exports = async (context, input) => {
  if (!input.first && !input.second) {
    return {data: {}}
  } else if (!input.first) {
    return { data: input.second }
  } else if (!input.second) {
    return { data: input.first }
  }

  return {
    data: {
      ...input.first,
      ...input.second
    }
  }
}
