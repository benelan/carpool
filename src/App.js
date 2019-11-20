import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loadModules } from "esri-loader";
import { Spinner } from "reactstrap";
import Header from "./components/Header";
import Settings from "./components/Settings";
import ResultTable from "./components/ResultTable";

class App extends Component {

  state = {
    name: 1,
    email: null
  }

    //--------------------- LIFE CYCLE FUNCTIONS ---------------------\\
    componentDidMount() {
      loadModules(["esri/portal/Portal", "esri/identity/OAuthInfo", "esri/identity/IdentityManager"])
        .then(([Portal, OAuthInfo, IdentityManager]) => {
          var info = new OAuthInfo({
            appId: "n5A1575tmQq5eFPd",
            popup: false
          });
  
          var that = this;
          
          IdentityManager.registerOAuthInfos([info]);
          IdentityManager.getCredential(info.portalUrl + "/sharing");
          IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
            .then((e) => {
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
           
        })
        .catch(err => {
          // handle any errors
          console.error(err);
        });
        console.log(this.state)
    };
  
    componentWillUnmount() {
      loadModules(["esri/identity/OAuthInfo", "esri/identity/IdentityManager"])
        .then(([OAuthInfo, IdentityManager]) => {
          var info = new OAuthInfo({
            appId: "n5A1575tmQq5eFPd",
            popup: false
          });
          IdentityManager.registerOAuthInfos([info]);
          IdentityManager.destroyCredentials();
        });
       
      window.location.reload();
    }
  

  render() {
    const center = {
      // margin: "auto",
      // padding: "1px",
      // width: "50%",
      // left: "50%",
      bottom: "50px"
    };

    const { name, email } = this.state
    return !!email  && !!name ? 
    <div>
    <Header />
    <Router>

          <Switch>
            <Route exact path="/settings">
              <Settings n={this.state.name} e={this.state.email} />
            </Route>
            <Route exact path="/results">
              <ResultTable n={this.state.name} e={this.state.email} />
            </Route>
          </Switch>

      </Router>
      </div>
    : (
      <div className="center" >
      <Spinner color="warning" style={{ width: '3rem', height: '3rem' }} />
      </div>
    )
  }
}
export default App;
