import React from 'react';
import I18n from '@shopgate/pwa-common/components/I18n';
import style from './style';

/**
 * Render no addresses view
 * @return {JSX}
 */
export default () => (
  <div className={style.noAddresses}>
    <I18n.Text string="addresses.noAddresses" />
  </div>
);
