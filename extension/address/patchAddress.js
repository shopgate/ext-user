/**
 * @param {SDKContext} context
 * @param {{originalAddress: ExtUserAddress, address: Object}} input
 * @return {Promise<{address: Object}>}
 */
module.exports = async (context, input) => {
  const address = {
    ...input.originalAddress,
    ...input.address,
    id: input.originalAddress.id,
    // Merge tags
    tags: [
      ...input.originalAddress.tags || [],
      ...input.address.tags || []
    ].filter((tag, index, tags) => (
      // Remove duplicates
      tags.indexOf(tag) === index
    ))
  }

  return {address}
}
