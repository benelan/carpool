import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { Header} from './components';
import Settings from './components/Settings'

class App extends Component {
  render() {
    
    return (
      <body>
      <Header />
      <Settings />
      </body>
    );
  }
}

export default App;