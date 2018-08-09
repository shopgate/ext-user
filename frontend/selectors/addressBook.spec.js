import * as selectors from './addressBook';

const statePrefix = '@shopgate/user/UserReducers';

describe('AddressBook selectors', () => {
  it('Should select getUserAddresses', () => {
    const state = {
      extensions: {
        [statePrefix]: {
          addressBook: {
            addresses: [{ id: 123, tags: ['default'] }],
          },
        },
      },
    };
    const expected = [{ id: 123, tags: ['default'] }];
    expect(selectors.getUserAddresses(state)).toEqual(expected);
  });

  it('Should select getUserDefaultAddresses', () => {
    const state = {
      extensions: {
        [statePrefix]: {
          addressBook: {
            default: {
              default: 123,
            },
          },
        },
      },
    };
    const expected = {
      default: 123,
    };
    expect(selectors.getUserDefaultAddresses(state)).toEqual(expected);
  });

  it('Should return getUserAddressIdSelector', () => {
    const state = {
      extensions: {
        [statePrefix]: {
          addressBook: {
            addresses: [{ id: 123, tags: ['default'] }],
          },
        },
      },
    };
    const expected = { id: 123, tags: ['default'] };
    const selectAddress = selectors.getUserAddressIdSelector(state);
    expect(selectAddress(123)).toEqual(expected);
  });

  it('Should select isBusy', () => {
    const state = {
      extensions: {
        [statePrefix]: {
          addressBook: {
            busy: true,
          },
        },
      },
    };
    expect(selectors.isBusy(state)).toEqual(true);
  });

  it('Should select getValidationErrors', () => {
    const state = {
      extensions: {
        [statePrefix]: {
          addressBook: {
            validationErrors: [{ path: 'path', message: 'message' }],
          },
        },
      },
    };
    expect(selectors.getValidationErrors(state)).toEqual([{ path: 'path', message: 'message' }]);
  });
});
