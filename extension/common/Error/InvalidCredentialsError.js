const UserError = require('./UserError')

class InvalidCredentialsError extends UserError {
  constructor () {
    super()

    this.code = 'EINVALIDCREDENTIALS'
    this.message = 'The given credentials are wrong or do not exist'
  }
}

module.exports = InvalidCredentialsError
