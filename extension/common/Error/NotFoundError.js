const UserError = require('./UserError')

class NotFoundError extends UserError {
  constructor (message = 'Not found') {
    super()

    this.code = 'ENOTFUOND'
    this.message = message
  }
}

module.exports = NotFoundError
