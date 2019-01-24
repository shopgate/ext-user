import UrlPattern from 'url-pattern';

export const USER_REGISTER_PATH = '/register';
export const USER_PROFILE_PATH = '/user/profile';
export const USER_PASSWORD_PATH = '/user/password';
export const USER_ADDRESS_BOOK_PATH = '/user/addresses';
export const USER_ADDRESS_PATH = '/user/address/:id'; // For pwa 5 Router
export const USER_ADDRESS_PATH_START = '/user/address/'; // For pwa 5 Router

const userAddressPathPattern = new UrlPattern('/user/address(/:id)');

/**
 * Generate address uri
 * @param {UserAddress} address user address
 * @returns {string}
 */
export const addressUri = ({ id }) => userAddressPathPattern.stringify({
  id: encodeURIComponent(id),
});
