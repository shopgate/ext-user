import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Address from './component/Address';
import connect from './connector';

/**
/**
 * @param {Object} props props
 * @constructor
 */
const AddressList = ({
  addresses, defaults, defaultTags, setDefault,
}) => (
  <Fragment>
    {addresses.map(address => (
      <Fragment key={`address_${address.id}`}>
        <Address
          address={address}
          setDefault={setDefault}
          defaults={defaults}
          defaultTags={defaultTags}
        />
      </Fragment>
      ))
    }
  </Fragment>
);

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  defaults: PropTypes.shape().isRequired,
  defaultTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDefault: PropTypes.func.isRequired,
};

export default connect(AddressList);
