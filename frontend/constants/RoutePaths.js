import UrlPattern from 'url-pattern';

export const USER_ADDRESS_BOOK_PATH = '/user/addresses';
export const USER_ADDRESS_PATH = '/user/address/:id'; // For Route

/**
 * Get url pattern for user address
 * @return {UrlPattern}
 */
export const userAddressPathPattern = new UrlPattern('/user/address(/:id)');
