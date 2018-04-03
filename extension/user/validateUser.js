const Joi = require('joi')
const {EINVAL, customError} = require('./../error')
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
 * @param {SDKContext} context
 * @param {RegisterInputArgs} input
 * @param {function} cb
 */
module.exports = (context, input, cb) => {
  const user = {
    mail: input.mail.trim(),
    password: input.password.trim(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    gender: input.gender.trim(),
    birthday: input.birthday.trim(),
    phone: input.phone.trim()
  }

  // Validation schema
  const schema = {
    mail: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    gender: Joi.string().valid(['female', 'male']),
    birthday: Joi.date(),
    phone: Joi.string()
  }

  // Validation
  Joi.validate(user, schema, {abortEarly: false}, (errValidate) => {
    if (errValidate) {
      return cb(customError(EINVAL, errValidate.message))
    }
    cb(null, user)
  })
}
