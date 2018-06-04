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

  it('Should normalize, validate and return normalized user data', async () => {
    const expectedAddress = {
      firstName: 'John',
      lastName: 'Doe',
      street: 'Street 10',
      city: 'City',
      provinceCode: 'HS',
      countryCode: 'DE',
      zipCode: '35510'
    }
    try {
      // noinspection JSCheckFunctionSignatures
      const actualAddress = await stepExecute({}, validAddress)
      assert.deepEqual(actualAddress, expectedAddress)
    } catch (stepError) {
      assert.ifError(stepError)
    }
  })

  describe('Should throw error on address validation', async () => {
    const tests = {
      'First name is empty': {firstName: ''},
      'Last name is too long': {lastName: 'Vary long last name. More then 255 characters'.repeat(10)},
      'Street is too long': {street: 'Vary long street'.repeat(100)},
      'Country is too long': {countryCode: 'Vary long countryCode'}
    }

    Object.keys(tests).forEach((testTitle, testDouble) => {
      it(testTitle, async () => {
        try {
          // noinspection JSCheckFunctionSignatures
          await stepExecute({}, {...validAddress, ...testDouble})
        } catch (stepError) {
          assert.ifError(stepError instanceof ValidationError)
        }
      })
    })
  })
})
