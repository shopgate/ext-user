import { SUCCESS_LOGOUT } from '@shopgate/pwa-common/constants/ActionTypes';
import {
  USER_ADDRESSES_RECEIVED,
  SET_DEFAULT_ADDRESS,
  ADD_USER_ADDRESS_SUCCESS,
  UPDATE_USER_ADDRESS_SUCCESS,
  ADD_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  ADD_USER_ADDRESS_FAILED,
  UPDATE_USER_ADDRESS_FAILED,
  USER_ADDRESS_VALIDATION_FAILED,
} from '@shopgate/user/constants/ActionTypes';
import reducer from './addressBook';

jest.mock('@shopgate/user/config', () => ({
  splitDefaultAddressesByTags: ['shipping', 'billing'],
  addressFields: ['firstName', 'lastName', 'phone'], // TODO: update the test to match the new config
  countryCodes: 'DE',
}));

describe('AddressBook reducers', () => {
  it('Should reduce USER_ADDRESSES_RECEIVED', () => {
    const action = {
      type: USER_ADDRESSES_RECEIVED,
      // eslint-disable-next-line extra-rules/no-single-line-objects
      addresses: [{ id: 123, tags: ['default_shipping'] }],
    };
    const expectedState = {
      // eslint-disable-next-line extra-rules/no-single-line-objects
      addresses: [{ id: 123, tags: ['default_shipping'] }],
      default: {
        billing: null,
        shipping: 123,
      },
    };
    expect(reducer({}, action)).toEqual(expectedState);
  });

  it('Should reduce SET_DEFAULT_ADDRESS', () => {
    const action = {
      type: SET_DEFAULT_ADDRESS,
      addressId: 123,
      tag: 'shipping',
    };
    const expectedState = {
      default: {
        shipping: 123,
      },
    };
    expect(reducer({}, action)).toEqual(expectedState);
  });

  it('Should reduce ADD_USER_ADDRESS_SUCCESS', () => {
    const state = {
      // eslint-disable-next-line extra-rules/no-single-line-objects
      addresses: [{ id: 321, name: 'Address 321' }],
      default: {
        shipping: 321,
      },
    };
    const action = {
      type: ADD_USER_ADDRESS_SUCCESS,
      address: {
        id: 123,
        name: 'Address 123',
        tags: ['default_shipping'],
      },
    };
    const expectedState = {
      // eslint-disable-next-line extra-rules/no-single-line-objects
      addresses: [{ id: 321, name: 'Address 321' }, { id: 123, name: 'Address 123', tags: ['default_shipping'] }],
      default: {
        shipping: 123,
      },
      busy: false,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('Should reduce UPDATE_USER_ADDRESS_SUCCESS', () => {
    const state = {
      // eslint-disable-next-line extra-rules/no-single-line-objects
      addresses: [{ id: 123, name: 'Address 123' }, { id: 321, name: 'Address 321' }],
    };
    const action = {
      type: UPDATE_USER_ADDRESS_SUCCESS,
      address: {
        id: 123,
        name: 'New Address 123',
      },
    };
    const expectedState = {
      busy: false,
      // eslint-disable-next-line extra-rules/no-single-line-objects
      addresses: [{ id: 123, name: 'New Address 123' }, { id: 321, name: 'Address 321' }],
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('Should reduce ADD_USER_ADDRESS/UPDATE_USER_ADDRESS', () => {
    const action = {
      type: ADD_USER_ADDRESS,
    };
    const expectedState = {
      busy: true,
      validationErrors: [],
    };
    expect(reducer({}, action)).toEqual(expectedState);
    // eslint-disable-next-line extra-rules/no-single-line-objects
    expect(reducer({}, { type: UPDATE_USER_ADDRESS, ...action })).toEqual(expectedState);
  });

  it('Should reduce ADD_USER_ADDRESS_FAILED/UPDATE_USER_ADDRESS_FAILED/USER_ADDRESS_VALIDATION_FAILED', () => {
    const action = {
      type: ADD_USER_ADDRESS_FAILED,
      error: {
        // eslint-disable-next-line extra-rules/no-single-line-objects
        validationErrors: [{ path: 'path', message: 'message' }],
      },
    };
    const expectedState = {
      busy: false,
      // eslint-disable-next-line extra-rules/no-single-line-objects
      validationErrors: [{ path: 'path', message: 'message' }],
    };
    expect(reducer({}, action)).toEqual(expectedState);
    // eslint-disable-next-line extra-rules/no-single-line-objects
    expect(reducer({}, { type: UPDATE_USER_ADDRESS_FAILED, ...action })).toEqual(expectedState);
    // eslint-disable-next-line extra-rules/no-single-line-objects
    expect(reducer({}, { type: USER_ADDRESS_VALIDATION_FAILED, ...action })).toEqual(expectedState);
  });

  it('Should reduce SUCCESS_LOGOUT', () => {
    const action = {
      type: SUCCESS_LOGOUT,
    };
    // eslint-disable-next-line extra-rules/no-single-line-objects
    expect(reducer({ addresses: [], default: {} }, action)).toEqual({});
  });
});
