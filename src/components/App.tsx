import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { loadModules } from "esri-loader";
import { Spinner } from "reactstrap";
import Header from "./Header";
import Settings from "./Settings";
import Home from "./Home";
import ResultTable from "./ResultTable";
import { observer, inject } from 'mobx-react'
import UserStore from '../store/UserStore';
import axios from "axios";


type MyProps = {
  UserStore?: UserStore
}

const App = inject("UserStore")(observer(
  class App extends React.Component<MyProps> {

    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();
    proxyUrl: string = 'https://belan2.esri.com/DotNet/proxy.ashx?';


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
            that.props.UserStore!.setName(portal.user.fullName)
            that.props.UserStore!.setEmail(portal.user.email)

            that.getUserByEmail();
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

    async getUserByEmail(): Promise<void> {
      //------------------------------------------ POINT ------------------------------------------\\
      const serviceUrl: string = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/query?';

      let url: string = this.proxyUrl + serviceUrl;

      const data: any = {
        "f": "json",
        'where': "email='" + this.props.UserStore!.userEmail + "'",
        'outFields': "*",
        'timestamp': new Date().getTime()
      };

      const query: string = Object.keys(data)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&');

      url = url + query;

      await axios.get(url)
        .then(res => {
          const users: Array<any> = res.data.features;
          if (users.length > 0) {  // check to see if user is already saved
            const user: any = users[0].attributes;
            // populate form with user data
            this.props.UserStore!.setArrive(user.arrive_work)
            this.props.UserStore!.setLeave(user.leave_work)
            this.props.UserStore!.setDriver(user.driver)
            this.props.UserStore!.setOffice(user.office_id)
            this.props.UserStore!.setSuccess(!!user.success)
            this.props.UserStore!.setNew(false);
            this.props.UserStore!.setPointId(user.OBJECTID);
            this.props.UserStore!.setAddress(user.start_addr);
          }
          this.props.UserStore!.setLoaded(true);
        })
        .catch(err => {
          this.props.UserStore!.setLoaded(true);
          this.props.UserStore!.setOffsite(true);
          console.log(err)
        });
      //------------------------------------------ Line ------------------------------------------\\
      const serviceUrl2: string = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/query?';
      let url2: string = this.proxyUrl + serviceUrl2;

      const data2: any = {
        "f": "json",
        'where': "email='" + this.props.UserStore!.userEmail + "'",
        'outFields': "*",
        'returnGeometry': true,
        'timestamp': new Date().getTime()
      };

      const query2: string = Object.keys(data2)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data2[k]))
        .join('&');

      url2 = url2 + query2;

      await axios.get(url2)
        .then(res => {
          const users: Array<any> = res.data.features;
          // fill in form and state with settings saved in db
          if (users.length > 0) {  // check to see if user is already saved
            const user: any = users[0];
            // populate form with user data
            this.props.UserStore!.setLineId(user.attributes.OBJECTID)
            this.props.UserStore!.setRoute({
              spatialReference: res.data.spatialReference,
              paths: user.geometry.paths,
              type: 'polyline'
            })
          }
        })
        .catch(err => {
          console.log(err)
        });
    };

    render() {
      return (
        <Router>
          <Header />
          {!!this.props.UserStore!.userEmail && this.props.UserStore!.loaded ?
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
            </Switch>
            : (
              <div className="center" >
                <Spinner color="warning" style={{ width: '3rem', height: '3rem' }} />
              </div>
            )}
        </Router>
      )
    }
  }))
export default App;
