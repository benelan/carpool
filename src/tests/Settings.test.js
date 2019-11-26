import React from 'react';
import { shallow } from 'enzyme';
import Settings from '../components/Settings';

// mock rest api
beforeAll(() => {
    global.fetch = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
});

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


// matching el
it('matching elements', () => {
    const wrapper = shallow(<Settings />)
    expect(
        wrapper.containsMatchingElement(
            <p>
                <b>This information will be used to match you with a carpool buddy!</b>
            </p>
        )
    ).toBeTruthy()
})
