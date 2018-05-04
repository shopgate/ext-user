const {EINVALIDCREDENTIALS, EINTERNAL, createCustomError} = require('../error')
const Password = require('./Password')

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
    context.log.warn('User is already logged in')
    return cb(null, {
      userId: context.meta.userId
    })
  }

  const invalidCredentials = createCustomError(EINVALIDCREDENTIALS, 'User not found or wrong credentials')

  context.storage.extension.get(input.parameters.login, (errUserId, userId) => {
    if (errUserId) {
      context.log.warn(errUserId, 'Extension storage error')
      return cb(createCustomError(EINTERNAL, 'Internal error'))
    }

    if (!userId) {
      return cb(invalidCredentials)
    }

    context.storage.extension.get(userId, (err, user) => {
      if (err) {
        context.log.warn(err, 'Extension storage error')
        return cb(createCustomError(EINTERNAL, 'Internal error'))
      }

      if (!user) {
        return cb(invalidCredentials)
      }

      // Check password match
      const password = new Password(input.parameters.password)
      if (user.password !== password.password) {
        return cb(invalidCredentials)
      }

      cb(null, {
        userId: user.id
      })
    })
  })
}
