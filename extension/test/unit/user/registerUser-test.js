const assert = require('assert')
const registerUser = require('../../../user/registerUser')
const {EACCESS, EEXISTS} = require('../../../error')

describe('registerUser', () => {
  const context = {
    meta: {
      userId: null
    },
    storage: {
      extension: {
        set: (key, cb) => cb() // noop
      }
    }
  }

  const user = {
    mail: 'john@doe.com',
    password: 'qwerty88',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    birthday: '01-01-19710',
    phone: '+11230000001'
  }

  it('Should register user', (done) => {
    let userId = null
    context.storage.extension.get = (keyEmail, cb) => {
      cb()
    }
    context.storage.extension.set = (keyUserId, userInfo, cb) => {
      assert(keyUserId) // UUID
      assert.equal(userInfo.id, keyUserId)
      userId = keyUserId

      context.storage.extension.set = (keyEmail, argUserId, cb) => {
        assert.equal(keyEmail, user.mail)
        assert.equal(argUserId, userId)
        cb(null, {
          userId: userId
        })
      }

      cb()
    }

    // noinspection JSCheckFunctionSignatures
    registerUser(context, user, (err, result) => {
      assert.ifError(err)
      assert.equal(result.userId, userId)
      done()
    })
  })

  it('Should return error when user already exists', (done) => {
    context.storage.extension.get = (keyEmail, cb) => {
      cb(null, 'iuib-sjdbsjd-0knskd')
    }
    context.storage.extension.set = () => {
      // should not be called
      assert.fail()
    }

    // noinspection JSCheckFunctionSignatures
    registerUser(context, user, (err) => {
      assert.equal(err.code, EEXISTS)
      done()
    })
  })

  it('Should return error when user is logged in', (done) => {
    context.meta.userId = 'iuib-sjdbsjd-0knskd'

    // noinspection JSCheckFunctionSignatures
    registerUser(context, user, (err) => {
      assert.equal(err.code, EACCESS)
      done()
    })
  })
})