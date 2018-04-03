const uuidv4 = require('uuid/v4')
const crypto = require('crypto')
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
  // is logged in
  if (context.meta.userId) {
    return cb(null, {
      userId: context.meta.userId
    })
  }

  const password = crypto.createHash('md5').update(input.password).digest('hex')
  const user = {
    id: uuidv4(),
    mail: input.mail,
    password: password,
    firstName: input.firstName,
    lastName: input.lastName,
    gender: input.gender || null, // optional
    birthday: input.birthday || null,
    phone: input.phone || null
  }

  context.storage.extension.set(user.id, user, (err) => {
    if (err) {
      return cb(err)
    }
    // Store meta key, pointing to our user via email for login process
    context.storage.extension.set(input.mail, user.id, (err) => {
      if (err) {
        return cb(err)
      }

      cb(null, {
        userId: user.id
      })
    })
  })
}
