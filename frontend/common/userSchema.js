/**
 * User register schema
 *
 * @param {joi} joi DI fro BE|FE
 * @return {{validate: function}}
 */
module.exports = joi => (
  joi.object().keys({
    mail: joi.string().email({ minDomainAtoms: 2 }).required(),
    password: joi.string().min(8).required(),
    firstName: joi.string().regex(/^[^[0-9!<>,;?=+()@#"°{}_$%:]*$/).required().min(1)
      .max(100),
    lastName: joi.string().regex(/^[^[0-9!<>,;?=+()@#"°{}_$%:]*$/).required().min(1)
      .max(100),
  })
);
