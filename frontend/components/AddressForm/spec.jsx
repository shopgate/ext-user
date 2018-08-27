import React from 'react';
import { mount } from 'enzyme';
import { AddressForm } from './';

jest.mock('@shopgate/user/config', () => ({
  splitDefaultAddressesByTags: ['shipping', 'billing'],
  addressFields: ['firstName', 'lastName', 'phone'], // TODO: update the test to match the new config
  countryCodes: 'DE',
}));

/**
 * Noop function
 */
const noop = () => {};

describe('<AddressForm>', () => {
  it('should render only configured address fields', () => {
    const wrapper = mount(<AddressForm
      addAddress={noop}
      updateAddress={noop}
      validateAddress={noop}
      deleteAddress={noop}
      disabled={false}
    />);
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('[label="address.firstName"]').length).toEqual(2);
    expect(wrapper.find('[label="address.lastName"]').length).toEqual(2);
    expect(wrapper.find('[label="address.countryCode"]').length).toEqual(0);
  });

  it('should not update address when validation fails', () => {
    const updateFn = jest.fn();
    const validateFn = jest.fn(() => ({ firstName: 'foo' }));
    const wrapper = mount(<AddressForm
      addAddress={updateFn}
      updateAddress={updateFn}
      validateAddress={validateFn}
      deleteAddress={noop}
      disabled={false}
    />);

    wrapper.find('RippleButton').simulate('click');
    wrapper.update();

    expect(updateFn.mock.calls.length).toEqual(0);
    expect(validateFn).toBeCalled();
  });

  it('should print validation errors inline', () => {
    const validateFn = jest.fn(() => ({ firstName: 'foo' }));
    const wrapper = mount(<AddressForm
      addAddress={noop}
      updateAddress={noop}
      validateAddress={validateFn}
      deleteAddress={noop}
      disabled={false}
    />);

    wrapper.find('RippleButton').simulate('click');
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('[errorText="foo"]').length).toEqual(2);
  });

  it('should add address if validation is successful', () => {
    const updateFn = jest.fn();
    const wrapper = mount(<AddressForm
      addAddress={updateFn}
      updateAddress={updateFn}
      validateAddress={() => ({})}
      deleteAddress={noop}
      disabled={false}
    />);

    wrapper.find('RippleButton').simulate('click');
    wrapper.update();

    expect(updateFn).toHaveBeenCalled();
  });
});
