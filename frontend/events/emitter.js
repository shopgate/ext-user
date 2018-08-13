import EventEmitter from 'events';
import { logger } from '@shopgate/pwa-core/helpers';

/**
 * User event emitter
 */
class UserEventEmitter extends EventEmitter {
  /**
   * @inheritDoc
   */
  on(event, listener) {
    this.addListener(event, listener);
    logger.log(`%cUserEventEmitter: %c${event}: ${this.listenerCount(event)}`, 'color: green', 'color: black');
    return this;
  }

  /**
   * @inheritDoc
   */
  off(event, listener) {
    this.removeListener(event, listener);
    logger.log(`%cUserEventEmitter: %c${event}: ${this.listenerCount(event)}`, 'color: green', 'color: black');
    return this;
  }

  /**
   *
   * @inheritDoc
   */
  emit(event, ...args) {
    logger.log(`event %c${event} dispatched to ${this.listenerCount(event)} listeners`, 'font-weight: bold');
    return super.emit(event, args);
  }
}

export default new UserEventEmitter();
