import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import { ELEMENT_TYPE_TEXT } from './../elementTypes';

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
  // Don't render element if type doesn't match or if the element is not visible
  if (element.type !== ELEMENT_TYPE_TEXT || !visible) {
    return null;
  }

  return (
    <TextField
      name={name}
      className={style}
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
  style: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  visible: PropTypes.bool,
};

TextElement.defaultProps = {
  visible: false,
};

export default TextElement;
