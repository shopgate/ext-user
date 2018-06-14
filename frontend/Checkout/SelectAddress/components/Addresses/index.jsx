import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import RadioCheckedIcon from '@shopgate/pwa-ui-shared/icons/RadioCheckedIcon';
import RadioUncheckedIcon from '@shopgate/pwa-ui-shared/icons/RadioUncheckedIcon';
import style from './style';

/**
 * @return {*}
 */
const Addresses = ({ selectAddress, addresses }) => (
  <Fragment>
    {
      addresses.map(address => (
        <Fragment key={`address_${address.id}`}>
          <Grid className={style.address}>
            <Grid.Item grow={1}>
              <div>{`${address.firstName} ${address.lastName}`}</div>
              <div>{address.street}</div>
              <div>{`${address.zipCode} ${address.city}`}</div>
            </Grid.Item>
            <Grid.Item
              grow={0}
              onClick={() => selectAddress(address)}
              className={style.radio}
            >
              {address.selected && <RadioCheckedIcon size={28} />}
              {!address.selected && <RadioUncheckedIcon size={28} />}
            </Grid.Item>
          </Grid>
        </Fragment>
      ))
    }
  </Fragment>
);

Addresses.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectAddress: PropTypes.func.isRequired,
};

export default Addresses;
