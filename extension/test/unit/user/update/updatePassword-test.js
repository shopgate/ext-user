const assert = require('assert')
const executeStep = require('../../../../user/update/updatePassword')
const InvalidCredentialsError = require('../../../../common/Error/InvalidCredentialsError')
const ValidationError = require('../../../../common/Error/ValidationError')
const Password = require('./../../../../user/Password')

describe('validateUser', () => {
  const passwords = {
    password: 'qwerty123',
    oldPassword: 'qwerty321'
  }

  let context

  beforeEach(() => {
    context = {
      meta: {
        userId: 111
      },
      storage: {
        extension: {
          get: () => null,
          set: () => {
            assert.ifError(new Error('Should not be called'))
          }
        }
      }
    }
  })

  it('Should update password', async () => {
    context.storage.extension.get = async () => {
      return {
        password: (new Password(passwords.oldPassword).password)
      }
    }
    context.storage.extension.set = (argUserId, argUser) => {
      assert.strictEqual(argUser.password, new Password(passwords.password).password)
    }
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(context, {...passwords})
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })

  it('Should reject password change due to wrong old password', async () => {
    context.storage.extension.get = async () => {
      return {
        password: (new Password('Some other password').password)
      }
    }
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(context, {...passwords})
      assert.ifError(new Error('Step should fail with InvalidCredentialsError'))
    } catch (stepError) {
      assert(stepError instanceof InvalidCredentialsError)
    }
  })

  it('Should reject password change due to new password validation error', async () => {
    context.storage.extension.get = async () => {
      return {
        password: (new Password(passwords.oldPassword).password)
      }
    }
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(context, {...passwords, password: 'short'})
      assert.ifError(new Error('Step should fail with ValidationError'))
    } catch (stepError) {
      assert(stepError instanceof ValidationError)
    }
  })
})
