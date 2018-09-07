import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormBuilder from '.';

configure({ adapter: new Adapter() });

describe('<FormBuilder />', () => {
  it('should render empty form', () => {
    const wrapper = mount((
      <FormBuilder
        config={{ fields: {} }}
        id="foo"
        handleUpdate={() => {}}
      />
    ));

    expect(wrapper).toMatchSnapshot();
  });

  it('should render two text fields', () => {
    const wrapper = mount((
      <FormBuilder
        config={{
          fields: {
            firstName: {
              label: 'foo',
              type: 'text',
              visible: true,
            },
            lastName: {
              label: 'bar',
              type: 'text',
              visible: true,
            },
          },
        }}
        id="foo"
        handleUpdate={() => {}}
      />
    ));

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('TextField').length).toEqual(2);
  });

  it('should not render invisible field', () => {
    const wrapper = mount((
      <FormBuilder
        config={{
          fields: {
            firstName: {
              label: 'foo',
              type: 'text',
              visible: false,
            },
          },
        }}
        id="foo"
        handleUpdate={() => {}}
      />
    ));

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('TextField').length).toEqual(0);
  });
});
