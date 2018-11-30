import React from 'react';
import { mount } from 'enzyme';
import { UIEvents } from '@shopgate/pwa-core';
import * as events from './../../constants/EventTypes';
import { UnwrappedAddressForm as AddressForm } from './';

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
  beforeAll(() => {
    jest.resetAllMocks();
    // noinspection JSCheckFunctionSignatures
    jest.spyOn(UIEvents, 'emit');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render only configured address fields', () => {
    const wrapper = mount(<AddressForm
      config={userConfig}
      addAddress={jest.fn()}
      updateAddress={jest.fn()}
      deleteAddress={jest.fn()}
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
      deleteAddress={jest.fn()}
      isFirstAddress={false}
      isBusy={false}
    />);

    wrapper.find('RippleButton').simulate('click');
    wrapper.update();

    expect(updateFn.mock.calls.length).toEqual(0);
  });

  it('should disable update button if no changes are done', () => {
    mount(<AddressForm
      config={userConfig}
      address={{
        id: 1,
        firstName: 'old value',
        lastName: 'old value',
      }}
      addAddress={jest.fn()}
      updateAddress={jest.fn()}
      deleteAddress={jest.fn()}
      isFirstAddress={false}
      isBusy={false}
    />);

    expect(UIEvents.emit).toHaveBeenCalledTimes(1);
    expect(UIEvents.emit).toHaveBeenCalledWith(events.APP_BAR_SAVE_BUTTON_DISABLE);
  });

  it('should enable update button if no changes are done', () => {
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
      addAddress={jest.fn()}
      updateAddress={jest.fn()}
      deleteAddress={jest.fn()}
      isFirstAddress={false}
      isBusy={false}
    />);

    expect(UIEvents.emit).toHaveBeenCalledTimes(3);
    expect(UIEvents.emit).nthCalledWith(1, events.APP_BAR_SAVE_BUTTON_DISABLE);
    expect(UIEvents.emit).nthCalledWith(2, events.APP_BAR_SAVE_BUTTON_ENABLE);
    expect(UIEvents.emit).nthCalledWith(3, events.APP_BAR_SAVE_BUTTON_ENABLE);
  });

  it('should print validation errors inline', () => {
    const wrapper = mount(<AddressForm
      config={userConfig}
      address={{ firstName: 'old value' }}
      addAddress={jest.fn()}
      updateAddress={jest.fn()}
      deleteAddress={jest.fn()}
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
