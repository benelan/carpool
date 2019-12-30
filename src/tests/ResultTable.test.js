import React from 'react';
import { shallow, mount } from 'enzyme';
import ResultTable from '../components/ResultTable';
import UserStore from "../store/UserStore"


describe("ResultTable", function() {
// mock rest api
beforeAll(() => {
    global.fetch = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
});

let wrapper;
// set up wrapper
beforeEach(() => {
    const store = new UserStore()
    store.setName("John Doe")
    store.setEmail("john@esri.com")
    expect(store.userName).toBe("John Doe")
    expect(store.userEmail).toBe("john@esri.com")
    wrapper = shallow(<ResultTable UserStore={store}/>, { disableLifecycleMethods: true });
 });

 // unmount
 afterEach(() => {
    wrapper.unmount();
 });

// snapshot
it("ResultTable snapshot", () => {
    expect(wrapper).toMatchSnapshot();
});

})