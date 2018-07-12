import React, { Fragment } from 'react';
import { App } from '@shopgate/pwa-common/context';
import Title from './../components/Title';
import Address from './../components/Address';
import style from './style';

/**
 * @return {*}
 */
const ShippingAddress = () => (
  <App>
    {({ checkout }) => (
      <Fragment>
        <Title title="checkout.shipping.address.title" className={style.title} />
        <Address address={checkout.shippingAddress} type="shipping" />
      </Fragment>
    )}
  </App>
);

export default ShippingAddress;
