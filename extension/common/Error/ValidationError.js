const UserError = require('./UserError')

class ValidationError extends UserError {
  constructor (validationErrors) {
    super()

    this.code = 'EVALIDATION'
    this.message = 'There was an error with a request'
    this.validationErrors = validationErrors
  }
}

module.exports = ValidationError
