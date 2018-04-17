const Joi = require('joi')
const {EINVAL, createCustomError} = require('./../error')
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
    gender: input.gender,
    birthday: input.birthday,
    phone: input.phone ? input.phone.trim() : input.phone
  }

  // Validation schema
  const schema = {
    mail: Joi.string().email({minDomainAtoms: 2}).required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().valid(['female', 'male']),
    birthday: Joi.date(),
    phone: Joi.string()
  }

  // Validation
  Joi.validate(user, schema, /* {abortEarly: false}, */ (errValidate) => {
    if (errValidate) {
      return cb(createCustomError(EINVAL, errValidate.details[0].message))
    }
    cb(null, user)
  })
}
