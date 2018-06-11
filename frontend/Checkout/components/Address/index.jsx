import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * @return {*}
 */
const Address = ({ address }) => (
  <Fragment>
    {address &&
      <Fragment>
        <div>{`${address.firstName} ${address.lastName}`}</div>
        <div>{address.street}</div>
        <div>
          {`${address.zipCode} ${address.city}`}
        </div>
      </Fragment>
    }
  </Fragment>
);

Address.propTypes = {
  address: PropTypes.shape(),
};

Address.defaultProps = {
  address: null,
};

export default Address;
