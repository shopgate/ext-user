const assert = require('assert')
const stepExecute = require('../../../address/findAddress')

describe('findUserAddress', () => {
  /** @type ExtUserAddress */
  const existingAddress = {
    id: 'id-123',
    firstName: 'John',
    lastName: 'Doe',
    street: 'Street 10',
    city: 'City',
    provinceCode: 'HS',
    countryCode: 'DE',
    zipCode: '35510'
  }

  const context = {
    storage: {
      user: {
        get: () => {}
      }
    }
  }

  it('Should find address by exact match', async () => {
    const expectedAddress = {
      ...existingAddress
    }
    context.storage.user.get = () => [{...existingAddress}]
    try {
      // noinspection JSCheckFunctionSignatures
      const actualAddress = await stepExecute(context, {...existingAddress})
      assert.deepEqual(actualAddress, expectedAddress)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })

  it('Should not find address by exact match', async () => {
    const expectedAddress = {
      id: null
    }
    context.storage.user.get = () => [{...existingAddress}]
    try {
      // noinspection JSCheckFunctionSignatures
      const actualAddress = await stepExecute(context, {...existingAddress, firstName: 'Johanna'}) // a wife of John
      assert.deepEqual(actualAddress, expectedAddress)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })
})
