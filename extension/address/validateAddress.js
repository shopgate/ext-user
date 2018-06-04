const Joi = require('joi')
const addressSchema = require('./addressSchema')
const ValidationError = require('./../common/Error/ValidationError')

/**
 * @param {SDKContext} context
 * @param {ExtUserAddress} input
 * @return {Promise<ExtUserAddress>}
 */
module.exports = async (context, input) => {
  const address = {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    street: input.street.trim(),
    city: input.city.trim(),
    provinceCode: input.provinceCode.trim(),
    countryCode: input.countryCode.trim(),
    zipCode: input.zipCode.trim()
  }

  let validationResult = Joi.validate(address, addressSchema)
  if (validationResult.error) {
    throw new ValidationError(validationResult.error.details[0].message)
  }
  return address
}
