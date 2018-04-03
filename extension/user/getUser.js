const {EACCESS, ENOTFOUND, customError} = require('../error')
/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {function} cb
 */
module.exports = (context, input, cb) => {
  if (!context.meta.userId) {
    return cb(customError(EACCESS, 'Unauthorized access'))
  }

  context.storage.extension.get(context.meta.userId, (err, user) => {
    if (err) {
      return cb(err)
    }

    if (!user) {
      return cb(customError(ENOTFOUND, 'User not found'))
    }

    cb(null, user)
  })
}
