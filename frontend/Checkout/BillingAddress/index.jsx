import React, { Fragment } from 'react';
import { App } from '@shopgate/pwa-common/context';
import Title from './../components/Title';
import Address from './../components/Address';

/**
 * @return {*}
 */
const BillingAddress = () => (
  <App>
    {({ checkout }) => (
      <Fragment>
        <Title title="checkout.billingAddress.title" />
        <Address address={checkout.billingAddress} type="billing" />
      </Fragment>
    )}
  </App>
);

export default BillingAddress;
