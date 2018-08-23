import user from './user';
import addressBook from './addressBook';
import checkout from './checkout';
import ui from './ui';

const subscriptions = [
  user,
  addressBook,
  checkout,
  ui,
];

/**
 * User subscriptions.
 * @param {Function} subscribe The subscribe function.
 * @returns {void}
 */
export default subscribe => subscriptions.forEach(subscription => subscription(subscribe));
