import React, { Component } from 'react';
import EventEmitter from '@shopgate/user/events/emitter';
import I18n from '@shopgate/pwa-common/components/I18n';
import ActionButton from '@shopgate/pwa-ui-shared/ActionButton';
import {
  NAVIGATOR_SAVE_BUTTON_CLICK,
  NAVIGATOR_SAVE_BUTTON_ENABLE,
  NAVIGATOR_SAVE_BUTTON_DISABLE,
  NAVIGATOR_SAVE_BUTTON_SHOW,
  NAVIGATOR_SAVE_BUTTON_HIDE,
} from '@shopgate/user/constants/EventTypes';

/**
 * Navigator save button for AddressForm
 */
export class NavigatorSaveButton extends Component {
  /**
   * Initializes the component.
   * @param {Object} props The components props.
   */
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      hidden: true,
    };
  }

  /**
   * Did mount
   */
  componentDidMount() {
    EventEmitter.on(NAVIGATOR_SAVE_BUTTON_SHOW, this.handleShow);
    EventEmitter.on(NAVIGATOR_SAVE_BUTTON_HIDE, this.handleHide);
    EventEmitter.on(NAVIGATOR_SAVE_BUTTON_DISABLE, this.handleDisable);
    EventEmitter.on(NAVIGATOR_SAVE_BUTTON_ENABLE, this.handleEnable);
  }

  /**
   * Will unmount
   */
  componentWillUnmount() {
    EventEmitter.off(NAVIGATOR_SAVE_BUTTON_SHOW, this.handleShow);
    EventEmitter.off(NAVIGATOR_SAVE_BUTTON_HIDE, this.handleHide);
    EventEmitter.off(NAVIGATOR_SAVE_BUTTON_DISABLE, this.handleDisable);
    EventEmitter.off(NAVIGATOR_SAVE_BUTTON_ENABLE, this.handleEnable);
  }

  /**
   * Show button
   */
  handleShow = () => {
    this.setState({ hidden: false });
  }

  /**
   * Hide button
   */
  handleHide = () => {
    this.setState({ hidden: true });
  }

  /**
   * Disable button
   */
  handleDisable = () => {
    this.setState({ disabled: true });
  }

  /**
   * Enable button
   */
  handleEnable = () => {
    this.setState({ disabled: false });
  }

  handleClick = () => {
    EventEmitter.emit(NAVIGATOR_SAVE_BUTTON_CLICK);
  }

  /**
   * @return {JSX}
   */
  render() {
    const { disabled, hidden } = this.state;
    if (hidden) {
      return null;
    }

    return (
      <ActionButton
        onClick={this.handleClick}
        disabled={disabled}
        testId="saveAddressButton"
      >
        <I18n.Text string="navigator.save" />
      </ActionButton>
    );
  }
}

export default NavigatorSaveButton;
