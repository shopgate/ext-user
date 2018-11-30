import subscription from './user';

// Create action mocks.
let mockGetUser;
let mockSuccessLogin;
jest.mock('@shopgate/pwa-common/actions/user/getUser', () => () => mockGetUser());
jest.mock('@shopgate/pwa-common/action-creators/user', () => ({
  successLogin: () => mockSuccessLogin(),
}));
jest.mock('@shopgate/pwa-common/helpers/router', () => ({
  getCurrentRoute: () => ({ pattern: '/login' }),
}));

describe('User subscriptions', () => {
  const subscribe = jest.fn();
  subscription(subscribe);

  const [
    fetchUser$,
    registerAndDataReceived$,
    userUpdateSuccess$,
    userUpdateFailed$,
  ] = subscribe.mock.calls;

  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
    mockGetUser = jest.fn();
    mockSuccessLogin = jest.fn();
  });

  it('should subscribe to the streams', () => {
    expect(subscribe.mock.calls.length).toEqual(4);
  });

  it('should get user on fetchUser$ stream', () => {
    fetchUser$[1]({ dispatch });
    expect(mockGetUser).toHaveBeenCalledTimes(1);
  });

  it('should trigger success login on registerAndDataReceived$ stream', () => {
    // eslint-disable-next-line extra-rules/no-single-line-objects
    registerAndDataReceived$[1]({ dispatch, getState: () => {} });
    expect(mockSuccessLogin).toHaveBeenCalledTimes(1);
  });

  it('should create toast on userUpdateSuccess$ stream', () => {
    const events = jest.fn();
    events.emit = jest.fn();
    // noinspection JSCheckFunctionSignatures
    jest.spyOn(events, 'emit');

    // eslint-disable-next-line extra-rules/no-single-line-objects
    userUpdateSuccess$[1]({ dispatch, action: {}, events });
    expect(events.emit).toHaveBeenCalledWith('toast_add', {
      id: 'profile.updated',
      message: 'profile.updated',
    });
  });

  it('should create toast on userUpdateSuccess$ stream', () => {
    const events = jest.fn();
    events.emit = jest.fn();
    // noinspection JSCheckFunctionSignatures
    jest.spyOn(events, 'emit');

    // eslint-disable-next-line extra-rules/no-single-line-objects
    userUpdateFailed$[1]({ dispatch, action: { error: {} }, events });
    expect(events.emit).toHaveBeenCalledWith('toast_add', {
      id: 'profile.failed',
      message: 'profile.failed',
    });
  });
});
