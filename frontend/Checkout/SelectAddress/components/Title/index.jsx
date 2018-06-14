import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import style from './style';

/**
 * @return {*}
 */
const Title = ({ title }) => (
  <div className={style.title}><I18n.Text string={title} /></div>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
