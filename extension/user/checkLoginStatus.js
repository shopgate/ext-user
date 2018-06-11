const UnauthorizedError = require('../common/Error/UnauthorizedError')

/**
 * @param {SDKContext} context
 */
module.exports = async (context) => {
  if (!context.meta.userId) {
    throw new UnauthorizedError('User is not logged in')
  }
}
