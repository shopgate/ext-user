const defaultAlphaExpr = /^[^[0-9!<>,;?=+()@#"°{}_$%:]*$/

/**
 * User register schema
 *
 * @param {joi} joi DI fro BE|FE
 * @return {{validate: function}}
 */
module.exports = joi => (
  joi.object().keys({
    mail: joi.string().trim().email({minDomainAtoms: 2}).required(),
    password: joi.string().trim().min(8).required(),
    title: joi.string().trim().regex(defaultAlphaExpr).optional().allow(['']),
    prefix: joi.string().trim().regex(defaultAlphaExpr).optional().allow(['']),
    firstName: joi.string().trim().regex(defaultAlphaExpr).required().min(1).max(100),
    middleName: joi.string().trim().regex(defaultAlphaExpr).optional().allow(['']),
    lastName: joi.string().trim().regex(defaultAlphaExpr).required().min(1).max(100),
    suffix: joi.string().trim().regex(defaultAlphaExpr).optional().allow(['']),
    gender: joi.string().trim().optional().valid(['female', 'male']),
    birthday: joi.date().optional(),
    phone: joi.string().trim().optional(),
    customAttributes: joi.object().default({})
  }).unknown(true)
)
