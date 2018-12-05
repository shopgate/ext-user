const assert = require('assert')
const stepExecute = require('../../../address/sortAddresses')

const out = {}
const context = {
  storage: {
    user: {
      get: (key) => {},
      set: (key, val) => { out[key] = val }
    }
  }
}

describe('sortAddresses', () => {
  it('should handle empty array', async () => {
    context.storage.user.get = () => []
    // noinspection JSCheckFunctionSignatures
    await stepExecute(context)

    assert.deepEqual(out.addresses, [])
  })

  it('should move default to top', async () => {
    context.storage.user.get = () => [
      { id: 1, tags: [] },
      { id: 2, tags: ['default'] },
      { id: 3, tags: ['foo'] }
    ]
    // noinspection JSCheckFunctionSignatures
    await stepExecute(context)

    assert.deepEqual(out.addresses, [
      { id: 2, tags: ['default'] },
      { id: 1, tags: [] },
      { id: 3, tags: ['foo'] }
    ])
  })

  it('should priorities multiple default addresses', async () => {
    context.storage.user.get = () => [
      { id: 1, tags: [] },
      { id: 2, tags: ['default_payment'] },
      { id: 3, tags: ['foo'] },
      { id: 4, tags: ['default_shipping'] }
    ]
    // noinspection JSCheckFunctionSignatures
    await stepExecute(context)

    assert.deepEqual(out.addresses, [
      { id: 2, tags: ['default_payment'] },
      { id: 4, tags: ['default_shipping'] },
      { id: 1, tags: [] },
      { id: 3, tags: ['foo'] }
    ])
  })
})
