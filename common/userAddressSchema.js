/**
 * @param {joi} joi
 * @return {{validate: function}}
 */
module.exports = joi => (
  joi.object().keys({
    firstName: joi.string().regex(/^[a-zA-Z ]+$/).required().min(1).max(100),
    lastName: joi.string().regex(/^[a-zA-Z ]+$/).required().min(1).max(100),
    street: joi.string().regex(/^[\w #-]+$/).required().min(1).max(255),
    city: joi.string().required().regex(/^[\w ]+$/).min(1).max(100),
    provinceCode: joi.string().required().regex(/^[\w-]+$/).max(10),
    countryCode: joi.string().regex(/^[A-Z]+$/).required().min(1).max(3),
    zipCode: joi.string().regex(/^[\w ]+$/).required().min(1).max(10)
  })
)
