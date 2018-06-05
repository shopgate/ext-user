const assert = require('assert')
const executeStep = require('../../../util/merge')

describe('mergeInput', () => {
  it('Should merge two input objects into a single output object', async () => {
    const input = {
      first: {
        id: 111,
        age: 33,
        rating: '1 Star'
      },
      second: {
        street: 'sweet street 3',
        name: 'John Doe',
        rating: '5 Stars'
      }
    }

    const expected = {
      data: {
        id: 111,
        age: 33,
        rating: '5 Stars',
        street: 'sweet street 3',
        name: 'John Doe'
      }
    }

    // noinspection JSCheckFunctionSignatures
    const output = await executeStep({}, input)
    assert.deepEqual(output, expected)
  })

  it('Should be possible to leave the inputs empty', async () => {
    const input = {}

    const expected = {
      data: {}
    }

    // noinspection JSCheckFunctionSignatures
    const output = await executeStep({}, input)
    assert.deepEqual(output, expected)
  })

  it('Should allow the first input to be not available', async () => {
    const input = {
      second: {
        street: 'sweet street 3',
        name: 'John Doe',
        rating: '5 Stars'
      }
    }

    const expected = {
      data: {
        street: 'sweet street 3',
        name: 'John Doe',
        rating: '5 Stars'
      }
    }

    // noinspection JSCheckFunctionSignatures
    const output = await executeStep({}, input)
    assert.deepEqual(output, expected)
  })

  it('Should allow the second input to be not available', async () => {
    const input = {
      first: {
        id: 111,
        age: 33,
        rating: '1 Star'
      }
    }

    const expected = {
      data: {
        id: 111,
        age: 33,
        rating: '1 Star'
      }
    }

    // noinspection JSCheckFunctionSignatures
    const output = await executeStep({}, input)
    assert.deepEqual(output, expected)
  })
})
