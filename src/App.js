import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Header } from './components';
import Settings from './components/Settings'
import Settings2 from './components/Settings2'

export default function App() {
    return (
      <Router>
        <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Settings />
          </Route>
          <Route exact path="/settings">
            <Settings2 />
          </Route>
        </Switch>
      </div>
      </Router>
    );
}