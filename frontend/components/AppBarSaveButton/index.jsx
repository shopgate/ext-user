import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { UIEvents } from '@shopgate/pwa-core';
import I18n from '@shopgate/pwa-common/components/I18n';
import ActionButton from '@shopgate/pwa-ui-shared/ActionButton';
import * as event from '../../constants/EventTypes';

/**
 * App bar save button
 */
class AppBarSaveButton extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    testId: PropTypes.string,
  }

  static defaultProps = {
    label: 'navigator.save',
    testId: 'navigator.save.button',
  }

  /**
   * Initializes the component.
   * @param {Object} props The components props.
   */
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
    };
  }

  /**
   * Did mount
   */
  componentDidMount() {
    UIEvents.addListener(event.APP_BAR_SAVE_BUTTON_ENABLE, this.enable);
    UIEvents.addListener(event.APP_BAR_SAVE_BUTTON_DISABLE, this.disable);
  }

  /**
   * Unmount
   */
  componentWillUnmount() {
    UIEvents.removeAllListeners(event.APP_BAR_SAVE_BUTTON_ENABLE);
    UIEvents.removeAllListeners(event.APP_BAR_SAVE_BUTTON_DISABLE);
    UIEvents.removeAllListeners(event.APP_BAR_SAVE_BUTTON_CLICK);
  }

  /**
   * @returns {void}
   */
  enable = () => this.setState({ disabled: false })
  /**
   * @returns {void}
   */
  disable = () => this.setState({ disabled: true })

  /**
   * @returns {boolean}
   */
  click = () => UIEvents.emit(event.APP_BAR_SAVE_BUTTON_CLICK);

  /**
   * @return {JSX}
   */
  render() {
    return (
      <ActionButton
        onClick={this.click}
        disabled={this.state.disabled}
        testId={this.props.testId}
      >
        <I18n.Text string={this.props.label} />
      </ActionButton>
    );
  }
}

export default AppBarSaveButton;
