const UserError = require('./UserError')

class UserExistError extends UserError {
  constructor (message = 'User already exists') {
    super()

    this.code = 'EEXISTS'
    this.message = message
  }
}

module.exports = UserExistError
