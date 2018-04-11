const assert = require('assert')
const getUser = require('../../../user/getUser')
const {EACCESS, ENOTFOUND} = require('../../../error')

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
  it('Should load correct user', (done) => {
    const expectedUser = {
      id: 'c558841a-9e15-4b08-a5ba-d5db8845439a',
      mail: 'john@doe.com',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      birthday: '01-01-19710',
      phone: '+11230000001'
    }
    context.storage.extension.get = (keyUserId, cb) => {
      assert.equal(keyUserId, context.meta.userId)
      // return user
      cb(null, expectedUser)
    }
    // noinspection JSCheckFunctionSignatures
    getUser(context, {}, (err, result) => {
      assert.ifError(err)
      assert.deepEqual(result, expectedUser)
      done()
    })
  })

  it('Should get error when user not found', (done) => {
    context.storage.extension.get = (keyUserId, cb) => {
      assert.equal(keyUserId, context.meta.userId)
      cb()
    }
    // noinspection JSCheckFunctionSignatures
    getUser(context, {}, (err) => {
      assert.equal(err.code, ENOTFOUND)
      done()
    })
  })

  it('Should get error when user is not logged in', (done) => {
    context.meta.userId = null
    // noinspection JSCheckFunctionSignatures
    getUser(context, {}, (err) => {
      assert.equal(err.code, EACCESS)
      done()
    })
  })
})
