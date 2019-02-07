import subscription from './addressBook';
import { ENOREMOVEDEFAULT } from '../constants/Pipelines';

let mockUpdateAddress;
let mockGetAddresses;
let mockShowModal;
jest.mock('../actions/updateAddress', () => (...args) => mockUpdateAddress(...args));
jest.mock('../actions/getAddresses', () => () => mockGetAddresses());
jest.mock('@shopgate/pwa-common/actions/modal/showModal', () => (...args) => mockShowModal(...args));
jest.mock('@shopgate/pwa-common/streams/user', () => ({
  userDidUpdate$: {
    debounceTime: () => jest.fn(),
  },
}));

describe('AddressBook subscriptions', () => {
  const subscribe = jest.fn();
  subscription(subscribe);

  const [
    addressFormLeave$,
    userAddressValidationFailed$,
    userAddressChanged$,
    userAddressBookEnter$,
    userDidUpdateDebounced$,
    userAddressesDelete$,
    userAddressesDeleted$,
    userSetDefaultAddress$,
    userAddressesDeleteFailed$,
  ] = subscribe.mock.calls;

  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
    dispatch.mockReturnValue(Promise.resolve());

    mockUpdateAddress = jest.fn();
    mockGetAddresses = jest.fn();
    mockShowModal = jest.fn();
  });

  it('should subscribe to the streams', () => {
    expect(subscribe.mock.calls.length).toEqual(9);
  });

  it('should dispatch action on address form leave', () => {
    addressFormLeave$[1]({ dispatch });
  });

  it('should create toast message when validation is failed ', () => {
    const events = jest.fn();
    events.emit = jest.fn();
    // noinspection JSCheckFunctionSignatures
    jest.spyOn(events, 'emit');
    userAddressValidationFailed$[1]({ events });

    expect(events.emit).toHaveBeenCalledWith('toast_add', {
      id: 'address.validationFailed',
      message: 'address.validationFailedToastMessage',
    });
  });

  it('should fetch addresses when single address is changed', () => {
    const action = { silent: true };
    // eslint-disable-next-line extra-rules/no-single-line-objects
    userAddressChanged$[1]({ dispatch, action });
    expect(mockGetAddresses).toHaveBeenCalledTimes(1);
  });

  it('should fetch addresses when address book enter', () => {
    userAddressBookEnter$[1]({ dispatch });
    expect(mockGetAddresses).toHaveBeenCalledTimes(1);
  });

  it('should fetch addresses when user is updated', () => {
    userDidUpdateDebounced$[1]({
      dispatch,
      getState: () => ({ user: { data: { id: 1 } } }),
    });
    expect(mockGetAddresses).toHaveBeenCalledTimes(1);
  });

  it('should show modal when address request is received', () => {
    const action = { addressIds: [1] };
    // eslint-disable-next-line extra-rules/no-single-line-objects
    userAddressesDelete$[1]({ dispatch, action });
    expect(mockShowModal).toHaveBeenCalledTimes(1);
  });

  it('should create toast message when addresses are deleted', () => {
    const events = jest.fn();
    events.emit = jest.fn();
    // noinspection JSCheckFunctionSignatures
    jest.spyOn(events, 'emit');
    // eslint-disable-next-line extra-rules/no-single-line-objects
    userAddressesDeleted$[1]({ dispatch, events });
    expect(events.emit).toHaveBeenCalledWith('toast_add', {
      id: 'address.delete',
      message: 'address.delete.successMessage',
    });
  });

  it('should add tags when marked as default', () => {
    const state = {
      extensions: {
        '@shopgate/user/UserReducers': {
          addressBook: {
            addresses: [
              // eslint-disable-next-line extra-rules/no-single-line-objects
              { id: 1, tags: [], firstName: 'foo' },
            ],
          },
        },
      },
    };
    // eslint-disable-next-line extra-rules/no-single-line-objects
    const action = { addressId: 1, tag: 'shipping' };
    // eslint-disable-next-line extra-rules/no-single-line-objects
    userSetDefaultAddress$[1]({ dispatch, action, getState: () => state });

    // eslint-disable-next-line extra-rules/no-single-line-objects
    expect(mockUpdateAddress).toHaveBeenCalledWith({ id: 1, firstName: 'foo', tags: ['default_shipping'] }, true);
  });

  it('should create toast message when default address can not be deleted', () => {
    const events = jest.fn();
    events.emit = jest.fn();
    // noinspection JSCheckFunctionSignatures
    jest.spyOn(events, 'emit');
    // eslint-disable-next-line extra-rules/no-single-line-objects
    userAddressesDeleteFailed$[1]({ action: { error: { code: ENOREMOVEDEFAULT } }, events });
    expect(events.emit).toHaveBeenCalledWith('toast_add', {
      id: 'address.delete',
      message: 'address.delete.noRemoveDefault',
    });
  });
});
