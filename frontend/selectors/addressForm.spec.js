import * as selectors from './addressForm';

const statePrefix = '@shopgate/user/UserReducers';

describe('AddressForm selectors', () => {
  it('should select errors', () => {
    const state = {
      extensions: {
        [statePrefix]: {
          addressForm: { error: 'foo' },
        },
      },
    };

    expect(selectors.hasErrors(state)).toEqual(true);
    expect(selectors.getErrors(state)).toEqual('foo');

    const stateB = {
      extensions: {
        [statePrefix]: {
          addressForm: { error: null },
        },
      },
    };

    expect(selectors.hasErrors(stateB)).toEqual(false);
  });
});
