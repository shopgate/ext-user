const assert = require('assert')
const getEventData = require('../../../event/getEventData')

describe('getEventData', () => {
  it('Return event data', (done) => {
    const input = {
      firstName: 'John',
      lastName: 'Doe'
    }

    getEventData({}, input, (err, result) => {
      assert.ifError(err)
      assert.equal(result.eventData, input)
      done()
    })
  })
})
