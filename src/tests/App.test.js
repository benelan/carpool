  
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../components/App';
import UserStore from "../store/UserStore"
import { Provider } from 'mobx-react';

// basic render
it('App renders without crashing', () => {
  const store = new UserStore()
  const div = document.createElement('div');
  ReactDOM.render(<Provider UserStore={store}><App /></Provider>, div);
});


// snapshot
it("App snapshot", () => {
  const store = new UserStore()
  const wrapper = shallow(
    <Provider UserStore={store}><App /></Provider>
  );
  expect(wrapper).toMatchSnapshot();
});