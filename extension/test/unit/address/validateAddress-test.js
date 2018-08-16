const assert = require('assert')
const stepExecute = require('../../../address/validateAddress')
const ValidationError = require('../../../common/Error/ValidationError')

describe('validateUserAddress', () => {
  /** @type ExtUserAddress */
  const validAddress = {
    firstName: ' John ',
    lastName: ' Doe ',
    street1: ' Street 10 ',
    city: ' City',
    province: ' HS ',
    country: ' DE ',
    zipCode: ' 35510 '
  }

  it('Should return normalized user data', async () => {
    const expectedAddress = {
      firstName: 'John',
      lastName: 'Doe',
      street1: 'Street 10',
      city: 'City',
      province: 'HS',
      country: 'DE',
      zipCode: '35510',
      tags: [],
      customAttributes: {}
    }
    try {
      // noinspection JSCheckFunctionSignatures
      const actualAddress = (await stepExecute({}, {...validAddress}))
      assert.deepEqual(actualAddress, expectedAddress)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })

  it('Should return normalized user data with tags', async () => {
    const expectedAddress = {
      firstName: 'John',
      lastName: 'Doe',
      street1: 'Street 10',
      city: 'City',
      province: 'HS',
      country: 'DE',
      zipCode: '35510',
      tags: ['shipping'],
      customAttributes: {}
    }
    try {
      // noinspection JSCheckFunctionSignatures
      const actualAddress = (await stepExecute({}, {...validAddress, tags: ['shipping']}))
      assert.deepEqual(actualAddress, expectedAddress)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })

  describe('Should not throw address validation errors', async () => {
    const tests = {
      'Province code is undefined': {province: void 0},
      'Province code is null': {province: null},
      'Province code is empty string': {province: ''},
      'Street in EU': {street1: 'Schlossstrasse 10'},
      'Street in US/UK': {street1: '44 Morningside Road'}
    }

    Object.keys(tests).forEach((testTitle) => {
      it(testTitle, async () => {
        try {
          // noinspection JSCheckFunctionSignatures
          await stepExecute({}, {...validAddress, ...tests[testTitle]})
        } catch (stepError) {
          assert.ifError(stepError)
        }
      })
    })
  })

  describe('Should throw error on occurring address validation errors', async () => {
    const tests = {
      'First name is empty': {firstName: ''},
      'Last name is too long': {lastName: 'Very long last name. More then 255 characters'.repeat(10)},
      'Street is too long': {street1: 'Very long street'.repeat(100)},
      'Street is not valid': {street1: 'Castle street'},
      'Street has special characters': {street1: '<script>alert(1)</script>'},
      'Province is not valid: max 10 length': {province: '12345678901'},
      'Country is too long': {country: 'Very long country'}
    }

    Object.keys(tests).forEach((testTitle) => {
      it(testTitle, async () => {
        try {
          // noinspection JSCheckFunctionSignatures
          await stepExecute({}, {...validAddress, ...tests[testTitle]})
        } catch (stepError) {
          assert(stepError instanceof ValidationError)
        }
      })
    })
  })
})
