/**
 * @param {SDKContext} context
 * @return {Promise<Object>}
 */
module.exports = async (context) => {
  const { addressFields } = context.config
  return { addressFields }
}
