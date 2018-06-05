const assert = require('assert')
const executeStep = require('../../../util/pack')

describe('packInput', () => {
  it('Should pack input into an object with the given objects as properties of the output', async () => {
    const input = {
      street: 'sweet street 3',
      name: 'John Doe',
      age: 33,
      id: 111,
      rating: '5 Stars'
    }

    const expected = {
      data: input
    }

    // noinspection JSCheckFunctionSignatures
    const output = await executeStep({}, input)
    assert.deepEqual(output, expected)
  })
})
