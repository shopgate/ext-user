const crypto = require('crypto')
const {EINVALIDCREDENTIALS, ENOTFOUND, EINTERNAL, createCustomError} = require('../error')
/**
 * @typedef {Object} LoginInputArgs
 * @property {string} strategy
 * @property {Object} parameters
 * @property {string} parameters.login
 * @property {string} parameters.password
 */

/**
 * @param {SDKContext} context
 * @param {LoginInputArgs} input
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  // is logged in
  if (context.meta.userId) {
    return cb(null, {
      userId: context.meta.userId
    })
  }

  context.storage.extension.get(input.parameters.login, (errUserId, userId) => {
    if (errUserId) {
      context.log.warn(errUserId, 'Extension storage error')
      return cb(createCustomError(EINTERNAL, 'Internal error'))
    }

    if (!userId) {
      return cb(createCustomError(ENOTFOUND, 'User is not found'))
    }

    context.storage.extension.get(userId, (err, user) => {
      if (err) {
        context.log.warn(err, 'Extension storage error')
        return cb(createCustomError(EINTERNAL, 'Internal error'))
      }

      if (!user) {
        return cb(createCustomError(ENOTFOUND, 'User not found'))
      }

      // Check password match
      const password = crypto.createHash('md5').update(input.parameters.password).digest('hex')
      if (user.password !== password) {
        return cb(createCustomError(EINVALIDCREDENTIALS, 'Password mismatch'))
      }

      cb(null, {
        userId: user.id
      })
    })
  })
}
