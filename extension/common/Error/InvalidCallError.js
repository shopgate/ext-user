const UserError = require('./UserError')

class InvalidCallError extends UserError {
  constructor (message = 'Invalid call') {
    super(message)

    this.code = 'EINVALIDCALL'
    this.message = message
  }
}

module.exports = InvalidCallError
