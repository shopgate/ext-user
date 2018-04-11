const assert = require('assert')
const validateUser = require('../../../user/validateUser')
const {EINVAL} = require('../../../error')

describe('validateUser', () => {
  const validUser = {
    mail: 'john@doe.com ', // with whitespaces
    password: 'qwerty88 ',
    firstName: 'John ',
    lastName: 'Doe ',
    gender: 'male',
    birthday: '01-01-1970',
    phone: '+11230000001 '
  }

  it('Should normalize, validate and return normalized user data', (done) => {
    const expectedUser = {
      mail: 'john@doe.com',
      password: 'qwerty88',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      birthday: '01-01-1970',
      phone: '+11230000001'
    }
    validateUser(context, validUser, (err, user) => {
      assert.ifError(err)
      assert.deepEqual(user, expectedUser)
      done()
    })
  })

  it('Should throw error on user email validation', (done) => {
    const invalidUser = Object.assign(validUser, {
      mail: 'not email string'
    })

    // noinspection JSCheckFunctionSignatures
    validateUser(context, invalidUser, (err) => {
      assert.equal(err.code, EINVAL)
      assert.equal(err.message, '"mail" must be a valid email')
      done()
    })
  })
})
