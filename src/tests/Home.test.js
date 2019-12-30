import React from 'react';
import { shallow, mount } from 'enzyme';
import Home from '../components/Home';
import UserStore from "../store/UserStore"

it('Home works', () => {
  const store = new UserStore()
  store.setName("John Doe")
  store.setEmail("john@esri.com")
  expect(store.userName).toBe("John Doe")
  expect(store.userEmail).toBe("john@esri.com")
  const wrapper = shallow(
    <Home UserStore={store}/>
  )
  expect(wrapper.text().includes('Welcome John Doe'))
})