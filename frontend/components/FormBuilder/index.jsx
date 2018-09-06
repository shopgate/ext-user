import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { logger } from '@shopgate/pwa-core/helpers';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '@shopgate/user/constants/Portals';
import {
  ELEMENT_TYPE_COUNTRY,
  ELEMENT_TYPE_PROVINCE,
} from './elementTypes';
import {
  ACTION_TYPE_SET_VISIBILITY,
  ACTION_TYPE_SET_VALUE,
  ACTION_TYPE_SET_CASE,

  ACTION_RULE_TYPE_NOT_IN,
  ACTION_RULE_TYPE_ONE_OF,
  ACTION_RULE_TYPE_BOOLEAN,
  ACTION_RULE_TYPE_REGEX,
  ACTION_RULE_DATA_TYPES,

  ACTION_RULES_CONCAT_METHOD_ALL,
  ACTION_RULES_CONCAT_METHOD_ANY,
  ACTION_RULES_CONCAT_METHOD_NONE,
} from './actionConstants';
import TextElement from './components/TextElement';
import SelectElement from './components/SelectElement';
import CountryElement from './components/CountryElement';
import ProvinceElement from './components/ProvinceElement';
import RadioElement from './components/RadioElement';
import CheckboxElement from './components/CheckboxElement';
import countries from './countries';

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
      actionListeners: {},
      formData: {},
      errors: {},
    };

    // Reorganize form elements into a strucure that can be easily rendered
    this.formElements = this.buildFormElements(props.config);
    this.formDefaults = this.buildFormDefaults(this.formElements);

    // Build country list
    this.countryList = Object.keys(countries).reduce((reducer, countryCode) => ({
      ...reducer,
      [countryCode]: countries[countryCode].name,
    }), {});

    // Final form initialization, by triggering actionListeners in the defined order
    let newState = this.state;
    this.formElements.forEach((element) => {
      newState = this.notifyActionListeners(element.id, this.state, newState);
    });
    this.state = newState;
  }

  /**
   * Takes returns a list of provinces nased on
   * @param {string} countryCode Country code of the country to fetch provinces from
   * @return {Object}
   */
  getProvincesList = countryCode => (countries[countryCode]
    ? countries[countryCode].divisions
    : {});

  /**
   * Takes a list of which elements to render based on the respective element type
   *
   * @param {Object} formConfig Configuration of which form fields to render
   * @return {Object[]}
   */
  buildFormElements = (formConfig) => {
    let elementList = [];

    // Add all non-custom attributes and mark them as such
    Object.getOwnPropertyNames(formConfig.fields).forEach((id) => {
      if (id !== 'custom') {
        const field = {
          id,
          ...formConfig.fields[id],
          custom: false,
        };
        elementList.push(field);
      }
    });

    // Add custom fields to the element list
    if (formConfig.fields.custom) {
      Object.getOwnPropertyNames(formConfig.fields.custom).forEach((id) => {
        const field = {
          id,
          ...formConfig.fields.custom[id],
          custom: true,
        };
        elementList.push(field);
      });
    }

    // Generate handler functions for each element
    elementList = elementList.map(element => ({
      ...element,
      handleChange: this.createElementChangeHandler(element),
    }));

    // Handle fixed visibilities
    elementList.forEach((element) => {
      // Assume as visible except it's explicitly set to "false"
      this.state.elementVisibility[element.id] = element.visible !== false;
    });

    this.attachAllActionListeners(elementList);

    return elementList.sort(this.elementSortFunc);
  }

  /**
   * @param {Object} formElements form elements
   * @returns {Object}
   */
  buildFormDefaults = (formElements) => {
    const formDefaults = {};

    // Take only those defaults from props, that are actually represented by an element
    formElements.forEach((element) => {
      let defaultState = null;

      // Use default from element config as a base
      if (element.default !== undefined) {
        defaultState = element.default;
      }

      // Take defaults from "customAttributes" property or from the higher level, based on element
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
        formDefaults[element.id] = defaultState;
      }
    });

    return formDefaults;
  }

  /**
   * Takes the elements to be rendered by the FormBuilder and attaches available action listeners
   * to the component.
   * @param {Object} elementList List of all elements
   */
  attachAllActionListeners = (elementList) => {
    // Attach action listeners for element (context) actions
    elementList.forEach((element) => {
      if (element.actions === undefined) {
        return;
      }

      // Create listeners for all supported actions
      element.actions.forEach((action) => {
        const actionRules = action.rules || [];
        // Always apply action to itself if no rules given
        if (actionRules.length === 0) {
          // Define a basic rule if no rules given
          actionRules.push({ context: element.id });
        }

        // Actions do have a fixed structure which needs to be fulfilled
        const normalizedAction = {
          ...action,
          rules: actionRules,
        };

        // Assign the action listeners to all contexts of the current element
        actionRules.forEach((rule) => {
          this.attachRuleActionListener(element, normalizedAction, rule);
        });
      });
    });
  }

  /**
   * Attaches one or possibly multiple action listeners for the given rule
   * @param {Object} element The curent element that is modified by the action
   * @param {string} action The action and it's params
   * @param {Object} rule The rule to check in case the action listener is triggered
   */
  attachRuleActionListener = (element, action, rule) => {
    let actionListener;
    switch (action.type) {
      case ACTION_TYPE_SET_VISIBILITY: {
        // Visibility is special and uses the result of the evaluation itself
        actionListener = this.createSetVisibilityActionListener(element, action);
        break;
      }
      case ACTION_TYPE_SET_VALUE: {
        actionListener = this.createEvaluatedActionListener(
          element,
          action,
          this.createSetValueActionListener(element, action)
        );
        break;
      }
      case ACTION_TYPE_SET_CASE: {
        actionListener = this.createEvaluatedActionListener(
          element,
          action,
          this.createSetCaseActionListener(element, action)
        );
        break;
      }
      default: return;
    }

    this.registerActionListener(rule.context, actionListener);
  }

  /**
   * Action listener creator to check all related rules before calling any further action listeners
   * @param {string} element The element for which the listener should be created for
   * @param {Object} action The action to be create a listener for
   * @param {function} actionListener The action listener to call if the rule applies
   * @returns {function} Returns the modified state.
   */
  createEvaluatedActionListener = (element, action, actionListener) => (prevState, nextState) => {
    // Apply rules before accepting any changes
    if (!this.evaluateActionRules(element, action, nextState)) {
      return nextState;
    }

    return actionListener(prevState, nextState);
  }

  /**
   * Action listener creator to handle "setVisibility" actions
   * @param {string} element The element for which the listener should be created for
   * @param {Object} action The action to be create a listener for
   * @returns {function} Returns the modified state.
   */
  createSetVisibilityActionListener = (element, action) => (prevState, nextState) => {
    let newState = {
      ...nextState,
      elementVisibility: {
        ...nextState.elementVisibility,
        [element.id]: this.evaluateActionRules(element, action, nextState),
      },
    };

    if (newState.formData[element.id] === undefined &&
      newState.elementVisibility[element.id]) {
      newState.formData[element.id] = this.formDefaults[element.id];
    } else if (!newState.elementVisibility[element.id] &&
      newState.formData[element.id] !== undefined) {
      delete newState.formData[element.id];
    }

    // Notify follow up listeners about the current change
    if (nextState.formData[element.id] !== newState.formData[element.id]) {
      newState = this.notifyActionListeners(element.id, prevState, newState);
    }

    return newState;
  }

  /**
   * Action listener creator to handle "setValue" actions
   * @param {string} element The element for which the listener should be created for
   * @param {Object} action The action to be create a listener for
   * @returns {function} Returns the modified state.
   */
  createSetValueActionListener = (element, action) => (prevState, nextState) => {
    let { value } = action.params;
    switch (action.params.type) {
      case 'lengthOf':
        value = `${nextState.formData[action.params.value].length}`;
        break;
      case 'copyFrom':
        value = nextState.formData[action.params.value];
        break;
      case 'text':
      default:
        break;
    }

    let newState = {
      ...nextState,
      formData: {
        ...nextState.formData,
        [element.id]: value,
      },
    };

    // Notify follow up listeners about the current change
    if (nextState.formData[element.id] !== value) {
      newState = this.notifyActionListeners(element.id, prevState, newState);
    }

    return newState;
  }

  /**
   * Action listener creator to handle "setCase" actions
   * @param {string} element The element for which the listener should be created for
   * @param {Object} action The action to be create a listener for
   * @returns {function} Returns the modified state.
   */
  createSetCaseActionListener = (element, action) => (prevState, nextState) => {
    /**
     * Takes a string and applies a case function on it
     * @param {string} str The input string
     * @returns {str}
     */
    const setCase = (str) => {
      if (action.params.value === 'upper') {
        return str.toUpperCase();
      }
      if (action.params.value === 'lower') {
        return str.toLowerCase();
      }
      return str;
    };

    let newState = {
      ...nextState,
      formData: {
        ...nextState.formData,
        [element.id]: setCase(nextState.formData[element.id]),
      },
    };

    // Notify follow up listeners about the current change
    if (nextState.formData[element.id] !== newState.formData[element.id]) {
      newState = this.notifyActionListeners(element.id, prevState, newState);
    }

    return newState;
  }

  /**
   * Evaluates all action rules of a given element action
   *
   * @param {Object} element The element of which the action rules should be evaluated
   * @param {Object} action The current action to be evaluate rules for
   * @param {Object} nextState The state at the time before the "action" event finished
   * @returns {boolean}
   */
  evaluateActionRules = (element, action, nextState) => {
    const concatRules = this.createActionEvalConcatMethod(action.ruleConcatMethod);
    const resultInitValue = action.ruleConcatMethod !== ACTION_RULES_CONCAT_METHOD_ANY;

    let result = resultInitValue;
    action.rules.forEach((rule) => {
      let tmpResult = resultInitValue;
      let ruleType = rule.type;
      let ruleData = rule.data;

      // Default to rule type "boolean" and data true when type not given
      if (ruleType === undefined) {
        ruleType = ACTION_RULE_TYPE_BOOLEAN;
        ruleData = true;
      }

      // Check rule validity
      if (!ACTION_RULE_DATA_TYPES[ruleType]) {
        logger.error(`Error: Unknown action rule type '${ruleType}' in element '${element.id}'`);
        return;
      }
      // Check type of ruleData
      const ruleDataType = ACTION_RULE_DATA_TYPES[ruleType];
      if (ruleDataType === 'array' && !Array.isArray(ruleData)) {
        logger.error(`Error: Invalid FormBuilder action rule in field '${element.id}': `
          .concat(`data must be an 'array' for rule type '${ruleType}'`));
        return;
        // eslint-disable-next-line valid-typeof
      } else if (ruleDataType !== 'array' && typeof ruleData !== ruleDataType) {
        logger.error(`Error: Invalid FormBuilder action rule in field '${element.id}': `
          .concat(`data must be '${ruleDataType}' for rule type '${ruleType}'`));
        return;
      }

      switch (ruleType) {
        case ACTION_RULE_TYPE_ONE_OF: {
          tmpResult = ruleData.includes(nextState.formData[rule.context]);
          break;
        }
        case ACTION_RULE_TYPE_NOT_IN: {
          tmpResult = !ruleData.includes(nextState.formData[rule.context]);
          break;
        }
        case ACTION_RULE_TYPE_BOOLEAN: {
          tmpResult = ruleData;
          break;
        }
        case ACTION_RULE_TYPE_REGEX: {
          const regexParts = ruleData.split('/');
          let regexPattern = '';
          let regexParam = '';
          if (regexParts.length === 1) {
            [regexPattern] = regexParts;
          } else if (regexParts.length === 3) {
            regexParts.shift();
            [regexPattern, regexParam = ''] = regexParts;
          } else {
            logger.error(`Error: Invalid regex string in action rule in element ${element.id}`);
            break;
          }

          const regex = new RegExp(regexPattern, regexParam);
          tmpResult = regex.test(nextState.formData[rule.context]);
          break;
        }
        default: break;
      }

      // Concat rules based on the rule concat method of the action
      result = concatRules(result, tmpResult);
    });

    return result;
  }

  /**
   * Creates a concat function that defines how to concatenate action rule results
   *
   * @param {string} method The method defined by the action
   * @returns {function}
   */
  createActionEvalConcatMethod = method => (prev, next) => {
    switch (method) {
      case ACTION_RULES_CONCAT_METHOD_NONE: return prev && !next;
      case ACTION_RULES_CONCAT_METHOD_ANY: return prev || next;
      case ACTION_RULES_CONCAT_METHOD_ALL:
      default:
        return prev && next;
    }
  }

  /**
   * Adds a "action" listener to a given context element
   *
   * @param {string} elementId the element to listen for
   * @param {function} listener The listener to call when something has changed
   */
  registerActionListener = (elementId, listener) => {
    if (!this.state.actionListeners[elementId]) {
      this.state.actionListeners[elementId] = [];
    }
    this.state.actionListeners[elementId].push(listener);
  }

  /**
   * Takes an element id, the state to work with and optional data and notifies all "action"
   * listeners about the change. Every listener can manipulate the state.
   * Returns the new state.
   *
   * @param {string} elementId The id of the element that was changed
   * @param {Object} prevState The state before any changes took place
   * @param {Object} nextState The state containing all updates before the listeners are executed
   * @returns {Object} The new state
   */
  notifyActionListeners = (elementId, prevState, nextState) => {
    let newState = nextState;
    if (this.state.actionListeners[elementId]) {
      this.state.actionListeners[elementId].forEach((notifyListener) => {
        // Note: The order of state changes is applied in the same order of listener registration
        newState = notifyListener(prevState, newState);
      });
    }

    return newState;
  }

  /**
   * Takes an element and generates a change handler based on it's type,
   * @param {Object} element Element to create the handler for
   * @returns {function}
   */
  createElementChangeHandler = element => (value) => {
    // Apply value change to new state
    const newState = {
      ...this.state,
      formData: {
        ...this.state.formData,
        [element.id]: value,
      },
    };

    // Handle province update when country changes
    if (element.type === ELEMENT_TYPE_COUNTRY && newState.formData[element.type] !== value) {
      // Check if province element is even in the form config
      const provinceElement = this.formElements.find(el => el.type === ELEMENT_TYPE_PROVINCE);
      const countryElement = this.formElements.find(el => el.type === ELEMENT_TYPE_COUNTRY);
      if (provinceElement && newState.elementVisibility[provinceElement.id]) {
        // Overwrite province with the form's default, if country matches the default as well
        if (countryElement && value === this.formDefaults[countryElement.id]) {
          newState.formData[provinceElement.id] = this.formDefaults[provinceElement.id];
        } else {
          // Update province to first or no selection, based on "required" attribute
          newState.formData[provinceElement.id] = !provinceElement.required
            ? ''
            : Object.keys(this.getProvincesList(value))[0];
        }
      }
    }

    // Handle context sensitive functionality by via "action" listener and use the "new" state
    const updatedState = this.notifyActionListeners(element.id, this.state, newState);

    // TODO: handle validation errors and set "hasErrors" accordingly - no validation, yet
    let hasErrors = false;

    // Check "required" fields for all visible elements
    this.formElements.forEach((formElement) => {
      if (!updatedState.elementVisibility[formElement.id] || !formElement.required) {
        return;
      }

      const tmpVal = updatedState.formData[formElement.id];
      const tmpResult = tmpVal === null || tmpVal === undefined || tmpVal === '' || tmpVal === false;
      hasErrors = hasErrors || tmpResult;
    });

    // Handle state internally and send an "onChange" event to parent if this finished
    this.setState(updatedState, () => {
      // Transform to external structure (unavailable ones will be set undefined)
      const updateData = {};
      this.formElements.forEach((el) => {
        if (el.custom) {
          if (updateData.customAttributes === undefined) {
            updateData.customAttributes = {};
          }
          updateData.customAttributes[el.id] = updatedState.formData[el.id];
        } else {
          updateData[el.id] = updatedState.formData[el.id];
        }
      });

      // Trigger the given update action
      this.props.handleUpdate(updateData, hasErrors);
    });
  };

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
  elementSortFunc = (element1, element2) => {
    // Keep relative sort order when no specific sort order was set for both
    if (element2.sortOrder === undefined) {
      return -1;
    } else if (element1.sortOrder === undefined) {
      return 1;
    }

    // Sort in ascending order of sortOrder otherwise
    return element1.sortOrder - element2.sortOrder;
  };

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
    const elementValue = this.state.formData[elementData.id];
    const elementVisible = this.state.elementVisibility[elementData.id] || false;
    const countryElement = this.formElements.find(el => el.type === ELEMENT_TYPE_COUNTRY);

    return (
      <Fragment key={elementKey}>
        <Portal name={`${portalName}.${portals.BEFORE}`} />
        <Portal name={portalName}>
          {/* Each element renders itself, only if the type matches */}
          <TextElement
            name={elementName}
            element={elementData}
            errorText={elementErrorText}
            value={elementValue}
            visible={elementVisible}
          />
          <SelectElement
            name={elementName}
            element={elementData}
            errorText={elementErrorText}
            value={elementValue}
            visible={elementVisible}
          />
          <CountryElement
            name={elementName}
            element={elementData}
            errorText={elementErrorText}
            value={elementValue}
            visible={elementVisible}
            countryList={this.countryList}
          />
          <ProvinceElement
            name={elementName}
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
          <RadioElement
            name={elementName}
            element={elementData}
            errorText={elementErrorText}
            value={elementValue}
            visible={elementVisible}
          />
          <CheckboxElement
            name={elementName}
            element={elementData}
            errorText={elementErrorText}
            value={elementValue}
            visible={elementVisible}
          />
        </Portal>
        <Portal name={`${portalName}.${portals.AFTER}`} />
      </Fragment>
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
