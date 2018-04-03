const assert = require('assert')
const checkAuthSuccess = require('../../../user/checkAuthSuccess')
const {EAUTH} = require('../../../error')

describe('checkAuthSuccess', () => {
  it('Should throw error', (done) => {
    checkAuthSuccess(context, {authSuccess: false}, (err) => {
      assert.equal(err.code, EAUTH)
      assert.equal(err.message, 'Auth failed')
      done()
    })
  })

  it('Should not throw error', (done) => {
    checkAuthSuccess(context, {authSuccess: true}, (err) => {
      assert.ifError(err)
      done()
    })
  })
})
