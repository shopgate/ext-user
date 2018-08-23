import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '@shopgate/user/constants/Portals';

/**
 * React component that takes the form and element ids of the element and surrounds it with portals
 * @returns {JSX}
 */
const SurroundWithPortals = ({ elementId, formId, children }) => {
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

    let name = `${portals.NAV_MENU}.${sanitize(prefix)}.${sanitize(id)}`;
    if (suffix) {
      name += `.${sanitize(suffix)}`;
    }

    return name;
  };

  return (
    <Fragment>
      <Portal name={portalName(formId, elementId, portals.BEFORE)} />
      <Portal name={portalName(formId, elementId)}>
        {children}
      </Portal>
      <Portal name={portalName(formId, elementId, portals.AFTER)} />
    </Fragment>
  );
};

SurroundWithPortals.propTypes = {
  children: PropTypes.node.isRequired,
  elementId: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired,
};

export default SurroundWithPortals;
