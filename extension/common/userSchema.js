const Joi = require('joi')

const defaultAlphaExpr = /^[^[0-9!<>,;?=+()@#"°{}_$%:]*$/

const mailSchema = Joi.string().trim().email({minDomainAtoms: 2}).required()

/**
 * User register schema
 *
 * @param {Joi} Joi DI fro BE|FE
 * @param {boolean} isUpdate is update user
 * @return {{validate: function}}
 */
module.exports = {
  mailSchema,

  /**
   * User register schema
   * @return {{validate: function}}
   */
  userRegisterSchema: Joi.object().keys({
    mail: mailSchema,
    password: Joi.string().trim().min(8).required(),
    firstName: Joi.string().trim().regex(defaultAlphaExpr).required().min(1).max(100),
    lastName: Joi.string().trim().regex(defaultAlphaExpr).required().min(1).max(100),
    customAttributes: Joi.object().default({})
  }).unknown(true),

  /**
   * User register schema
   * @return {{validate: function}}
   */
  userUpdateSchema: Joi.object().keys({
    firstName: Joi.string().trim().regex(defaultAlphaExpr).required().min(1).max(100),
    lastName: Joi.string().trim().regex(defaultAlphaExpr).required().min(1).max(100),
    customAttributes: Joi.object().default({})
  }).unknown(true)
}
