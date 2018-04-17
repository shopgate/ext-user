const assert = require('assert')
const login = require('../../../user/login')
const {ENOTFOUND} = require('../../../error')
const Password = require('../../../user/Password')

describe('login', () => {
  const context = {
    meta: {
      userId: null
    },
    storage: {
      extension: {
        get: (key, cb) => cb() // noop
      }
    }
  }
  const input = {
    strategy: 'credentials',
    parameters: {
      login: 'john@doe.com',
      password: 'qwerty12'
    }
  }
  it('Should login user', (done) => {
    let userId = 'c558841a-9e15-4b08-a5ba-d5db8845439a'
    context.storage.extension.get = (keyEmail, cb) => {
      assert.equal(keyEmail, input.parameters.login)

      context.storage.extension.get = (keyUserId, cb) => {
        assert.equal(keyUserId, userId)

        // return user
        cb(null, {
          id: userId,
          password: (new Password(input.parameters.password)).password
        })
      }
      // return userId
      cb(null, userId)
    }

    // noinspection JSCheckFunctionSignatures
    login(context, input, (err, result) => {
      assert.ifError(err)
      assert.equal(result.userId, userId)
      done()
    })
  })

  it('Should throw error when user is not found by email', (done) => {
    context.storage.extension.get = (keyEmail, cb) => {
      assert.equal(keyEmail, input.parameters.login)
      cb()
    }
    // noinspection JSCheckFunctionSignatures
    login(context, input, (err) => {
      assert.equal(err.code, ENOTFOUND)
      done()
    })
  })

  it('Should throw error when user is not found by id', (done) => {
    context.storage.extension.get = (keyEmail, cb) => {
      context.storage.extension.get = (keyUserId, cb) => {
        cb()
      }
      cb(null, 'c558841a-9e15-4b08-a5ba-d5db8845439a')
    }
    // noinspection JSCheckFunctionSignatures
    login(context, input, (err) => {
      assert.equal(err.code, ENOTFOUND)
      done()
    })
  })

  it('Should throw error when wrong credentials are given', (done) => {
    let userId = 'c558841a-9e15-4b08-a5ba-d5db8845439a'
    context.storage.extension.get = (keyEmail, cb) => {
      context.storage.extension.get = (keyUserId, cb) => {
        assert.equal(keyUserId, userId)

        // return user
        cb(null, {
          id: userId,
          password: input.parameters.password
        })
      }
      // return userId
      cb(null, userId)
    }

    // noinspection JSCheckFunctionSignatures
    login(context, input, (err) => {
      assert.equal(err.code, ENOTFOUND)
      done()
    })
  })
})
