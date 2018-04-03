const crypto = require('crypto')
const {EINVALIDCREDENTIALS, ENOTFOUND, customError} = require('../error')
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
      return cb(errUserId)
    }

    if (!userId) {
      cb(customError(ENOTFOUND, 'User is not found'))
    }

    context.storage.extension.get(userId, (err, user) => {
      if (err) {
        return cb(err)
      }

      // Check password match
      const password = crypto.createHash('md5').update(input.parameters.password).digest('hex')
      if (user.password !== password) {
        cb(customError(EINVALIDCREDENTIALS, 'Password mismatch'))
      }

      cb(null, {
        userId: user.id
      })
    })
  })
}
