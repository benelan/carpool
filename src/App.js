import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/Header';
import Settings from './components/Settings'
import ResultTable from './components/ResultTable'

export default function App() {
    return (
      <Router>
        <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Settings}/>
          <Route exact path="/results" component={ResultTable}/>
        </Switch>
      </div>
      </Router>
    );
}