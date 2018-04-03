const assert = require('assert')
const validateUser = require('../../../user/validateUser')
const {EINVAL} = require('../../../error')

describe('validateUser', () => {
  it('Should validate user', (done) => {
    const validUser = {
      mail: 'john@doe.com ', // with whitespaces
      password: 'qwerty88 ',
      firstName: 'John ',
      lastName: 'Doe ',
      gender: 'male',
      birthday: '01-01-1970',
      phone: '+11230000001 '
    }
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

  it('Should not validate user', (done) => {
    const invalidUser = {
      mail: 'not email string',
      password: 'qwerty88',
      firstName: '^! non alphanum \\%$',
      lastName: '^! Doe \\%$',
      gender: '^! male \\%$',
      birthday: '01- non date -19710',
      phone: '+11230000001'
    }
    validateUser(context, invalidUser, (err) => {
      assert.equal(err.code, EINVAL)
      assert.equal(err.message, '"mail" must be a valid email')
      done()
    })
  })
})
