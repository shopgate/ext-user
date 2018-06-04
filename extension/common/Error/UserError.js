class UserError extends Error {
  constructor (cause = {message: ''}) {
    super()

    // noinspection JSUnusedGlobalSymbols
    this.cause = cause // can be used by extending classes
    this.code = 'EUSER'
    this.message = `User error: ${cause.message}`
  }
}

module.exports = UserError
