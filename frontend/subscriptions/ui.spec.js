import subscription from './ui';

// Create action mocks.
let mockToggleNavigatorCart;
let mockToggleNavigatorSearch;
let mockSetUserViewIsLoading;
jest.mock('../action-creators/ui', () => ({
  toggleNavigatorCart: (...args) => mockToggleNavigatorCart(...args),
  toggleNavigatorSearch: (...args) => mockToggleNavigatorSearch(...args),
  setUserViewIsLoading: (...args) => mockSetUserViewIsLoading(...args),
}));
jest.mock('@shopgate/pwa-common/helpers/router', () => ({
  getCurrentRoute: () => ({ pattern: '/user/addresses' }),
}));

let mockSetLoading;
let mockUnsetLoading;
jest.mock('@shopgate/pwa-common/providers', () => ({
  LoadingProvider: {
    setLoading: (...args) => mockSetLoading(...args),
    unsetLoading: (...args) => mockUnsetLoading(...args),
  },
}));
jest.mock('../selectors/ui', () => ({
  getLoadingViewPathName: () => '/user/addresses',
}));

describe('UI subscriptions', () => {
  const subscribe = jest.fn();
  subscription(subscribe);

  // Skip first 6 Event subscriptions
  const [
    fullPageViewLeave$,
    fullPageViewEnter$,
    viewIsLoading$,
    viewIsIdle$,
  ] = subscribe.mock.calls;

  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
    mockToggleNavigatorCart = jest.fn();
    mockToggleNavigatorSearch = jest.fn();
    mockSetUserViewIsLoading = jest.fn();
    mockSetLoading = jest.fn();
    mockUnsetLoading = jest.fn();
  });

  it('should subscribe to the streams', () => {
    expect(subscribe.mock.calls.length).toEqual(4);
  });

  it('should toggle navigator controls when route is leaved', () => {
    fullPageViewLeave$[1]({ dispatch });
    expect(mockToggleNavigatorCart).toHaveBeenCalledWith(true);
    expect(mockToggleNavigatorSearch).toHaveBeenCalledWith(true);
  });

  it('should toggle navigator controls when route is entered', () => {
    fullPageViewEnter$[1]({ dispatch });
    expect(mockToggleNavigatorCart).toHaveBeenCalledWith(false);
    expect(mockToggleNavigatorSearch).toHaveBeenCalledWith(false);
  });

  it('should set view as loading', () => {
    // eslint-disable-next-line extra-rules/no-single-line-objects
    viewIsLoading$[1]({ dispatch, getState: () => {} });
    expect(mockSetUserViewIsLoading).toHaveBeenCalledWith('/user/addresses');
    expect(mockSetLoading).toHaveBeenCalledWith('/user/addresses');
  });

  it('should unset view as loading', () => {
    // eslint-disable-next-line extra-rules/no-single-line-objects
    viewIsIdle$[1]({ dispatch, getState: () => {} });
    expect(mockUnsetLoading).toHaveBeenCalledWith('/user/addresses');
  });
});
