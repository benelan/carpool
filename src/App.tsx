import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loadModules } from "esri-loader";
import { Spinner } from "reactstrap";
import Header from "./components/Header";
import Settings from "./components/Settings";
import Home from "./components/Home";
import ResultTable from "./components/ResultTable";

type MyState = {
  email: string | null,
  name: string | null;
};

class App extends React.Component<MyState> {

  state: MyState = {
    name: null,
    email: null
  }

  //--------------------- LIFE CYCLE FUNCTIONS ---------------------\\
  async componentDidMount(): Promise<void> {
    // load modules
    type MapModules = [
      typeof import("esri/portal/Portal"),
      typeof import("esri/identity/OAuthInfo"),
      typeof import("esri/identity/IdentityManager")
    ];

    const [Portal, OAuthInfo, IdentityManager] = await (loadModules([
      "esri/portal/Portal",
      "esri/identity/OAuthInfo",
      "esri/identity/IdentityManager"
    ]) as Promise<MapModules>);


    var info = new OAuthInfo({
      appId: "n5A1575tmQq5eFPd",
      popup: false
    });

    var that = this;

    IdentityManager.registerOAuthInfos([info]);
    IdentityManager.getCredential(info.portalUrl + "/sharing");
    IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
      .then(() => {
        var portal = new Portal();
        // Setting authMode to immediate signs the user in once loaded
        portal.authMode = "immediate";
        // Once loaded, user is signed in
        portal.load().then(function () {
          // set state and form of email and name
          that.setState({
            name: portal.user.fullName,
            email: portal.user.email
          });
        });
      })
  };

  async componentWillUnmount(): Promise<void> {
    // load modules
    type MapModules = [
      typeof import("esri/identity/OAuthInfo"),
      typeof import("esri/identity/IdentityManager")
    ];
    const [OAuthInfo, IdentityManager] = await (loadModules([
      "esri/identity/OAuthInfo",
      "esri/identity/IdentityManager"
    ]) as Promise<MapModules>);

    // destroy credentials
    var info = new OAuthInfo({
      appId: "n5A1575tmQq5eFPd",
      popup: false
    });
    IdentityManager.registerOAuthInfos([info]);
    IdentityManager.destroyCredentials();

    // reload
    window.location.reload();
  }


  render() {
    return (
      <Router>
        <Header />
        <div>{!!this.state.email && !!this.state.name ?

          <Switch>
            <Route exact path="/">
              <Home n={this.state.name} e={this.state.email} />
            </Route>
            <Route exact path="/settings">
              <Settings n={this.state.name} e={this.state.email} />
            </Route>
            <Route exact path="/results">
              <ResultTable n={this.state.name} e={this.state.email} />
            </Route>
          </Switch>

          : (
            <div className="center" >
              <Spinner color="warning" style={{ width: '3rem', height: '3rem' }} />
            </div>
          )}</div>
      </Router>
    )
  }
}
export default App;
