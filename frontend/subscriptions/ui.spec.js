import subscription from './ui';

// Create action mocks.
let mockToggleNavigatorCart;
let mockToggleNavigatorSearch;
let mockSetViewLoading;
let mockUnsetViewLoading;
jest.mock('../action-creators/addressBook', () => ({
  toggleNavigatorCart: (...args) => mockToggleNavigatorCart(...args),
  toggleNavigatorSearch: (...args) => mockToggleNavigatorSearch(...args),
}));
jest.mock('@shopgate/pwa-common/actions/view/setViewLoading', () => pathname => mockSetViewLoading(pathname));
jest.mock('@shopgate/pwa-common/actions/view/unsetViewLoading', () => pathname => mockUnsetViewLoading(pathname));
jest.mock('@shopgate/pwa-common/selectors/history', () => ({
  getHistoryPathname: () => '/user',
}));

describe('UI subscriptions', () => {
  const subscribe = jest.fn();
  subscription(subscribe);

  const [
    fullPageViewEnter$,
    fullPageViewLeave$,
    viewIsLoading$,
    viewIsIdle$,
  ] = subscribe.mock.calls;

  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
    mockToggleNavigatorCart = jest.fn();
    mockToggleNavigatorSearch = jest.fn();
    mockSetViewLoading = jest.fn();
    mockUnsetViewLoading = jest.fn();
  });

  it('should subscribe to the streams', () => {
    expect(subscribe.mock.calls.length).toEqual(4);
  });

  it('should toggle navigator controls when route is entered', () => {
    fullPageViewEnter$[1]({ dispatch });
    expect(mockToggleNavigatorCart).toHaveBeenCalledWith(false);
    expect(mockToggleNavigatorSearch).toHaveBeenCalledWith(false);

    fullPageViewLeave$[1]({ dispatch });
    expect(mockToggleNavigatorCart).toHaveBeenCalledWith(true);
    expect(mockToggleNavigatorSearch).toHaveBeenCalledWith(true);
  });

  it('should set view as loading', () => {
    // eslint-disable-next-line extra-rules/no-single-line-objects
    viewIsLoading$[1]({ dispatch, getState: () => {} });
    expect(mockSetViewLoading).toHaveBeenCalledWith('/user');
  });

  it('should unset view as loading', () => {
    // eslint-disable-next-line extra-rules/no-single-line-objects
    viewIsIdle$[1]({ dispatch, getState: () => {} });
    expect(mockUnsetViewLoading).toHaveBeenCalledWith('/user');
  });
});
