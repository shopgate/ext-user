const assert = require('assert')
const getRegistrationUrl = require('../../../user/getRegistrationUrl')

describe('getRegistrationUrl', () => {
  it('Should get url', (done) => {
    getRegistrationUrl(context, {}, (err, result) => {
      assert.ifError(err)
      assert.equal(result.url, '')
      done()
    })
  })
})
