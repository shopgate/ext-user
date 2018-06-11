const UserError = require('./UserError')

class ValidationError extends UserError {
  constructor (error) {
    super()

    this.code = 'EVALIDATION'
    this.message = `Validation error ${error}`
    this.error = error
    this.validationErrors = []
  }
}

module.exports = ValidationError
