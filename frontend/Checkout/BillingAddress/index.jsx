import React, { Fragment } from 'react';
import I18n from '@shopgate/pwa-common/components/I18n';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
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
        <Title title="checkout.billing.title" />
        <Address address={checkout.billingAddress} />
        <Link href="/user/selectAddress">
          <I18n.Text string="checkout.billing.selectAddress" />
        </Link>
      </Fragment>
    )}
  </App>
);

export default BillingAddress;
