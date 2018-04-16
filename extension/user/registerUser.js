const uuidv4 = require('uuid/v4')
const {EACCESS, EINTERNAL, EEXISTS, createCustomError} = require('./../error')
const Password = require('./Password')
/**
 * @typedef {Object} RegisterInputArgs
 * @property {string} mail
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 * @property {?string} gender
 * @property {?string} birthday
 * @property {?string} phone
 */

/**
 * Validation and sanitation is done at previous step
 * @param {SDKContext} context
 * @param {RegisterInputArgs} input
 * @param {function} cb
 */
module.exports = (context, input, cb) => {
  // forbid for logged in user
  if (context.meta.userId) {
    return cb(createCustomError(EACCESS, 'User is logged in'))
  }

  context.storage.extension.get(input.mail, (errUserId, userId) => {
    if (errUserId) {
      context.log.warn(errUserId, 'Extension storage error')
      return cb(createCustomError(EINTERNAL, 'Internal error'))
    }

    // Already exists
    if (userId) {
      return cb(createCustomError(EEXISTS, 'User already exists'))
    }

    const password = new Password(input.password)
    const user = {
      id: uuidv4(),
      mail: input.mail,
      password: password.password,
      firstName: input.firstName,
      lastName: input.lastName,
      gender: input.gender || null, // optional
      birthday: input.birthday || null,
      phone: input.phone || null
    }

    context.storage.extension.set(user.id, user, (err) => {
      if (err) {
        context.log.warn(err, 'Extension storage error')
        return cb(createCustomError(EINTERNAL, 'Internal error'))
      }
      // Store meta key, pointing to our user via email for login process
      context.storage.extension.set(input.mail, user.id, (err) => {
        if (err) {
          context.log.warn(err, 'Extension storage error')
          return cb(createCustomError(EINTERNAL, 'Internal error'))
        }

        cb(null, {
          userId: user.id
        })
      })
    })
  })
}
