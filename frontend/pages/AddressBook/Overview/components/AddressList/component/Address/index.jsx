import React from 'react';
import PropTypes from 'prop-types';
import config from '@shopgate/user/config';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '@shopgate/user/constants/Portals';
import Button from '@shopgate/pwa-ui-shared/Button';
import styles from '@shopgate/pwa-ui-shared/Button/style';
import Info from './components/Info';
import DefaultCard from './components/DefaultCard';
import style from './style';

const { splitDefaultAddressesByTags = [] } = config;
const isIos = themeName.includes('ios');

/**
 * @param {UserAddress} address address
 * @param {Object} defaults is default
 * @param {function} deleteAddresses event handler for the delete button
 * @param {function} setDefault set as default handler
 * @constructor
 */
const Address = ({
  address,
  defaults,
  deleteAddresses,
  setDefault,
}) => (
  <div className={style.address}>
    <Info address={address} />

    <Portal name={portals.USER_ADDRESSES_ADDRESS_DEFAULT_BEFORE} />
    <Portal name={portals.USER_ADDRESSES_ADDRESS_DEFAULT}>
      {splitDefaultAddressesByTags.map((tag, i, tags) => (
        <DefaultCard
          tag={tag}
          isDefault={defaults[tag] === address.id}
          setAsDefault={() => setDefault(address.id, tag)}
          key={`${tag}_${address.id}`}
          underline={isIos || (i + 1 < tags.length)}
        />
      ))}
    </Portal>
    <Portal name={portals.USER_ADDRESSES_ADDRESS_DEFAULT_AFTER} />

    <Button className={styles.button} type="regular" flat onClick={() => deleteAddresses([address.id])}>
      DELETE
    </Button>
  </div>
);

Address.propTypes = {
  address: PropTypes.shape().isRequired,
  defaults: PropTypes.shape().isRequired,
  deleteAddresses: PropTypes.func.isRequired,
  setDefault: PropTypes.func.isRequired,
};

export default Address;
