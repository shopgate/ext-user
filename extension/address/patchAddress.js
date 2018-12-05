/**
 * @param {SDKContext} context
 * @param {{oldAddress: ExtUserAddress, newAddress: Object}} input
 * @return {Promise<{address: Object}>}
 */
module.exports = async (context, {oldAddress, ...newAddress}) => {
  const address = {
    ...oldAddress,
    ...newAddress
  }

  // Remove duplicates
  address.tags = address.tags.filter((tag, index, tags) => (
    tags.indexOf(tag) === index
  ))

  return address
}
