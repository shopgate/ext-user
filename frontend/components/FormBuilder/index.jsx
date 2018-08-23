import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '@shopgate/user/constants/Portals';
import Checkbox from '@shopgate/pwa-ui-shared/Form/Checkbox';
import {
  ELEMENT_TYPE_EMAIL,
  ELEMENT_TYPE_PASSWORD,
  ELEMENT_TYPE_NUMBER,
  ELEMENT_TYPE_COUNTRY,
  ELEMENT_TYPE_PROVINCE,
  ELEMENT_TYPE_CHECKBOX,
  ELEMENT_TYPE_RADIO,
  ELEMENT_TYPE_DATE,
  ELEMENT_TYPE_PHONE,
} from './elementTypes';
import TextElement from './components/TextElement';
import SelectElement from './components/SelectElement';
import CountryElement from './components/CountryElement';
import ProvinceElement from './components/ProvinceElement';
import countries from './countries';
import style from './style';

/**
 * Takes a form configuration and handles rendering and updates of the form fields.
 * Note: Only one country and one province element is supported per FormBuilder instance.
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

    // Prepare internal state
    this.state = {
      elementVisibility: {},
      formData: {},
      errors: {},
    };

    // Reorganize form elements into a strucure that can be easily rendered
    this.formElements = this.buildFormElements(this.props.config, this.props.locale);

    // Take only those defaults, that are actually represented by an element
    this.formDefaults = {};
    this.formElements.forEach((element) => {
      let defaultState = null;

      // Use default from element config as a base
      if (element.default !== undefined) {
        defaultState = element.default;
      }

      // Take defaults from "customAttributes" or from the higher level, depending on element config
      if (element.custom && this.props.defaults.customAttributes !== undefined) {
        if (this.props.defaults.customAttributes[element.id] !== undefined) {
          defaultState = this.props.defaults.customAttributes[element.id];
        }
      } else if (!element.custom && this.props.defaults[element.id] !== undefined) {
        defaultState = this.props.defaults[element.id];
      }

      // Save default into the form state and into defaults property if one was set
      if (defaultState !== undefined) {
        this.state.formData[element.id] = defaultState;
        this.formDefaults[element.id] = defaultState;
      }
    });

    // Build country list
    this.countryList = Object.keys(countries).reduce((reducer, countryCode) => ({
      ...reducer,
      [countryCode]: countries[countryCode].name,
    }), {});

    /**
     * @param {string} countryCode country
     * @return {Object}
     */
    this.getProvincesList = countryCode => countries[countryCode].divisions;

    // Init form element visibility
    // TODO: Replace by real visibility evaluation, based on given state object
    this.formElements.forEach((element) => {
      if (element.visible && element.visible.expression !== 'false') {
        this.state.elementVisibility[element.id] = true;
      }

      // Remove invisible elements from "formData" state
      if (!this.state.elementVisibility[element.id]
      && this.state.formData[element.id] !== undefined) {
        delete this.state.formData[element.id];
      }
    });
  }

  /**
   * Takes a list of which elements to render based on the respective element type
   * @param {Object} formConfig Configuration of which form fields to render
   * @param {string} locale The app's current locale setting
   * @return {Object[]}
   */
  buildFormElements(formConfig, locale) {
    let elementList = [];

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
    elementList = elementList.map(element => ({
      ...element,
      handleChange: (value) => {
        const newFormData = { ...this.state.formData };

        const newElementVisibility = { ...this.state.elementVisibility };
        // TODO: Re-evaluate element visibility // The following snippet is just prototype code
        if (element.type === ELEMENT_TYPE_COUNTRY) {
          const provinceElement = this.formElements.find(el => el.type === ELEMENT_TYPE_PROVINCE);
          newElementVisibility[provinceElement.id] = value !== 'DE';
        }

        // Remove state of elements that have become invisible
        Object.getOwnPropertyNames(newFormData).forEach((elementId) => {
          if (!this.state.elementVisibility[elementId]) {
            delete newFormData[elementId];
          }
        });

        // Handle province update when country changes
        if (element.type === ELEMENT_TYPE_COUNTRY && this.state.formData[element.type] !== value) {
          // Check if province element is even in the form config
          const provinceElement = this.formElements.find(el => el.type === ELEMENT_TYPE_PROVINCE);
          const countryElement = this.formElements.find(el => el.type === ELEMENT_TYPE_COUNTRY);
          if (provinceElement && newElementVisibility[provinceElement.id]) {
            // Overwrite province with the form's default, if country matches the default as well
            if (countryElement && value === this.formDefaults[countryElement.id]) {
              newFormData[provinceElement.id] = this.formDefaults[provinceElement.id];
            } else {
              // Update province to first or no selection, based on "required" attribute
              newFormData[provinceElement.id] = !provinceElement.required
                ? ''
                : Object.keys(this.getProvincesList(value))[0];
            }
          }
        }

        // Handle state internally
        newFormData[element.id] = value;
        this.setState({
          ...this.state,
          formData: newFormData,
          elementVisibility: newElementVisibility,
        });

        // Transform to external structure
        const updateData = {};
        this.formElements.forEach((el) => {
          if (el.custom) {
            if (updateData.customAttributes === undefined) {
              updateData.customAttributes = {};
            }
            updateData.customAttributes[el.id] = this.state.formData[el.id];
          } else {
            updateData[el.id] = this.state.formData[el.id];
          }
        });

        // Trigger the given update action
        this.props.handleUpdate(updateData);
      },
    }));

    // Add translation strings to the form elements, where te've been assigned by config
    if (locale) {
      // TODO: fill up with translation here using "locale" parameter
      // TODO: Make sure to fall back to defaults if possible
    }

    /**
     * Sorts the elements by "sortOrder" property
     *
     * @typedef {Object} FormElement
     * @property {number} sortOrder
     *
     * @param {FormElement} element1 First element
     * @param {FormElement} element2 Second element
     * @returns {number}
     */
    const sortFunc = (element1, element2) => {
      // Keep relative sort order when no specific sort order was set for both
      if (element2.sortOrder === undefined) {
        return -1;
      } else if (element1.sortOrder === undefined) {
        return 1;
      }

      // Sort in ascending order of sortOrder otherwise
      return element1.sortOrder - element2.sortOrder;
    };

    return elementList.sort(sortFunc);
  }

  /**
   * Takes an element of any type and renders it depending on type.
   * Also puts portals around the element.
   * @param {Object} elementData The data of the element to be rendered
   * @returns {JSX}
   */
  renderElement = (elementData) => {
    /**
     * Takes a string and converts it to a part to be used in a portal name
     * @param {string} s The string to be sanitized
     * @return {string}
     */
    function sanitize(s) {
      return s.replace(/[\\._]/, '-');
    }

    const elementKey = `${this.props.id}.${elementData.id}`;
    const portalName = `${portals.NAV_MENU}.${sanitize(this.props.id)}.${sanitize(elementData.id)}`;
    const elementName = `${this.props.id}.${elementData.id}`;
    const elementErrorText = this.state.errors[elementData.id] || '';
    const elementValue = this.state.formData[elementData.id] || '';
    const elementVisible = this.state.elementVisibility[elementData.id] || false;
    const countryElement = this.formElements.find(el => el.type === ELEMENT_TYPE_COUNTRY);

    return (
      <Fragment key={elementKey}>
        <Portal name={`${portalName}.${portals.BEFORE}`} />
        <Portal name={portalName}>
          {/* Each element renders itself, only if the type matches */}
          {this.renderEmailElement(elementData)}
          {this.renderPasswordElement(elementData)}
          <TextElement
            name={elementName}
            style={style.fields}
            element={elementData}
            errorText={elementErrorText}
            value={elementValue}
            visible={elementVisible}
          />
          {/* TODO:. this.renderNumberElement(elementData) */}
          <SelectElement
            name={elementName}
            style={style.fields}
            element={elementData}
            errorText={elementErrorText}
            value={elementValue}
            visible={elementVisible}
          />
          <CountryElement
            name={elementName}
            style={style.fields}
            element={elementData}
            errorText={elementErrorText}
            value={elementValue}
            visible={elementVisible}
            countryList={this.countryList}
          />
          <ProvinceElement
            name={elementName}
            style={style.fields}
            element={elementData}
            errorText={elementErrorText}
            value={elementValue}
            visible={elementVisible}
            provincesList={
              countryElement &&
              this.state.formData[countryElement.id] &&
              this.getProvincesList(this.state.formData[countryElement.id])
            }
          />
          {this.renderCheckboxElement(elementData)}
          {/* TODO:. this.renderRadioElement(elementData) */}
          {/* TODO:. this.renderDateElement(elementData) */}
          {/* TODO:. this.renderPhoneElement(elementData) */}
        </Portal>
        <Portal name={`${portalName}.${portals.AFTER}`} />
      </Fragment>
    );
  };

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} element The data of the element to be rendered
   * @returns {JSX}
   */
  renderEmailElement = (element) => {
    // Don't render element if type doesn't match or if the element is not visible
    if (element.type !== ELEMENT_TYPE_EMAIL || !this.state.elementVisibility[element.id]) {
      return null;
    }

    // TODO: Implement EMAIL element
    return (
      <div>--- EMAIL element ---</div>
    );
  };

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} element The data of the element to be rendered
   * @returns {JSX}
   */
  renderPasswordElement = (element) => {
    // Don't render element if type doesn't match or if the element is not visible
    if (element.type !== ELEMENT_TYPE_PASSWORD || !this.state.elementVisibility[element.id]) {
      return null;
    }

    // TODO: Implement PASSWORD element
    return (
      <div>--- PASSWORD element ---</div>
    );
  };

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} element The data of the element to be rendered
   * @returns {JSX}
   */
  renderNumberElement = (element) => {
    // Don't render element if type doesn't match or if the element is not visible
    if (element.type !== ELEMENT_TYPE_NUMBER || !this.state.elementVisibility[element.id]) {
      return null;
    }

    // TODO: Implement NUMBER element
    return (
      <div>--- NUMBER element ---</div>
    );
  };

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} element The data of the element to be rendered
   * @returns {JSX}
   */
  renderCheckboxElement = (element) => {
    // Don't render element if type doesn't match or if the element is not visible
    if (element.type !== ELEMENT_TYPE_CHECKBOX || !this.state.elementVisibility[element.id]) {
      return null;
    }

    return (
      <Checkbox
        name={`${this.props.id}.${element.id}`}
        className={style.fields}
        label={element.label}
        onChange={element.handleChange}
      />
    );
  };

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} element The data of the element to be rendered
   * @returns {JSX}
   */
  renderRadioElement = (element) => {
    // Don't render element if type doesn't match or if the element is not visible
    if (element.type !== ELEMENT_TYPE_RADIO || !this.state.elementVisibility[element.id]) {
      return null;
    }

    // TODO: Implement RADIO element
    return (
      <div>--- RADIO element ---</div>
    );
  };

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} element The data of the element to be rendered
   * @returns {JSX}
   */
  renderDateElement = (element) => {
    // Don't render element if type doesn't match or if the element is not visible
    if (element.type !== ELEMENT_TYPE_DATE || !this.state.elementVisibility[element.id]) {
      return null;
    }

    // TODO: Implement DATE element
    return (
      <div>--- DATE element ---</div>
    );
  };

  /**
   * Takes an element and renders it, if the type matches
   * @param {Object} element The data of the element to be rendered
   * @returns {JSX}
   */
  renderPhoneElement = (element) => {
    // Don't render element if type doesn't match or if the element is not visible
    if (element.type !== ELEMENT_TYPE_PHONE || !this.state.elementVisibility[element.id]) {
      return null;
    }

    // TODO: Implement PHONE element
    return (
      <div>--- PHONE element ---</div>
    );
  };

  /**
   * Renders the component based on the given config
   * @return {JSX}
   */
  render() {
    return (
      <Fragment>
        <div className={this.props.className}>
          {this.formElements.map(element => this.renderElement(element))}
        </div>
      </Fragment>
    );
  }
}

export default FormBuilder;
