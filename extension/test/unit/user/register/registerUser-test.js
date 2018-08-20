const assert = require('assert')
const executeStep = require('../../../../user/register/registerUser')
const UserExistError = require('../../../../common/Error/UserExistError')
const UnauthorizedError = require('../../../../common/Error/UnauthorizedError')

describe('registerUser', () => {
  const user = {
    mail: 'john@doe.com',
    password: 'qwerty88',
    firstName: 'John',
    lastName: 'Doe'
  }

  let context

  beforeEach(() => {
    context = {
      log: {
        warn: () => null,
        info: () => null
      },
      meta: {
        userId: null
      },
      storage: {
        extension: {
          get: () => null,
          set: () => null
        }
      }
    }
  })

  it('Should register user', async () => {
    let userId = null
    context.storage.extension.set = (keyUserId, userInfo) => {
      assert(keyUserId) // UUID
      assert.equal(userInfo.id, keyUserId)
      userId = keyUserId
      context.storage.extension.set = (keyEmail, argUserId) => {
        assert.equal(keyEmail, user.mail)
        assert.equal(argUserId, userId)
        return userId
      }
    }
    try {
      // noinspection JSCheckFunctionSignatures
      const result = await executeStep(context, {...user})
      assert.equal(result.userId, userId)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })

  it('Should return error when user already exists', async () => {
    context.storage.extension.get = () => 'iuib-sjdbsjd-0knskd'
    context.storage.extension.set = () => {
      // should not be called
      assert.fail()
    }
    let stepError
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(context, {...user})
    } catch (err) {
      stepError = err
    }
    assert(stepError instanceof UserExistError)
  })

  it('Should return error when user is logged in', async () => {
    context.meta.userId = 'iuib-sjdbsjd-0knskd'
    let stepError
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(context, {...user})
    } catch (err) {
      stepError = err
    }
    assert(stepError instanceof UnauthorizedError)
  })
})
