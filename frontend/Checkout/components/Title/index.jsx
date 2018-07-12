import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import style from './style';

/**
 * @return {*}
 */
const Title = ({ className, title }) => (
  <div className={className}><I18n.Text string={title} /></div>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Title.defaultProps = {
  className: style.title,
};

export default Title;
