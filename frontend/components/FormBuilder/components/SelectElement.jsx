import React from 'react';
import PropTypes from 'prop-types';
import Select from '@shopgate/pwa-ui-shared/Form/Select';
import { ELEMENT_TYPE_SELECT } from './../elementTypes';

/**
 * React component that takes the element and additional data and renders a configured select box.
 * @returns {JSX}
 */
const SelectElement = ({
  element,
  errorText,
  name,
  style,
  value,
  visible,
}) => {
  // Don't render element if type doesn't match or if the element is not visible
  if (element.type !== ELEMENT_TYPE_SELECT || !visible) {
    return null;
  }

  return (
    <Select
      name={name}
      className={style}
      label={element.label}
      placeholder={element.placeholder}
      value={value}
      options={element.options}
      onChange={element.handleChange}
      errorText={errorText}
    />
  );
};

SelectElement.propTypes = {
  element: PropTypes.shape().isRequired,
  errorText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  visible: PropTypes.bool,
};

SelectElement.defaultProps = {
  visible: false,
};

export default SelectElement;
