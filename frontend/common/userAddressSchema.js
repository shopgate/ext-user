/**
 * @param {joi} joi joi
 * @return {{validate: function}}
 */
module.exports = joi => (
  joi.object().keys({
    firstName: joi.string().regex(/^[^[0-9!<>,;?=+()@#"°{}_$%:]*$/).required()
      .min(1)
      .max(100),
    lastName: joi.string().regex(/^[^[0-9!<>,;?=+()@#"°{}_$%:]*$/).required()
      .min(1)
      .max(100),
    street: joi.string().regex(/^[^!<>;?=#"$%]*$/).required()
      .min(1)
      .max(255),
    city: joi.string().required().regex(/^[^!<>;?=#"$%]*$/)
      .min(1)
      .max(100),
    provinceCode: joi.string().optional().allow(null).regex(/^[\w-]+$/)
      .max(10),
    countryCode: joi.string().regex(/^[A-Z]+$/).required()
      .min(2)
      .max(2),
    zipCode: joi.string().regex(/^[\w ]+$/).required()
      .min(1)
      .max(10),
    tags: joi.array().items(joi.string()).optional().default([]),
  })
);
