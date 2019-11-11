import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './components/Header';
import Home from './components/Home'
import Results from './components/Results'
import Settings from './components/Settings'
import ResultTable from './components/ResultTable'

export default function App() {
    return (
      <Router>
        <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/results" component={ResultTable}/>
          <Route exact path="/settings" component={Settings}/>
        </Switch>
      </div>
      </Router>
    );
}