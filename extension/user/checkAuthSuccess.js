const {EINTERNAL, createCustomError} = require('../error')
/**
 * @typedef {Object} CheckAuthSuccessArgs
 * @property {boolean} authSuccess
 */

/**
 * @param {SDKContext} context
 * @param {CheckAuthSuccessArgs} input
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  if (input.authSuccess !== true) {
    return cb(createCustomError(EINTERNAL, 'Auth failed'))
  }
  return cb(null, {})
}
