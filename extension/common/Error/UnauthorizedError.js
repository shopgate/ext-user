const UserError = require('./UserError')

class UnauthorizedError extends UserError {
  constructor (cause = {message: ''}) {
    super(cause)

    this.code = 'EACCESS'
    this.message = 'Permission denied'
  }
}

module.exports = UnauthorizedError
