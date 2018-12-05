const assert = require('assert')
const getUser = require('../../../user/getUser')
const NotFoundError = require('../../../common/Error/NotFoundError')

describe('getUser', () => {
  const context = {
    meta: {
      userId: 'c558841a-9e15-4b08-a5ba-d5db8845439a'
    },
    storage: {
      extension: {
        get: (key, cb) => cb() // noop
      }
    }
  }
  it('Should load correct user', async () => {
    const expectedUser = {
      id: 'c558841a-9e15-4b08-a5ba-d5db8845439a',
      mail: 'john@doe.com',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      birthday: '01-01-19710',
      phone: '+11230000001'
    }
    context.storage.extension.get = (keyUserId) => {
      assert.equal(keyUserId, context.meta.userId)
      return {...expectedUser}
    }
    try {
      // noinspection JSCheckFunctionSignatures
      const user = await getUser(context)
      assert.deepEqual(user, expectedUser)
    } catch (err) {
      assert.ifError(err)
    }
  })

  it('Should get error when user not found', async () => {
    context.storage.extension.get = (keyUserId) => {
      assert.equal(keyUserId, context.meta.userId)
      return undefined
    }
    let stepError
    try {
      // noinspection JSCheckFunctionSignatures
      await getUser(context)
    } catch (err) {
      stepError = err
    }
    assert(stepError instanceof NotFoundError)
  })
})
