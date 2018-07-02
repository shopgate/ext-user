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

  describe('Should not throw address validation errors', async () => {
    const tests = {
      'Province code is undefined': {provinceCode: void 0},
      'Province code is null': {provinceCode: null},
      'Province code is empty string': {provinceCode: ''},
      'Street in EU': {street: 'Schlossstrasse 10'},
      'Street in US/UK': {street: '44 Morningside Road'}
    }

    Object.keys(tests).forEach((testTitle) => {
      it(testTitle, async () => {
        try {
          // noinspection JSCheckFunctionSignatures
          await stepExecute({}, {address: {...validAddress, ...tests[testTitle]}})
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
      'Street is too long': {street: 'Very long street'.repeat(100)},
      'Street is not valid': {street: 'Castle street'},
      'Street has special characters': {street: '<script>alert(1)</script>'},
      'Province is not valid: max 10 length': {provinceCode: '12345678901'},
      'Country is too long': {countryCode: 'Very long countryCode'}
    }

    Object.keys(tests).forEach((testTitle) => {
      it(testTitle, async () => {
        try {
          // noinspection JSCheckFunctionSignatures
          await stepExecute({}, {address: {...validAddress, ...tests[testTitle]}})
        } catch (stepError) {
          assert(stepError instanceof ValidationError)
        }
      })
    })
  })
})
