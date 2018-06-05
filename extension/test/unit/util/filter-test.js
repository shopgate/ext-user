const assert = require('assert')
const executeStep = require('../../../util/filter')

describe('filterInput', () => {
  it('Should filter out all properties of the given object except the given ones to keep', async () => {
    const input = {
      properties: ['age', 'name', 'rating'],
      hydratedObject: {
        street: 'sweet street 3',
        name: 'John Doe',
        age: 33,
        id: 111,
        rating: '5 Stars'
      }
    }

    // make sure the order is correct as well
    const expected = {
      filteredObject: {
        age: 33,
        name: 'John Doe',
        rating: '5 Stars'
      }
    }

    // noinspection JSCheckFunctionSignatures
    const output = await executeStep({}, input)
    assert.deepEqual(output, expected)
  })
})
