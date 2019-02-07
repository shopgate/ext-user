/**
 * Translate joi error object into validation errors schema
 * @link https://wiki.shopgate.guru/display/DESTINY/SG+Connect+Validation+Errors
 *
 * @param {{details: Object[]}} joiValidationError joi validation error
 * @param {string} stringPrefix prefix
 * @returns {{path: string, message: string}[]}
 */
const joiToValidationErrors = ({ details = [] }, stringPrefix = '') => details.map(err => ({
  path: err.context.key,
  message: `${stringPrefix}.${err.context.key}`,
}));

module.exports = { joiToValidationErrors };
