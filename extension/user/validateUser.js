const Joi = require('joi')
const ValidationError = require('./../common/Error/ValidationError')
const userSchema = require('./../../common/userSchema')(Joi)

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
 * @return {Promise<Object>}
 */
module.exports = async (context, input) => {
  const user = {
    mail: input.mail.trim(),
    password: input.password.trim(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    gender: input.gender,
    birthday: input.birthday,
    phone: input.phone ? input.phone.trim() : input.phone
  }

  // Validation
  let validationResult = Joi.validate(user, userSchema)
  if (validationResult.error) {
    throw new ValidationError(validationResult.error.details[0].message)
  }
  return user
}
