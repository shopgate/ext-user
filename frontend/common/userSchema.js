import joi from 'joi-browser';

const passwordSchema = joi.string().min(8).required();

export const changePasswordSchema = joi.object().keys({
  oldPassword: joi.string().min(1).required(),
  password: passwordSchema,
  repeatPassword: joi.string().required().valid(joi.ref('password')),
});

/**
 * User register schema
 *
 * @param {boolean} isUpdate schema for update user
 * @return {{validate: function}}
 */
export default (isUpdate = false) => (
  joi.object().keys({
    mail: joi.string().email({ minDomainAtoms: 2 }).required(),
    password: isUpdate ? joi.string().optional().allow([null, '']) : passwordSchema,
    firstName: joi.string().regex(/^[^[0-9!<>,;?=+()@#"°{}_$%:]*$/).required().min(1)
      .max(100),
    lastName: joi.string().regex(/^[^[0-9!<>,;?=+()@#"°{}_$%:]*$/).required().min(1)
      .max(100),
  }).unknown(true)
);
