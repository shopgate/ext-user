/**
 * @param {SDKContext} context
 * @param {{originalAddress: ExtUserAddress, updateAddress: Object}} input
 * @return {Promise<{address: Object}>}
 */
module.exports = async (context, {originalAddress, address: updateAddress}) => {
  const address = {
    ...originalAddress,
    ...updateAddress
  }

  // Remove duplicates
  address.tags = address.tags.filter((tag, index, tags) => (
    tags.indexOf(tag) === index
  ))

  return {address}
}
