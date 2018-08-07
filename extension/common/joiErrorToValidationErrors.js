/**
 * Translate joi error object into validation errors schema
 * @link https://wiki.shopgate.guru/display/DESTINY/SG+Connect+Validation+Errors
 *
 * @param {{details: Object[]}} joiValidationError joi validation error
 * @param {string} stringPrefix prefix
 * @return {{validationErrors: {path: string, message: string}[]}}
 */
module.exports = ({ details = [] }, stringPrefix = '') => ({
  validationErrors: details.map(err => ({
    path: err.context.key,
    message: `${stringPrefix}.${err.context.key}`
  }))
})
