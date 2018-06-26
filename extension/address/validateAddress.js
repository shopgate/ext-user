const Joi = require('joi')
const userAddressSchema = require('./../common/userAddressSchema')(Joi)
const ValidationError = require('./../common/Error/ValidationError')

/**
 * @param {SDKContext} context
 * @param {{address: ExtUserAddress}} input
 * @return {Promise<{address: Object}>}
 */
module.exports = async (context, input) => {
  /** @type {ExtUserAddress} */
  const address = {
    firstName: input.address.firstName.trim(),
    lastName: input.address.lastName.trim(),
    street: input.address.street.trim(),
    city: input.address.city.trim(),
    provinceCode: input.address.provinceCode && input.address.provinceCode.trim(),
    countryCode: input.address.countryCode.trim(),
    zipCode: input.address.zipCode.trim(),
    tags: input.address.tags || []
  }

  let validationResult = Joi.validate(address, userAddressSchema)
  if (validationResult.error) {
    throw new ValidationError(validationResult.error.details[0].message)
  }

  return {
    address: {
      ...input.address,
      ...address
    }
  }
}
