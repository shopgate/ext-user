const assert = require('assert')
const stepExecute = require('../../../address/validateAddress')
const ValidationError = require('../../../common/Error/ValidationError')

describe('validateUserAddress', () => {
  /** @type ExtUserAddress */
  const validAddress = {
    firstName: ' John ',
    lastName: ' Doe ',
    street: ' Street 10 ',
    city: ' City',
    provinceCode: ' HS ',
    countryCode: ' DE ',
    zipCode: ' 35510 '
  }

  it('Should return normalized user data', async () => {
    const expectedAddress = {
      firstName: 'John',
      lastName: 'Doe',
      street: 'Street 10',
      city: 'City',
      provinceCode: 'HS',
      countryCode: 'DE',
      zipCode: '35510',
      tags: []
    }
    try {
      // noinspection JSCheckFunctionSignatures
      const actualAddress = (await stepExecute({}, {address: validAddress})).address
      assert.deepEqual(actualAddress, expectedAddress)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })

  it('Should return normalized user data with tags', async () => {
    const expectedAddress = {
      firstName: 'John',
      lastName: 'Doe',
      street: 'Street 10',
      city: 'City',
      provinceCode: 'HS',
      countryCode: 'DE',
      zipCode: '35510',
      tags: ['shipping']
    }
    try {
      // noinspection JSCheckFunctionSignatures
      const actualAddress = (await stepExecute({}, {address: {...validAddress, tags: ['shipping']}})).address
      assert.deepEqual(actualAddress, expectedAddress)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })

  describe('Should throw error on occuring address validation errors', async () => {
    const tests = {
      'First name is empty': {firstName: ''},
      'Last name is too long': {lastName: 'Very long last name. More then 255 characters'.repeat(10)},
      'Street is too long': {street: 'Very long street'.repeat(100)},
      'Country is too long': {countryCode: 'Very long countryCode'}
    }

    Object.keys(tests).forEach((testTitle, testDouble) => {
      it(testTitle, async () => {
        try {
          // noinspection JSCheckFunctionSignatures
          await stepExecute({}, {address: {...validAddress, ...testDouble}})
        } catch (stepError) {
          assert.ifError(stepError instanceof ValidationError)
        }
      })
    })
  })
})
