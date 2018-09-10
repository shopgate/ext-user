import {
  GET_ADDRESS_FIELDS,
  GET_ADDRESS_FIELDS_SUCCESS,
  GET_ADDRESS_FIELDS_FAILED,
} from '@shopgate/user/constants/ActionTypes';
import reducer from './addressForm';

describe('AddressForm reducer', () => {
  it('should have correct initial state', () => {
    expect(reducer(undefined, { type: '@INIT' })).toEqual({
      error: null,
      config: null,
      isFetching: false,
    })
  });

  it('isFetching should be set correctly', () => {
    // Successful
    let state = reducer(undefined, { type: GET_ADDRESS_FIELDS });
    expect(state.isFetching).toEqual(true);

    state = reducer(state, { type: GET_ADDRESS_FIELDS_SUCCESS });
    expect(state.isFetching).toEqual(false);

    // Failed
    state = reducer(undefined, { type: GET_ADDRESS_FIELDS });
    expect(state.isFetching).toEqual(true);

    state = reducer(state, { type: GET_ADDRESS_FIELDS_FAILED });
    expect(state.isFetching).toEqual(false);
  });

  it('error should be set correctly', () => {
    const state = reducer(undefined, { type: GET_ADDRESS_FIELDS_FAILED, error: 'foo' });
    expect(state.error).toEqual('foo');
  });

  it('config should be set correctly', () => {
    const state = reducer(undefined, { type: GET_ADDRESS_FIELDS_SUCCESS, config: { foo: 'bar' } });
    expect(state.config).toEqual({ foo: 'bar' });
  });
});
