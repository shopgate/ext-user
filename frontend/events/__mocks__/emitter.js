import EventEmitter from 'events';

/**
 * Mock version of Emitter
 */
class UserEventEmitter extends EventEmitter {
  /**
   * @inheritDoc
   */
  on(event, listener) {
    this.addListener(event, listener);
    return this;
  }

  /**
   * @inheritDoc
   */
  off(event, listener) {
    this.removeListener(event, listener);
    return this;
  }
}

export default new UserEventEmitter();
