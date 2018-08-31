import React from 'react';
import PropTypes from 'prop-types';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '../../../../../../../constants/Portals';
import Info from './components/Info';
import DefaultCard from './components/DefaultCard';
import style from './style';

const isIos = themeName.includes('ios');

/**
 * @param {UserAddress} address address
 * @param {Object} defaults is default
 * @param {string[]} defaultTags default tags
 * @param {function} setDefault set as default handler
 * @constructor
 */
const Address = ({ address, defaults, defaultTags, setDefault }) => (
  <div className={style.address}>
    <Info address={address} />

    <Portal name={portals.USER_ADDRESSES_ADDRESS_DEFAULT_BEFORE} />
    <Portal name={portals.USER_ADDRESSES_ADDRESS_DEFAULT}>
      {defaultTags.map((tag, i, tags) => (
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
  </div>
);

Address.propTypes = {
  address: PropTypes.shape().isRequired,
  defaults: PropTypes.shape().isRequired,
  defaultTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDefault: PropTypes.func.isRequired,
};

export default Address;
