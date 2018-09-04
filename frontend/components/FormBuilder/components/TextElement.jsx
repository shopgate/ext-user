import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import {
  ELEMENT_TYPE_TEXT,
  ELEMENT_TYPE_NUMBER,
  ELEMENT_TYPE_EMAIL,
  ELEMENT_TYPE_PASSWORD,
  ELEMENT_TYPE_DATE,
  ELEMENT_TYPE_PHONE,
} from './../elementTypes';

/**
 * React component that takes the element and additional data and renders a configured text input.
 * @returns {JSX}
 */
const TextElement = ({
  element,
  errorText,
  name,
  style,
  value,
  visible,
}) => {
  // Map element type to input type
  const mapping = {
    [ELEMENT_TYPE_TEXT]: 'text',
    [ELEMENT_TYPE_NUMBER]: 'number',
    [ELEMENT_TYPE_EMAIL]: 'email',
    [ELEMENT_TYPE_PASSWORD]: 'password',
    [ELEMENT_TYPE_DATE]: 'date',
    [ELEMENT_TYPE_PHONE]: 'tel',
  };
  const type = mapping[element.type];

  // Don't render element if type doesn't match or if the element is not visible
  if (typeof type === 'undefined' || !visible) {
    return null;
  }

  return (
    <TextField
      type={type}
      name={name}
      className={style.fields}
      label={element.label}
      value={value}
      onChange={element.handleChange}
      errorText={errorText}
    />
  );
};

TextElement.propTypes = {
  element: PropTypes.shape().isRequired,
  errorText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.shape(),
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired,
    PropTypes.number.isRequired,
  ]),
  visible: PropTypes.bool,
};

TextElement.defaultProps = {
  value: '',
  visible: false,
  style: { field: '' },
};

export default TextElement;
