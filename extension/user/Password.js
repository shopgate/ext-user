const crypto = require('crypto')

class Password {
  constructor(plainPassword) {
    this.password = crypto.createHash('sha256').update(plainPassword).digest('hex')
  }
}

module.exports = Password
