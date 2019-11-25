import React from 'react';
import { shallow, mount } from 'enzyme';
import Home from '../components/Home';

// props
it('works', () => {
    const wrap = shallow(
      <Home n='test name' e='name@test.com' />
    )
  
    expect(wrap.find('h2').text()).toEqual('Welcome test name')
  })