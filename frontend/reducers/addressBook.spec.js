import { RECEIVE_USER, SUCCESS_LOGOUT } from '@shopgate/pwa-common/constants/ActionTypes';
import {
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
  splitDefaultAddressesByTags: ['default'],
  addressFields: ['firstName', 'lastName', 'phone'],
  countryCodes: 'DE',
}));

describe('AddressBook reducers', () => {
  it('Should reduce RECEIVE_USER', () => {
    const action = {
      type: RECEIVE_USER,
      user: { addresses: [{ id: 123, tags: ['default'] }] },
    };
    const expectedState = {
      addresses: [{ id: 123, tags: ['default'] }],
      default: {
        default: 123,
      },
    };
    expect(reducer({}, action)).toEqual(expectedState);
  });

  it('Should reduce SET_DEFAULT_ADDRESS', () => {
    const action = {
      type: SET_DEFAULT_ADDRESS,
      addressId: 123,
      tag: 'default',
    };
    const expectedState = {
      default: {
        default: 123,
      },
    };
    expect(reducer({}, action)).toEqual(expectedState);
  });

  it('Should reduce ADD_USER_ADDRESS_SUCCESS', () => {
    const state = {
      addresses: [{ id: 321, name: 'Address 321' }],
      default: {
        default: 321,
      },
    };
    const action = {
      type: ADD_USER_ADDRESS_SUCCESS,
      address: {
        id: 123,
        name: 'Address 123',
        tags: ['default'],
      },
    };
    const expectedState = {
      addresses: [{ id: 321, name: 'Address 321' }, { id: 123, name: 'Address 123', tags: ['default'] }],
      default: {
        default: 123,
      },
      busy: false,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('Should reduce UPDATE_USER_ADDRESS_SUCCESS', () => {
    const state = {
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
    expect(reducer({}, { type: UPDATE_USER_ADDRESS, ...action })).toEqual(expectedState);
  });

  it('Should reduce ADD_USER_ADDRESS_FAILED/UPDATE_USER_ADDRESS_FAILED/USER_ADDRESS_VALIDATION_FAILED', () => {
    const action = {
      type: ADD_USER_ADDRESS_FAILED,
      error: {
        validationErrors: [{ path: 'path', message: 'message' }],
      },
    };
    const expectedState = {
      busy: false,
      validationErrors: [{ path: 'path', message: 'message' }],
    };
    expect(reducer({}, action)).toEqual(expectedState);
    expect(reducer({}, { type: UPDATE_USER_ADDRESS_FAILED, ...action })).toEqual(expectedState);
    expect(reducer({}, { type: USER_ADDRESS_VALIDATION_FAILED, ...action })).toEqual(expectedState);
  });

  it('Should reduce SUCCESS_LOGOUT', () => {
    const action = {
      type: SUCCESS_LOGOUT,
    };
    expect(reducer({ addresses: [], default: {} }, action)).toEqual({});
  });
});
