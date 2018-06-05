import { main$ } from '@shopgate/pwa-common/streams/main';

export const registerSuccess$ = main$.filter(({ action }) => action.type === 'REGISTER_SUCCESS');
export const registerFailed$ = main$.filter(({ action }) => action.type === 'REGISTER_FAIL');
