const defaultAlphaExpr = /^[^[0-9!<>,;?=+()@#"°{}_$%:]*$/

/**
 * User register schema
 *
 * @param {joi} joi DI fro BE|FE
 * @param {boolean} isUpdate is update user
 * @return {{validate: function}}
 */
module.exports = (joi, isUpdate = false) => (
  joi.object().keys({
    mail: isUpdate ? joi.string().optional().allow([null, '']) : joi.string().trim().email({minDomainAtoms: 2}).required(),
    password: isUpdate ? joi.string().optional().allow([null, '']) : joi.string().trim().min(8).required(),
    firstName: joi.string().trim().regex(defaultAlphaExpr).required().min(1).max(100),
    lastName: joi.string().trim().regex(defaultAlphaExpr).required().min(1).max(100),
    customAttributes: joi.object().default({})
  }).unknown(true)
)
