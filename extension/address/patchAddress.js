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
    // Merge tags, make unique set
    tags: [
      ...input.originalAddress.tags || [],
      ...input.address.tags || []
    ].filter((tag, i, self) => self.indexOf(tag) === i)
  }

  return {address}
}
