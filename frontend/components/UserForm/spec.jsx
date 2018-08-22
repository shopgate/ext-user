import React from 'react';
import { mount } from 'enzyme';
import { UserForm } from './';

/**
 * Noop function
 */
const noop = () => {};

describe('<UserForm>', () => {
  const props = {
    registerUser: noop,
    updateUser: noop,
    user: {},
    validateUser: noop,
    disabled: false,
    validationErrors: {},
  };

  it('should render user register form', () => {
    const wrapper = mount(<UserForm {...props} />);
    expect(wrapper).toMatchSnapshot();

    const firstName = wrapper.find('input[name="firstName"]');
    const lastName = wrapper.find('input[name="lastName"]');

    expect(firstName.get(0).props.value).toEqual('');
    expect(lastName.get(0).props.value).toEqual('');

    // Register should have a password field
    expect(wrapper.find('input[name="password"]').length).toEqual(1);
  });

  it('should render user profile form', () => {
    const profileProps = {
      ...props,
      user: {
        id: 'qwerty',
        firstName: 'John',
        lastName: 'Doe',
      },
    };

    const wrapper = mount(<UserForm {...profileProps} />);
    expect(wrapper).toMatchSnapshot();

    const firstName = wrapper.find('input[name="firstName"]');
    const lastName = wrapper.find('input[name="lastName"]');

    expect(firstName.get(0).props.value).toEqual('John');
    expect(lastName.get(0).props.value).toEqual('Doe');

    // Profile should not have a password field
    expect(wrapper.find('input[name="password"]').length).toEqual(0);
  });
});
