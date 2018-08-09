import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import ChevronIcon from '@shopgate/pwa-ui-shared/icons/ChevronIcon';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '@shopgate/user/constants/Portals';
import { userAddressPathPattern } from '@shopgate/user/constants/RoutePaths';

/**
 * @param {UserAddress} address address
 * @constructor
 */
const Info = ({ address }) => (
  <Fragment>
    <Portal name={portals.USER_ADDRESSES_ADDRESS_BEFORE} />
    <Portal name={portals.USER_ADDRESSES_ADDRESS}>
      <Link href={userAddressPathPattern.stringify(address)}>
        <Grid>
          <Grid.Item grow={1}>
            <div>{`${address.firstName} ${address.lastName}`}</div>
            <div>{address.street1}</div>
            <div>{`${address.zipCode} ${address.city}`}</div>
          </Grid.Item>
          <Grid.Item grow={0}>
            <ChevronIcon size={28} />
          </Grid.Item>
        </Grid>
      </Link>
    </Portal>
    <Portal name={portals.USER_ADDRESSES_ADDRESS_AFTER} />
  </Fragment>
);

Info.propTypes = {
  address: PropTypes.shape().isRequired,
};

export default Info;
