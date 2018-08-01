const defaultAlphaExpr = /^[^[0-9!<>,;?=+()@#"°{}_$%:]*$/;
const defaultSpecCharExpr = /^[^!<>;?=#"$%]*$/;
const streetExpr = /^\d+(\s|\w{1,3}\s)|(\s\d+($|.{1,6}))/;
const phoneExpr = /^[0-9+()\s]+$/;

/**
 * @param {joi} joi joi
 * @return {{validate: function}}
 */
module.exports = joi => (
  joi.object().keys({
    prefix: joi.string().trim().regex(defaultAlphaExpr).optional()
      .allow([''])
      .max(20),
    firstName: joi.string().trim().regex(defaultAlphaExpr).required()
      .min(1)
      .max(100),
    middleName: joi.string().trim().regex(defaultAlphaExpr).optional()
      .allow([''])
      .max(100),
    lastName: joi.string().trim().regex(defaultAlphaExpr).required()
      .min(1)
      .max(100),
    suffix: joi.string().trim().regex(defaultAlphaExpr).optional()
      .allow([''])
      .max(100),
    phone: joi.string().trim().regex(phoneExpr).optional()
      .allow([''])
      .max(20),
    company: joi.string().trim().regex(defaultAlphaExpr).optional()
      .allow([''])
      .max(100),
    street1: joi.string().trim().regex(defaultSpecCharExpr).regex(streetExpr)
      .required()
      .min(1)
      .max(255),
    street2: joi.string().trim().regex(defaultSpecCharExpr).regex(streetExpr)
      .optional()
      .allow([''])
      .max(255),
    city: joi.string().trim().required().regex(defaultSpecCharExpr)
      .min(1)
      .max(100),
    province: joi.string().trim().optional().allow([null, ''])
      .regex(/^[\w-]+$/)
      .max(10),
    country: joi.string().trim().regex(/^[A-Z]+$/).required()
      .min(2)
      .max(2),
    zipCode: joi.string().trim().regex(/^[\w ]+$/).required()
      .min(1)
      .max(10),
    tags: joi.array().items(joi.string().trim()).optional().allow([''])
      .default([]),
    customAttributes: joi.object().default({}),
  })
);
