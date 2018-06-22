import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import connect from './connector';
import Title from './components/Title';
import MakeBilling from './../components/MakeBilling';
import Addresses from './components/Addresses';
import style from './style';

/**
 * Select address component
 */
class SelectAddress extends Component {
  static propTypes = {
    addresses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    addressType: PropTypes.string.isRequired,
    selectAddress: PropTypes.func.isRequired,
    updateAddress: PropTypes.func.isRequired,
    selectedId: PropTypes.string.isRequired,
  }

  /**
   * @param {Object} props props
   */
  constructor(props) {
    super(props);

    let address = {};
    if (this.props.selectedId) {
      address = this.props.addresses.find(addr => addr.id === this.props.selectedId);
    }

    this.state = {
      address,
      makeBilling: false,
    };
  }

  /**
   * @param {Object} address address
   */
  handleAddressSelection = (address) => {
    this.setState({ address });
  }

  /**
   * @param {boolean} makeBilling makeBilling
   */
  handleMakeBillingAddress = (makeBilling) => {
    this.setState({ makeBilling });
  }

  /**
   * @param {Object} event App event
   */
  submitAddress = (event) => {
    event.preventDefault();
    const tags = [];
    if (this.state.makeBilling) {
      const billing = 'billing';
      tags.push(billing)
      this.props.selectAddress(this.state.address, billing);
    }
    tags.push('shipping');
    if (this.state.address.tags && Array.isArray(this.state.address.tags)) {
      tags.concat(this.state.address.tags)
    }
    this.props.selectAddress(this.state.address, this.props.addressType, true);
    this.props.updateAddress({id: this.state.address.id, tags});
  }

  /**
   * @return {*}
   */
  render() {
    const {
      // eslint-disable-next-line react/prop-types
      View, addressType, addresses,
    } = this.props;

    const isShipping = this.props.addressType === 'shipping';

    const addressesWitSelection = addresses.map(address => ({
      ...address,
      selected: this.state.address.id === address.id,
    }));

    return (
      <View>
        <section className={style.page} data-test-id="SelectAddressPage">
          <Title title={addressType === 'shipping' ? 'checkout.shipping.address.title' : 'checkout.billing.address.title'} />
          <Addresses
            addresses={addressesWitSelection}
            selectAddress={this.handleAddressSelection}
          />

          {/* Add new address */}
          <Link href={`/checkout/addAddress?type=${addressType}`} className={style.link}>
            <I18n.Text string="address.add.title" />
          </Link>

          {isShipping &&
            <MakeBilling handleMakeBilling={this.handleMakeBillingAddress} />
          }

          <div data-test-id="SelectAddressButton">
            <RippleButton type="secondary" disabled={!this.state.address.id} onClick={this.submitAddress} className={style.button}>
              <I18n.Text string="address.add.button" />
            </RippleButton>
          </div>
        </section>
      </View>
    );
  }
}

export default connect(SelectAddress);
