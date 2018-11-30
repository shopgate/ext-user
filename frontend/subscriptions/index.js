import user from './user';
import addressBook from './addressBook';
import ui from './ui';
import config from './config';

const subscriptions = [
  user,
  addressBook,
  // @REFACTOR checkout,
  ui,
  config,
];

/**
 * User subscriptions.
 * @param {Function} subscribe The subscribe function.
 * @returns {void}
 */
export default subscribe => subscriptions.forEach(subscription => subscription(subscribe));
