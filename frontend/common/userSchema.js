/**
 * User register schema
 *
 * @param {Joi} joi DI fro BE|FE
 * @param {boolean} isUpdate schema for update user
 * @return {{validate: function}}
 */
module.exports = (joi, isUpdate = false) => (
  joi.object().keys({
    mail: joi.string().email({ minDomainAtoms: 2 }).required(),
    password: isUpdate ? joi.string().optional().allow([null, '']) : joi.string().min(8).required(),
    firstName: joi.string().regex(/^[^[0-9!<>,;?=+()@#"°{}_$%:]*$/).required().min(1)
      .max(100),
    lastName: joi.string().regex(/^[^[0-9!<>,;?=+()@#"°{}_$%:]*$/).required().min(1)
      .max(100),
  }).unknown(true)
);
