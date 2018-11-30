import React from 'react';
import { mount } from 'enzyme';
import { UnwrappedAddressForm as AddressForm } from './';
import EventEmitter from '../../events/emitter';
import {
  NAVIGATOR_SAVE_BUTTON_DISABLE,
  NAVIGATOR_SAVE_BUTTON_ENABLE,
} from '../../constants/EventTypes';

/**
 * Noop function
 */
const noop = () => {};
const userConfig = {
  addressDefaultGroups: [],
  addressForm: {
    fields: {
      firstName: {
        sortOrder: 1,
        label: 'address.firstName',
        type: 'text',
        required: true,
        visible: true,
      },
      lastName: {
        sortOrder: 1,
        label: 'address.lastName',
        type: 'text',
        required: true,
        visible: true,
      },
    },
  },
};

describe('<AddressForm>', () => {
  it('should render only configured address fields', () => {
    const wrapper = mount(<AddressForm
      config={userConfig}
      addAddress={noop}
      updateAddress={noop}
      deleteAddress={noop}
      isFirstAddress={false}
      isBusy={false}
    />);
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('[label="address.firstName"]').length).toEqual(2);
    expect(wrapper.find('[label="address.lastName"]').length).toEqual(2);
    expect(wrapper.find('[label="address.countryCode"]').length).toEqual(0);
  });

  it('should not add address when a required field is not set', () => {
    const updateFn = jest.fn();
    const wrapper = mount(<AddressForm
      config={userConfig}
      address={{ firstName: 'old value' }}
      addAddress={updateFn}
      updateAddress={updateFn}
      deleteAddress={noop}
      isFirstAddress={false}
      isBusy={false}
    />);

    wrapper.find('RippleButton').simulate('click');
    wrapper.update();

    expect(updateFn.mock.calls.length).toEqual(0);
  });

  it('should disable update button if no changes are done', () => {
    let buttonState = null;
    EventEmitter.on(NAVIGATOR_SAVE_BUTTON_ENABLE, () => {
      buttonState = true;
    });
    EventEmitter.on(NAVIGATOR_SAVE_BUTTON_DISABLE, () => {
      buttonState = false;
    });

    mount(<AddressForm
      config={userConfig}
      address={{
        id: 1,
        firstName: 'old value',
        lastName: 'old value',
      }}
      addAddress={noop}
      updateAddress={noop}
      deleteAddress={noop}
      isFirstAddress={false}
      isBusy={false}
    />);

    expect(buttonState).toEqual(false);
  });

  it('should enable update button if no changes are done', () => {
    let buttonState;
    EventEmitter.on(NAVIGATOR_SAVE_BUTTON_ENABLE, () => {
      buttonState = true;
    });
    EventEmitter.on(NAVIGATOR_SAVE_BUTTON_DISABLE, () => {
      buttonState = false;
    });

    mount(<AddressForm
      config={{
        ...userConfig,
        addressForm: {
          fields: {
            ...userConfig.addressForm.fields,
            lastName: {
              ...userConfig.addressForm.fields.lastName,
              default: 'default value to be set',
            },
          },
        },
      }}
      // eslint-disable-next-line extra-rules/no-single-line-objects
      address={{ id: 1, firstName: 'old value' }}
      addAddress={noop}
      updateAddress={noop}
      deleteAddress={noop}
      isFirstAddress={false}
      isBusy={false}
    />);

    expect(buttonState).toEqual(true);
  });

  it('should print validation errors inline', () => {
    const wrapper = mount(<AddressForm
      config={userConfig}
      address={{ firstName: 'old value' }}
      addAddress={noop}
      updateAddress={noop}
      deleteAddress={noop}
      isFirstAddress={false}
      isBusy={false}
      validationErrors={[{
        path: 'firstName',
        message: 'foo',
      }]}
    />);

    wrapper.find('RippleButton').simulate('click');
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('[errorText="foo"]').length).toEqual(3);
  });
});
