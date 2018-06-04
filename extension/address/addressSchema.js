const Joi = require('joi')

module.exports = Joi.object().keys({
  firstName: Joi.string().required().min(1).max(255),
  lastName: Joi.string().required().min(1).max(255),
  street: Joi.string().required().min(1).max(255),
  city: Joi.string().required().min(1).max(255),
  provinceCode: Joi.string().required().min(1).max(10),
  countryCode: Joi.string().required().min(1).max(3),
  zipCode: Joi.string().required().min(1).max(10)
})
