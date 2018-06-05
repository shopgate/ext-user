const assert = require('assert')
const executeStep = require('../../../util/unpack')

describe('unpackInput', () => {
  it('Should unpack the given properties into a new object in the right order', async () => {
    const input = {
      properties: ['id', 'age', 'name'],
      packedInput: {
        street: 'sweet street 3',
        name: 'John Doe',
        age: 33,
        id: 111,
        rating: '5 Stars'
      }
    }

    // make sure the order is correct as well
    const expected = {
      id: 111,
      age: 33,
      name: 'John Doe'
    }

    // noinspection JSCheckFunctionSignatures
    const output = await executeStep({}, input)
    assert.deepEqual(output, expected)
  })
})
