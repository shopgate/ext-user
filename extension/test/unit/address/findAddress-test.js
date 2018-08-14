const assert = require('assert')
const stepExecute = require('../../../address/findAddress')

describe('findUserAddress', () => {
  /** @type ExtUserAddress */
  const existingAddress = {
    firstName: 'John',
    lastName: 'Doe',
    street1: 'Street 10',
    city: 'City',
    country: 'DE'
  }

  const id = 'id-123'

  const context = {
    storage: {
      user: {
        get: () => {}
      }
    }
  }

  it('Should find addresses by exact match if there is one', async () => {
    const expectedAddress = {
      ...existingAddress,
      id
    }
    context.storage.user.get = () => [{...existingAddress, id}]
    try {
      // noinspection JSCheckFunctionSignatures
      const actualAddress = await stepExecute(context, {...existingAddress})
      assert.deepEqual(actualAddress, expectedAddress)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })

  it('Should not find any addresses by exact match if there is none', async () => {
    const expectedAddress = {
      id: null
    }
    context.storage.user.get = () => [{...existingAddress, id}]
    try {
      // noinspection JSCheckFunctionSignatures
      const actualAddress = await stepExecute(context, {...existingAddress, firstName: 'Johanna'})
      assert.deepEqual(actualAddress, expectedAddress)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })
})
