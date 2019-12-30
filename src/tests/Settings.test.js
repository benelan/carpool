import React from 'react';
import { shallow } from 'enzyme';
import Settings from '../components/Settings';
import UserStore from "../store/UserStore"

// mock rest api
beforeAll(() => {
    global.fetch = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
});

let wrapper;
beforeEach(() => {
    const store = new UserStore()
    store.setName("John Doe")
    store.setEmail("john@esri.com")
    expect(store.userName).toBe("John Doe")
    expect(store.userEmail).toBe("john@esri.com")
    wrapper = shallow(<Settings UserStore={store}/>, { disableLifecycleMethods: true });
 });

// snapshot
it("Settings snapshot", () => {
    expect(wrapper).toMatchSnapshot();
});


// find text
it('find text', () => {
    expect(wrapper.text().includes('This information will be used to match you with a carpool buddy!'))
})