import addressBook from './addressBook';
import checkout from './checkout';

const subscriptions = [
  addressBook,
  checkout,
];

/**
 * User subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default function user(subscribe) {
  // Subscribe user related subscriptions
  subscriptions.map(subscription => subscription(subscribe));
}
