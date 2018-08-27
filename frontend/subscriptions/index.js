import user from './user';
import addressBook from './addressBook';
import checkout from './checkout';
import addressForm from './addressForm';
import ui from './ui';

const subscriptions = [
  user,
  addressBook,
  addressForm,
  checkout,
  ui,
];

/**
 * User subscriptions.
 * @param {Function} subscribe The subscribe function.
 * @returns {void}
 */
export default subscribe => subscriptions.forEach(subscription => subscription(subscribe));
