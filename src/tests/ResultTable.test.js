import React from 'react';
import { shallow, mount } from 'enzyme';
import ResultTable from '../components/ResultTable';

// mock rest api
beforeAll(() => {
    global.axios = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
});

let wrapper;
// set up wrapper
beforeEach(() => {
    wrapper = shallow(<ResultTable />, { disableLifecycleMethods: true });
 });

 // unmount
 afterEach(() => {
    wrapper.unmount();
 });

// snapshot
it("ResultTable snapshot", () => {
    expect(wrapper).toMatchSnapshot();
});


// lifecycle 
it('calls componentDidMount', () => {
    const spyDidMount = jest.spyOn(ResultTable.prototype,"componentDidMount");
    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();
})

// props
describe('<ResultTable />', () => {
    const props = {
        name: 'John Doe',
        email: 'john@esri.com'
    }
    it('accepts user props', () => {
        wrapper = mount(<ResultTable n={props.name} e={props.email} />);
        expect(wrapper.props().e).toEqual(props.email)
        expect(wrapper.props().n).toEqual(props.name)

    })

})
