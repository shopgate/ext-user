import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import style from './style';

function getLinkTextByType (type, select = true) {
  if (type === 'shipping') {
    if (select) {
      return 'checkout.shipping.address.select';
    }
    return 'checkout.shipping.address.change';
  }
  if (type === 'billing') {
    if (select) {
      return 'checkout.billing.address.select';
    }
    return 'checkout.billing.address.change';
  }

  return ''
}

/**
 * @return {*}
 */
const Address = ({ type, address }) => (
  <div className={style.addresses}>
    {address &&
      <div className={style.address}>
        <div>{`${address.firstName} ${address.lastName}`}</div>
        <div>{address.street}</div>
        <div>
          {`${address.zipCode} ${address.city}`}
        </div>
      </div>
    }
    <Link
      href={`/checkout/selectAddress?type=${type}&selected=${address ? address.id : ''}`}
      className={style.link}
    >
      <I18n.Text string={getLinkTextByType(type, !address)} />
    </Link>
  </div>
);

Address.propTypes = {
  type: PropTypes.string.isRequired,
  address: PropTypes.shape(),
};

Address.defaultProps = {
  address: null,
};

export default Address;
