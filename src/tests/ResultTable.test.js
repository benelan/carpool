import React from 'react';
import { shallow, mount } from 'enzyme';
import ResultTable from '../components/ResultTable';

 // snapshot
 it("ResultTable snapshot", () => {
    const wrapper = shallow(
      <ResultTable />
    );
    expect(wrapper).toMatchSnapshot();
  });


// lifecycle 
it('calls componentDidMount', () => {
    jest.spyOn(ResultTable.prototype, 'componentDidMount')
    const wrapper = shallow(<ResultTable />)
    expect(ResultTable.prototype.componentDidMount.mock.calls.length).toBe(1)
  })

  // props
  describe ('<ResultTable />', () => {
    const props = {
        name: 'John Doe',
        email: 'john@esri.com'
      }
    it ('accepts user props', () => {
      const wrapper = mount(<ResultTable n={props.name} e={props.email} />);
      expect(wrapper.props().e).toEqual(props.email)
      expect(wrapper.props().n).toEqual(props.name)
    })
  })

 