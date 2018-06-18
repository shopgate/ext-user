import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Grid from '@shopgate/pwa-common/components/Grid';
import Checkbox from '@shopgate/pwa-ui-shared/Checkbox';
import style from './style';

/**
 * @return {*}
 */
const MakeBilling = ({ handleMakeBilling }) => (
  <Grid className={style.checkboxGrid}>
    <Grid.Item grow={0}>
      <Checkbox
        onCheck={handleMakeBilling}
        defaultChecked={false}
      />
    </Grid.Item>
    <Grid.Item grow={1} className={style.checkboxLabel}>
      <I18n.Text string="checkout.shipping.address.makeBilling" />
    </Grid.Item>
  </Grid>
);

MakeBilling.propTypes = {
  handleMakeBilling: PropTypes.func.isRequired,
};

export default MakeBilling;
