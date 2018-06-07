import React, { Fragment } from 'react';
import I18n from '@shopgate/pwa-common/components/I18n';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import { App } from '@shopgate/pwa-common/context';
import Title from './../components/Title';
import Address from './../components/Address';

/**
 * @return {*}
 */
const ShippingAddress = () => (
  <App>
    {({ checkout }) => (
      <Fragment>
        <Title title="checkout.shipping.title" />
        <Address address={checkout.shippingAddress} />
        <Link href={`/user/selectAddress?type=shipping&selected=${checkout.shippingAddress ? checkout.shippingAddress.id : ''}`}>
          <I18n.Text string="checkout.shipping.selectAddress" />
        </Link>
      </Fragment>
    )}
  </App>
);

export default ShippingAddress;
