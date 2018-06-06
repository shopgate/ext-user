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

  it('Should find address by exact match', async () => {
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

  it('Should not find address by exact match', async () => {
    const expectedAddress = {
      id: null
    }
    context.storage.user.get = () => [{...existingAddress, id}]
    try {
      // noinspection JSCheckFunctionSignatures
      const actualAddress = await stepExecute(context, {...existingAddress, firstName: 'Johanna'}) // a wife of John
      assert.deepEqual(actualAddress, expectedAddress)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })
})
