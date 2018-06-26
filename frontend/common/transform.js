/**
 * Translate joi error object into validation errors schema
 * @link https://wiki.shopgate.guru/display/DESTINY/SG+Connect+Validation+Errors
 *
 * @param {{details: Object[]}} joiValidationError joi validation error
 * @param {string} stringPrefix
 * @return {{path: string, message: string}[]}}
 */
const joiToValidationErrors = ({details = []}, stringPrefix = '') => details.map(err => ({
  path: err.context.key,
  message: `${stringPrefix}.${err.context.key}`
}))

/**
 * Reduce validation errors to key: value pairs
 * @link https://wiki.shopgate.guru/display/DESTINY/SG+Connect+Validation+Errors
 *
 * @param {{path: string, message: string}[]} validationErrors
 * @return {Object} key: value of errors, eg. email: 'not valid email'
 */
const validationErrorsToMap = (validationErrors = []) => {
  return validationErrors.reduce(
    (reducer, error) => ({
      ...reducer,
      [error.path]: error.message
    }),
    {}
  )
}

module.exports = {
  joiToValidationErrors,
  validationErrorsToMap
}
