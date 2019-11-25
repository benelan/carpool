import React from 'react';
import { shallow, mount } from 'enzyme';
import Settings from '../components/Settings';

// snapshot
it("Settings snapshot", () => {
    const wrapper = shallow(
      <Settings />
    );
    expect(wrapper).toMatchSnapshot();
  });

// lifecycle
it('calls componentDidMount', () => {
    jest.spyOn(Settings.prototype, 'componentDidMount')
    const wrapper = shallow(<Settings />)
    expect(Settings.prototype.componentDidMount.mock.calls.length).toBe(1)
  })
