const assert = require('assert')
const login = require('../../../user/login')
const crypto = require('crypto')
const {EINVALIDCREDENTIALS, ENOTFOUND} = require('../../../error')

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
          password: crypto.createHash('md5').update(input.parameters.password).digest('hex')
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

  it('Should throw error when user is not found', (done) => {
    let userId = 'c558841a-9e15-4b08-a5ba-d5db8845439a'
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

  it('Should throw error when wrong credentials are given', (done) => {
    let userId = 'c558841a-9e15-4b08-a5ba-d5db8845439a'
    context.storage.extension.get = (keyEmail, cb) => {
      assert.equal(keyEmail, input.parameters.login)

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
      assert.equal(err.code, EINVALIDCREDENTIALS)
      done()
    })
  })
})
