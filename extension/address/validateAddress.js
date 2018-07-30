const Joi = require('joi')
const userAddressSchema = require('./../common/userAddressSchema')(Joi)
const ValidationError = require('./../common/Error/ValidationError')

/**
 * @param {SDKContext} context
 * @param {{address: ExtUserAddress}} input
 * @return {Promise<{address: Object}>}
 */
module.exports = async (context, { address }) => {
  let validationResult = userAddressSchema.validate(address)
  if (validationResult.error) {
    throw new ValidationError(validationResult.error.details[0].message)
  }

  return {
    address: validationResult.value
  }
}
