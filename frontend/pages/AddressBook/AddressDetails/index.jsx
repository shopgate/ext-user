import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Portal from '@shopgate/pwa-common/components/Portal';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import * as portals from '@shopgate/user/constants/Portals';
import AddressForm from '@shopgate/user/components/AddressForm';
import connect from './connector';
import style from './style';

const isIos = themeName.includes('ios');

/**
 * The Add address component.
 */
class AddAddress extends Component {
  static propTypes = {
    addressFields: PropTypes.shape().isRequired,
    View: PropTypes.func.isRequired,
    address: PropTypes.shape(),
  }

  static defaultProps = {
    address: {},
  }

  static contextTypes = {
    i18n: PropTypes.func,
  };

  /**
   * Don't update if addressId changed.
   * This only happens when the address was deleted and
   * therefore no longer has an id, and when the address was added
   * and therefore got a new id.
   * @param {Object} nextProps The next props.
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps) {
    if (this.props.address.id !== nextProps.address.id) {
      return false;
    }
    return true;
  }

  /**
   * @return {string}
   */
  get title() {
    const { __ } = this.context.i18n();
    return __(this.props.address.id ? 'address.update.title' : 'address.add.title');
  }

  /**
   * @return {*}
   */
  render() {
    const { addressFields, View, address } = this.props;
    return (
      <View title={!isIos ? this.title : ''}>
        <section className={style.container} data-test-id="UserAddressBookAddPage">

          {isIos &&
          <h1 className={style.headline}>
            <I18n.Text string={this.title} />
          </h1>
          }

          <Portal name={portals.USER_ADDRESSES_ADD_BEFORE} />
          <Portal name={portals.USER_ADDRESSES_ADD}>
            <AddressForm addressFields={addressFields} address={address} />
          </Portal>
          <Portal name={portals.USER_ADDRESSES_ADD_AFTER} />
        </section>
      </View>
    );
  }
}

export default connect(AddAddress);
