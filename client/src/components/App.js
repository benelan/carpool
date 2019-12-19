import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from "react-router-dom";
import { Provider } from 'mobx-react'
import UserStore from '../store/userDomainStore'
import Header from "./Header";
import Settings from "./Settings";
import Home from "./Home";
import Login from "./Login";
import ResultTable from "./ResultTable";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const App = () => {
  return (
    <Router>
      <Provider UserStore={UserStore}>
        <Routes />
      </Provider>
    </Router>
  );
}

const Routes = () => {
  let query = useQuery();
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
        <Route exact path="/results">
          <ResultTable />
        </Route>
        <Route exact path="/login">
          <Login n={query.get("name")} e={query.get("email")} />
        </Route>
      </Switch>
    </React.Fragment>
  )
}

export default App