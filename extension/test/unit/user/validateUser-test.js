const assert = require('assert')
const executeStep = require('../../../user/validateUser')
const ValidationError = require('../../../common/Error/ValidationError')

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

  it('Should normalize, validate and return normalized user data', async () => {
    const expectedUser = {
      mail: 'john@doe.com',
      password: 'qwerty88',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      birthday: '01-01-1970',
      phone: '+11230000001'
    }
    try {
      // noinspection JSCheckFunctionSignatures
      const actualUser = await executeStep({}, {...validUser})
      assert.deepEqual(actualUser, expectedUser)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })

  it('Should throw error on user email validation', async () => {
    const invalidUser = Object.assign(validUser, {
      mail: 'not email string'
    })
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep({}, {...invalidUser})
    } catch (stepError) {
      assert(stepError instanceof ValidationError)
    }
  })
})
