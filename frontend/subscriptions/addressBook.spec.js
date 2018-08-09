import subscription from './addressBook';

// Create action mocks.
const mockToggleNavigatorCart = jest.fn();
const mockToggleNavigatorSearch = jest.fn();
jest.mock('../action-creators', () => ({
  toggleNavigatorCart: (...args) => mockToggleNavigatorCart(...args),
  toggleNavigatorSearch: (...args) => mockToggleNavigatorSearch(...args),
}));

const mockUpdateAddress = jest.fn();
jest.mock('../actions/updateAddress', () => (...args) => mockUpdateAddress(...args));

describe('AddressBook subscriptions', () => {
  const subscribe = jest.fn();
  const dispatch = jest.fn();
  subscription(subscribe);

  const [
    addressBookDidEnter$,
    addressBookDidLeave$,
  ] = subscribe.mock.calls;
  const userSetDefaultAddress$ = subscribe.mock.calls.pop();

  it('should subscribe to the streams', () => {
    expect(subscribe.mock.calls.length).toEqual(6);
  });

  it('should toggle navigator controls when route is entered', () => {
    addressBookDidEnter$[1]({ dispatch });
    expect(mockToggleNavigatorCart).toHaveBeenCalledWith(false);
    expect(mockToggleNavigatorSearch).toHaveBeenCalledWith(false);

    addressBookDidLeave$[1]({ dispatch });
    expect(mockToggleNavigatorCart).toHaveBeenCalledWith(true);
    expect(mockToggleNavigatorSearch).toHaveBeenCalledWith(true);
  });

  it('should add tags when marked as default', () => {
    const state = {
      extensions: {
        '@shopgate/user/UserReducers': {
          addressBook: {
            addresses: [
              { id: 1, tags: [], firstName: 'foo' },
            ],
          },
        },
      },
    };
    const action = { addressId: 1, tag: 'default' };
    userSetDefaultAddress$[1]({ dispatch, action, getState: () => state });

    expect(mockUpdateAddress).toHaveBeenCalledWith({ id: 1, firstName: 'foo', tags: ['default'] }, true);
  });
});
