const assert = require('assert')
const executeStep = require('../../../user/validateUser')
const ValidationError = require('../../../common/Error/ValidationError')

describe('validateUser', () => {
  const validUser = {
    mail: 'john@doe.com ', // with whitespaces
    password: 'qwerty88 ',
    firstName: 'John ',
    lastName: 'Doe '
  }

  it('Should normalize, validate and return normalized user data', async () => {
    const expectedUser = {
      mail: 'john@doe.com',
      password: 'qwerty88',
      firstName: 'John',
      lastName: 'Doe',
      customAttributes: {}
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
    const invalidUser = {
      ...validUser,
      mail: 'not email string'
    }
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep({}, {...invalidUser})
    } catch (stepError) {
      assert(stepError instanceof ValidationError)
    }
  })
})
