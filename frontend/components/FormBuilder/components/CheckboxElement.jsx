import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@shopgate/pwa-ui-shared/Form/Checkbox';
import { ELEMENT_TYPE_CHECKBOX } from '../elementTypes';

/**
   * Takes an element and renders it, if the type matches
   * @param {Object} element The data of the element to be rendered
   * @returns {JSX}
   */
const CheckboxElement = ({
  element,
  style,
  errorText,
  visible,
  value,
  name,
}) => {
  // Don't render element if type doesn't match or if the element is not visible
  if (element.type !== ELEMENT_TYPE_CHECKBOX || !visible) {
    return null;
  }

  return (
    <Checkbox
      name={name}
      errorText={errorText}
      defaultChecked={value}
      className={style.fields}
      label={element.label}
      onChange={element.handleChange}
    />
  );
};

CheckboxElement.propTypes = {
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

CheckboxElement.defaultProps = {
  value: false,
  visible: false,
  style: { fields: '' },
};

export default CheckboxElement;
