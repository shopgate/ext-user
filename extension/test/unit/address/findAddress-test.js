const assert = require('assert')
const stepExecute = require('../../../address/findAddress')

describe('findUserAddress', () => {
  /** @type ExtUserAddress */
  const existingAddress = {
    firstName: 'John',
    lastName: 'Doe',
    street: 'Street 10',
    city: 'City',
    provinceCode: 'HS',
    countryCode: 'DE',
    zipCode: '35510'
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
      const actualAddress = await stepExecute(context, {address: {...existingAddress}})
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
      const actualAddress = await stepExecute(context, {address: {...existingAddress, firstName: 'Johanna'}}) // a wife of John
      assert.deepEqual(actualAddress, expectedAddress)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })
})
