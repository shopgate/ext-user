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
    firstName: joi.string().trim().regex(defaultAlphaExpr).required().min(1).max(100),
    lastName: joi.string().trim().regex(defaultAlphaExpr).required().min(1).max(100),
    customAttributes: joi.object().default({})
  }).unknown(true)
)
