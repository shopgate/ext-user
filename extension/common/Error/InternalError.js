const UserError = require('./UserError')

class InternalError extends UserError {
  constructor (cause = {message: ''}) {
    super(cause)

    this.code = 'EINTERNAL'
    this.message = `An internal error occurred ${cause.message}`
  }
}

module.exports = InternalError
