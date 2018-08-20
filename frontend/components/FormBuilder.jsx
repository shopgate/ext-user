import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import Button from '@shopgate/pwa-ui-shared/Button';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import Select from '@shopgate/pwa-ui-shared/Form/Select';
import Checkbox from '@shopgate/pwa-ui-shared/Form/Checkbox';
import * as portals from '@shopgate/user/constants/Portals';

/**
 * Takes a form configuration and handles
 */
class FormBuilder extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    config: PropTypes.shape().isRequired,
    handleUpdate: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    defaults: PropTypes.shape(),
  }

  static defaultProps = {
    defaults: {},
  }

  /**
   * Initializes the component.
   * @param {Object} props The components props.
   */
  constructor(props) {
    super(props);

    this.state.formData = this.props.defaults;

    this.formElements = this.buildFormElements(this.props.config, this.props.locale);
  }

  /**
   * Takes a list of which elements to render based on the respective element type
   * @param {Object} formConfig Configuration of which form fields to render
   * @param {string} locale The app's current locale setting
   * @return {Object[]}
   */
  buildFormElements(formConfig, locale) {
    const elementList = [];

    // Add all non-custom attributes and mark them as such
    Object.getOwnPropertyNames(formConfig.fields).forEach((id) => {
      if (id !== 'customAttributes') {
        const field = {
          id,
          ...formConfig.fields[id],
          custom: false,
        };
        elementList.push(field);
      }
    });

    // Add custom attributes to the list
    if (formConfig.fields.customAttributes) {
      Object.getOwnPropertyNames(formConfig.fields.customAttributes).forEach((id) => {
        const field = {
          id,
          ...formConfig.fields.customAttributes[id],
          custom: true,
        };
        elementList.push(field);
      });
    }

    // Generate handler functions for each element
    elementList.map(element => ({
      ...element,
      handleChange: (value) => {
        const newState = { ...this.state.formData };
        newState[element.id] = value;
        this.setState(newState);

        this.props.handleUpdate(this.state.formData);
      },
    }));

    // Add translation strings to the form elements, where te've been assigned by config
    if (locale) {
      // TODO: fill up with translation here using "locale" parameter
      // TODO: Make sure to fall back to defaults if possible
    }

    // Sort the fields by sortOrder property and return the full list
    return elementList.sort((element1, element2) => {
      // Keep relative sort order when no specific sort order was set for both
      if (element2.sortOrder === undefined) {
        return -1;
      } else if (element1.sortOrder === undefined) {
        return 1;
      }

      // Sort in ascending order of sortOrder otherwise
      return element1.sortOrder - element2.sortOrder;
    });
  }

  renderElement = (/* element */) => {
    return (
      <Fragment>
        {/* Nothing to render, yet */}
      </Fragment>
    );
  }

  /**
   * Renders
   * @return {JSX}
   */
  render() {
    return (
      <Fragment>
        <div className={this.props.className}>
          {this.formElements.forEach(element => this.renderElement(element))}
        </div>
      </Fragment>
    );
  }
}

export default FormBuilder;
