import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Settings from "./components/Settings";
import Home from "./components/Home";
import ResultTable from "./components/ResultTable";

export default function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Routes() {
  let query = useQuery();
  const name = query.get("name");
  const email = query.get("email");
  return (
    <React.Fragment>
      <Header n={name} e={email} />
      <Switch>
        <Route exact path="/">
          <Home n={name} e={email} />
        </Route>
        <Route exact path="/settings">
          <Settings n={name} e={email} />
        </Route>
        <Route exact path="/results">
          <ResultTable n={name} e={email} />
        </Route>
      </Switch>
    </React.Fragment>
  )
}