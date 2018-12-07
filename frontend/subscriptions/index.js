import user from './user';
import addressBook from './addressBook';
import ui from './ui';
import config from './config';
import route from './route';

const subscriptions = [
  user,
  addressBook,
  // @REFACTOR checkout,
  ui,
  config,
  route,
];

/**
 * User subscriptions.
 * @param {Function} subscribe The subscribe function.
 * @returns {void}
 */
export default subscribe => subscriptions.forEach(subscription => subscription(subscribe));
