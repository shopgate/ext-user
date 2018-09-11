import * as selectors from './addressForm';

const statePrefix = '@shopgate/user/UserReducers';

describe('AddressForm selectors', () => {
  it('should select isFetching', () => {
    expect(selectors.isFetching({
      extensions: {
        [statePrefix]: {
          addressForm: { isFetching: true },
        },
      },
    })).toEqual(true);
  });

  it('should select errors', () => {
    const state = {
      extensions: {
        [statePrefix]: {
          addressForm: { error: 'fooo' },
        },
      },
    };

    expect(selectors.hasErrors(state)).toEqual(true);
    expect(selectors.getErrors(state)).toEqual('fooo');

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
