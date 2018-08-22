import subscription from './user';

// Create action mocks.
let mockGetUser;
let mockCreateToast;
let mockSuccessLogin;
jest.mock('@shopgate/pwa-common/actions/user/getUser', () => () => mockGetUser());
jest.mock('@shopgate/pwa-common/actions/toast/createToast', () => options => mockCreateToast(options));
jest.mock('@shopgate/pwa-common/selectors/history', () => ({
  getHistoryPathname: () => '/user',
  getRedirectLocation: () => null,
}));
jest.mock('@shopgate/pwa-common/action-creators/user', () => ({
  successLogin: () => mockSuccessLogin(),
}));

describe('User subscriptions', () => {
  const subscribe = jest.fn();
  subscription(subscribe);

  const [
    fetchUser$,
    registerAndDataReceived$,
    userUpdateSuccess$,
  ] = subscribe.mock.calls;

  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
    mockGetUser = jest.fn();
    mockCreateToast = jest.fn();
    mockSuccessLogin = jest.fn();
  });

  it('should subscribe to the streams', () => {
    expect(subscribe.mock.calls.length).toEqual(3);
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
    userUpdateSuccess$[1]({ dispatch, action: {} });
    expect(mockCreateToast).toHaveBeenCalledWith({ message: 'profile.updated' });
  });
});
