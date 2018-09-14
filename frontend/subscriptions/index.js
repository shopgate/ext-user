import user from './user';
import addressBook from './addressBook';
import checkout from './checkout';
import ui from './ui';
import config from './config';

const subscriptions = [
  user,
  addressBook,
  checkout,
  ui,
  config,
];

/**
 * User subscriptions.
 * @param {Function} subscribe The subscribe function.
 * @returns {void}
 */
export default subscribe => subscriptions.forEach(subscription => subscription(subscribe));
