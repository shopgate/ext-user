import React, { Component, Fragment } from 'react';
import I18n from '@shopgate/pwa-common/components/I18n';
import ActionButton from '@shopgate/pwa-ui-shared/ActionButton';
import EventEmitter from '../../events/emitter';
import {
  NAVIGATOR_SAVE_BUTTON_CLICK,
  NAVIGATOR_SAVE_BUTTON_ENABLE,
  NAVIGATOR_SAVE_BUTTON_DISABLE,
  NAVIGATOR_SAVE_BUTTON_SHOW,
  NAVIGATOR_SAVE_BUTTON_HIDE,
  NAVIGATOR_CHANGE_PASSWORD_BUTTON_CLICK,
  NAVIGATOR_CHANGE_PASSWORD_BUTTON_ENABLE,
  NAVIGATOR_CHANGE_PASSWORD_BUTTON_DISABLE,
  NAVIGATOR_CHANGE_PASSWORD_BUTTON_SHOW,
  NAVIGATOR_CHANGE_PASSWORD_BUTTON_HIDE,
} from '../../constants/EventTypes';

const BUTTON_SAVE = 'save';
const BUTTON_CHANGE_PASSWORD = 'changePassword';

/**
 * Navigator save button for AddressForm
 */
export class NavigatorButtons extends Component {
  /**
   * Initializes the component.
   * @param {Object} props The components props.
   */
  constructor(props) {
    super(props);

    this.state = {
      [`${BUTTON_SAVE}_disabled`]: true,
      [`${BUTTON_SAVE}_hidden`]: true,
      [`${BUTTON_CHANGE_PASSWORD}_disabled`]: true,
      [`${BUTTON_CHANGE_PASSWORD}_hidden`]: true,
    };
  }

  /**
   * Did mount
   */
  componentDidMount() {
    EventEmitter.on(
      NAVIGATOR_SAVE_BUTTON_SHOW,
      this.handleShowFor(BUTTON_SAVE)
    );
    EventEmitter.on(
      NAVIGATOR_SAVE_BUTTON_HIDE,
      this.handleHideFor(BUTTON_SAVE)
    );
    EventEmitter.on(
      NAVIGATOR_SAVE_BUTTON_DISABLE,
      this.handleDisableFor(BUTTON_SAVE)
    );
    EventEmitter.on(
      NAVIGATOR_SAVE_BUTTON_ENABLE,
      this.handleEnableFor(BUTTON_SAVE)
    );
    EventEmitter.on(
      NAVIGATOR_CHANGE_PASSWORD_BUTTON_SHOW,
      this.handleShowFor(BUTTON_CHANGE_PASSWORD)
    );
    EventEmitter.on(
      NAVIGATOR_CHANGE_PASSWORD_BUTTON_HIDE,
      this.handleHideFor(BUTTON_CHANGE_PASSWORD)
    );
    EventEmitter.on(
      NAVIGATOR_CHANGE_PASSWORD_BUTTON_DISABLE,
      this.handleDisableFor(BUTTON_CHANGE_PASSWORD)
    );
    EventEmitter.on(
      NAVIGATOR_CHANGE_PASSWORD_BUTTON_ENABLE,
      this.handleEnableFor(BUTTON_CHANGE_PASSWORD)
    );
  }

  /**
   * Will unmount
   */
  componentWillUnmount() {
    EventEmitter.off(
      NAVIGATOR_SAVE_BUTTON_SHOW,
      this.handleShowFor(BUTTON_SAVE)
    );
    EventEmitter.off(
      NAVIGATOR_SAVE_BUTTON_HIDE,
      this.handleHideFor(BUTTON_SAVE)
    );
    EventEmitter.off(
      NAVIGATOR_SAVE_BUTTON_DISABLE,
      this.handleDisableFor(BUTTON_SAVE)
    );
    EventEmitter.off(
      NAVIGATOR_SAVE_BUTTON_ENABLE,
      this.handleEnableFor(BUTTON_SAVE)
    );
    EventEmitter.off(
      NAVIGATOR_CHANGE_PASSWORD_BUTTON_SHOW,
      this.handleShowFor(BUTTON_CHANGE_PASSWORD)
    );
    EventEmitter.off(
      NAVIGATOR_CHANGE_PASSWORD_BUTTON_HIDE,
      this.handleHideFor(BUTTON_CHANGE_PASSWORD)
    );
    EventEmitter.off(
      NAVIGATOR_CHANGE_PASSWORD_BUTTON_DISABLE,
      this.handleDisableFor(BUTTON_CHANGE_PASSWORD)
    );
    EventEmitter.off(
      NAVIGATOR_CHANGE_PASSWORD_BUTTON_ENABLE,
      this.handleEnableFor(BUTTON_CHANGE_PASSWORD)
    );
  }

  /**
   * Maps button state and saves it into the component state. Designed to work similar to setState.
   * @param {string} buttonName The button to which this field should be assigned to.
   * @param {Object} obj The state of the button to set
   */
  setButtonState = (buttonName, obj) => {
    this.setState(Object.keys(obj).reduce((accumulator, key) => ({
      ...accumulator,
      [`${buttonName}_${key}`]: obj[key],
    }), {}));
  }

  /**
   * Returns a natural button state object.
   * @param {string} buttonName The button to which the state should be returned
   * @returns {Object}
   */
  getButtonState = buttonName => (
    Object.keys(this.state).reduce((accumulator, cur) => {
      const keys = cur.split('_');
      if (buttonName === keys[0]) {
        return {
          ...accumulator,
          [keys[1]]: this.state[cur],
        };
      }

      return accumulator;
    }, {})
  )

  /**
   * Show button
   * @param {string} buttonName Defines which button to address
   * @returns {function}
   */
  handleShowFor = buttonName => () => {
    this.setButtonState(buttonName, { hidden: false });
  }

  /**
   * Hide button
   * @param {string} buttonName Defines which button to address
   * @returns {function}
   */
  handleHideFor = buttonName => () => {
    this.setButtonState(buttonName, { hidden: true });
  }

  /**
   * Disable button
   * @param {string} buttonName Defines which button to address
   * @returns {function}
   */
  handleDisableFor = buttonName => () => {
    this.setButtonState(buttonName, { disabled: true });
  }

  /**
   * Enable button
   * @param {string} buttonName Defines which button to address
   * @returns {function}
   */
  handleEnableFor = buttonName => () => {
    this.setButtonState(buttonName, { disabled: false });
  }

  /**
   * @param {string} buttonClickEvent Defines the event depending on which button has been clicked.
   * @returns {function}
   */
  handleClickFor = buttonClickEvent => () => {
    EventEmitter.emit(buttonClickEvent);
  }

  /**
   * @return {JSX}
   */
  render() {
    const saveButton = this.getButtonState(BUTTON_SAVE);
    const changePasswordButton = this.getButtonState(BUTTON_CHANGE_PASSWORD);

    if (saveButton.hidden && changePasswordButton.hidden) {
      return null;
    }

    return (
      <Fragment>
        {!saveButton.hidden &&
          <ActionButton
            onClick={this.handleClickFor(NAVIGATOR_SAVE_BUTTON_CLICK)}
            disabled={saveButton.disabled}
            testId="saveAddressButton"
          >
            <I18n.Text string="navigator.save" />
          </ActionButton>
        }

        { // Avoid showing the change password button, if the save button is still visible
          !changePasswordButton.hidden && saveButton.hidden &&
          <ActionButton
            onClick={this.handleClickFor(NAVIGATOR_CHANGE_PASSWORD_BUTTON_CLICK)}
            disabled={changePasswordButton.disabled}
            testId="changePasswordButton"
          >
            <I18n.Text string="navigator.changePassword" />
          </ActionButton>
        }
      </Fragment>
    );
  }
}

export default NavigatorButtons;
