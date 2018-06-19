const assert = require('assert')
const executeStep = require('../../../order/addUserFilter')

describe('addUserFilter', () => {
  const contextFixture = {
    meta: {
      userId: '1000'
    }
  }
  const filterFixture = {
    field: 'field',
    value: 'value',
    condition: 'eq'
  }

  const filterUser = {
    field: 'userId',
    value: '1000',
    condition: 'eq'
  }

  it('Should append to empty array', async () => {
    try {
      // noinspection JSCheckFunctionSignatures
      const actual = await executeStep(contextFixture, {filters: []})
      assert.deepEqual(actual, {filters: [{...filterUser}]})
    } catch (e) {
      assert.ifError(e)
    }
  })

  it('Should append to existing filters array', async () => {
    try {
      // noinspection JSCheckFunctionSignatures
      const actual = await executeStep(contextFixture, {filters: [{...filterFixture}]})
      assert.deepEqual(actual, {filters: [{...filterUser}, {...filterFixture}]})
    } catch (e) {
      assert.ifError(e)
    }
  })
})
