import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';

/**
 * @return {*}
 */
const Title = ({ title }) => (
  <h3><I18n.Text string={title} /></h3>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
