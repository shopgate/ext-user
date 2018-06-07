import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import Button from '@shopgate/pwa-common/components/Button';
import CheckedIcon from '@shopgate/pwa-ui-shared/icons/CheckedIcon';
import UncheckedIcon from '@shopgate/pwa-ui-shared/icons/UncheckedIcon';

/**
 * @return {*}
 */
const Addresses = ({ selectAddress, addresses, selectedId }) => (
  <Fragment>
    {
      addresses.map(address => (
        <Fragment key={`address_${address.id}`}>
          <Grid>
            <Grid.Item grow={999}>
              <div>{`${address.firstName} ${address.lastName}`}</div>
              <div>{address.street}</div>
              <div>{`${address.zipCode} ${address.city}`}</div>
            </Grid.Item>
            <Grid.Item grow={1}>
              <Button onClick={() => selectAddress(address)}>
                {address.id === selectedId && <CheckedIcon size={28} color="#FA5400" />}
                {address.id !== selectedId && <UncheckedIcon size={28} color="#FA5400" />}
              </Button>
            </Grid.Item>
          </Grid>
          <hr />
        </Fragment>
      ))
    }
  </Fragment>
);

Addresses.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectAddress: PropTypes.func.isRequired,
  selectedId: PropTypes.string.isRequired,
};

export default Addresses;
