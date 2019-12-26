import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../components/App';

// mock rest api
beforeAll(() => {
    global.axios = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
});

// basic render
it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


// snapshot
it("App snapshot", () => {
  const wrapper = shallow(
    <App />
  );
  expect(wrapper).toMatchSnapshot();
});