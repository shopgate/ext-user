import React from 'react';
import PropTypes from 'prop-types';
import Select from '@shopgate/pwa-ui-shared/Form/Select';
import { ELEMENT_TYPE_COUNTRY } from './../elementTypes';

/**
 * React component that takes the element and additional data and renders a select box
 * with a list of countries to select from.
 * @returns {JSX}
 */
const CountryElement = ({
  countryList,
  element,
  errorText,
  name,
  style,
  value,
  visible,
}) => {
  // Don't render element if type doesn't match or if the element is not visible
  if (element.type !== ELEMENT_TYPE_COUNTRY || !visible) {
    return null;
  }

  return (
    <Select
      name={name}
      className={style}
      label={element.label}
      placeholder={element.placeholder}
      value={value}
      options={countryList}
      onChange={element.handleChange}
      errorText={errorText}
    />
  );
};

CountryElement.propTypes = {
  element: PropTypes.shape().isRequired,
  errorText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  countryList: PropTypes.shape(),
  visible: PropTypes.bool,
};

CountryElement.defaultProps = {
  countryList: {},
  visible: false,
};

export default CountryElement;
