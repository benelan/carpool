import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { Header } from './components';
import Settings from './components/Settings'
import Settings2 from './components/Settings2'

class App extends Component {
  render() {

    return (
      <div>
        <Header />
        <Settings2 />
      </div>
    );
  }
}

export default App;