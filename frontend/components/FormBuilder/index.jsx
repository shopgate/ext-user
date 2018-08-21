import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '@shopgate/user/constants/Portals';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import Select from '@shopgate/pwa-ui-shared/Form/Select';
import Checkbox from '@shopgate/pwa-ui-shared/Form/Checkbox';
import {
  ELEMENT_TYPE_EMAIL,
  ELEMENT_TYPE_PASSWORD,
  ELEMENT_TYPE_TEXT,
  ELEMENT_TYPE_TEXTAREA,
  ELEMENT_TYPE_NUMBER,
  ELEMENT_TYPE_SELECT,
  ELEMENT_TYPE_COUNTRY,
  ELEMENT_TYPE_PROVINCE,
  ELEMENT_TYPE_CHECKBOX,
  ELEMENT_TYPE_RADIO,
  ELEMENT_TYPE_DATE,
  ELEMENT_TYPE_PHONE,
} from './elementTypes';
import countries from './countries';

/**
 * @param {string} countryCode country
 * @return {Object}
 */
const provincesList = countryCode => countries[countryCode].divisions;

/**
 * Takes a form configuration and handles rendering and updates of the form fields
 */
class FormBuilder extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    config: PropTypes.shape().isRequired,
    handleUpdate: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
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

    // Build country element
    this.countriesList = Object.keys(countries).reduce((reducer, countryCode) => ({
      ...reducer,
      [countryCode]: countries[countryCode].name,
    }), {});
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

  /**
   * Takes the form and element ids of the element to be surrounded with portals
   * @param {string} formId The id of the form to be rendered
   * @param {string} elementId The id of the jsx element
   * @param {JSX} jsxElement The jsx element to place
   * @return {JSX}
   */
  surroundWithPortal = (formId, elementId, jsxElement) => {
    /**
     * Creates a portal name from the given strings
     * @param {string} prefix A formId in this context
     * @param {string} id The id of the element to be surrounded by the portals
     * @param {string} suffix Set to "before", "after" or empty depending on the context
     * @return {string}
     */
    const portalName = (prefix, id, suffix = null) => {
      /**
       * Takes a string and converts it to a part of a portal name
       * @param {string} s The string to be sanitized
       * @return {string}
       */
      function sanitize(s) {
        return s.replace(/[\\._]/, '-');
      }

      let name = `${portals.NAV_MENU}.${sanitize(formId)}.${sanitize(elementId)}`;
      if (suffix) {
        name += `.${sanitize(suffix)}`;
      }

      return name;
    };

    return (
      <Fragment>
        <Portal name={portalName(formId, elementId, portals.BEFORE)} />
        <Portal name={portalName(formId, elementId)}>
          {jsxElement}
        </Portal>
        <Portal name={portalName(formId, elementId, portals.AFTER)} />
      </Fragment>
    );
  };

  /**
   * Takes an element of any type and renders it, if the defined type is supported
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderElement = e => (
    <Fragment>
      { /* Each element renders itself, if the type matches */ }
      {this.renderEmailElement(e)}
      {this.renderPasswordElement(e)}
      {this.renderTextElement(e)}
      {this.renderTextareaElement(e)}
      {this.renderNumberElement(e)}
      {this.renderSelectElement(e)}
      {this.renderCountryElement(e)}
      {this.renderProvinceElement(e)}
      {this.renderCheckboxElement(e)}
      {this.renderRadioElement(e)}
      {this.renderDateElement(e)}
      {this.renderPhoneElement(e)}
    </Fragment>
  );

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderEmailElement = e => (
    (e.type === ELEMENT_TYPE_EMAIL && this.surroundWithPortal(
      this.props.id,
      e.id,
      { /* TODO */ }
    ))
    || null
  );

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderPasswordElement = e => (
    (e.type === ELEMENT_TYPE_PASSWORD && this.surroundWithPortal(
      this.props.id,
      e.id,
      { /* TODO */ }
    ))
    || null
  );

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderTextElement = e => (
    (e.type === ELEMENT_TYPE_TEXT && this.surroundWithPortal(
      this.props.id,
      e.id,
      <TextField
        name={`${this.props.id}.${e.id}`}
        className={this.props.className}
        label={e.label}
        onChange={e.handleChange}
        value={this.state.formData[e.id]}
        errorText={this.state.errors[e.id]}
      />
    ))
    || null
  );

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderTextareaElement = e => (
    (e.type === ELEMENT_TYPE_TEXTAREA && this.surroundWithPortal(
      this.props.id,
      e.id,
      { /* TODO */ }
    ))
    || null
  );

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderNumberElement = e => (
    (e.type === ELEMENT_TYPE_NUMBER && this.surroundWithPortal(
      this.props.id,
      e.id,
      { /* TODO */ }
    ))
    || null
  );

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderSelectElement = e => (
    (e.type === ELEMENT_TYPE_SELECT && this.surroundWithPortal(
      this.props.id,
      e.id,
      <Select
        name={`${this.props.id}.${e.id}`}
        className={this.props.className}
        label={e.label}
        placeholder={`${this.props.id}.${e.placeholder}`}
        options={e.options}
        value={this.state.formData[e.id]}
        onChange={e.handleChange}
        errorText={this.state.errors[e.id]}
      />
    ))
    || null
  );

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderCountryElement = e => (
    (e.type === ELEMENT_TYPE_COUNTRY && this.surroundWithPortal(
      this.props.id,
      e.id,
      <Select
        name={`${this.props.id}.${e.id}`}
        className={this.props.className}
        label={e.label}
        placeholder={e.placeholder}
        options={this.countriesList}
        value={this.state.formData[e.id] || Object.keys(this.countriesList)[0]}
        onChange={e.handleChange}
        errorText={this.state.errors[e.id]}
      />
    ))
    || null
  );

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderProvinceElement = e => (
    (e.type === ELEMENT_TYPE_PROVINCE && this.surroundWithPortal(
      this.props.id,
      e.id,
      <Select
        name={`${this.props.id}.${e.id}`}
        className={this.props.className}
        label={e.label}
        placeholder={e.placeholder}
        options={this.state.formData.country && provincesList(this.state.formData.country)}
        value={this.state.formData[e.id] || (
          this.state.formData.country &&
          Object.keys(provincesList(this.state.formData.country))[0]
        )}
        onChange={e.handleChange}
        errorText={this.state.errors[e.id]}
      />
    ))
    || null
  );

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderCheckboxElement = e => (
    (e.type === ELEMENT_TYPE_CHECKBOX && this.surroundWithPortal(
      this.props.id,
      e.id,
      <Checkbox
        name={`${this.props.id}.${e.id}`}
        className={this.props.className}
        label={e.label}
        key={this.state.formData[e.id]}
        onChange={e.handleChange}
      />
    ))
    || null
  );

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderRadioElement = e => (
    (e.type === ELEMENT_TYPE_RADIO && this.surroundWithPortal(
      this.props.id,
      e.id,
      { /* TODO */ }
    ))
    || null
  );

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderDateElement = e => (
    (e.type === ELEMENT_TYPE_DATE && this.surroundWithPortal(
      this.props.id,
      e.id,
      { /* TODO */ }
    ))
    || null
  );

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} e The data of the element to be rendered
   * @returns {JSX}
   */
  renderPhoneElement = e => (
    (e.type === ELEMENT_TYPE_PHONE && this.surroundWithPortal(
      this.props.id,
      e.id,
      { /* TODO */ }
    ))
    || null
  );

  /**
   * Renders the component based on the given config
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
