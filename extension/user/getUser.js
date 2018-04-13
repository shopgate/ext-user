const {EACCESS, ENOTFOUND, EINTERNAL, createCustomError} = require('../error')
/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {function} cb
 */
module.exports = (context, input, cb) => {
  if (!context.meta.userId) {
    return cb(createCustomError(EACCESS, 'Unauthorized access'))
  }

  context.storage.extension.get(context.meta.userId, (err, user) => {
    if (err) {
      context.log.warn(err, 'Extension storage error')
      return cb(createCustomError(EINTERNAL, 'Internal error'))
    }

    if (!user) {
      return cb(createCustomError(ENOTFOUND, 'User not found'))
    }

    cb(null, user)
  })
}
