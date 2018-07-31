import addressBook from './addressBook';

const subscriptions = [
  addressBook,
];

/**
 * User subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default function user(subscribe) {
  // Subscribe user related subscriptions
  subscriptions.map(subscription => subscription(subscribe));
}
