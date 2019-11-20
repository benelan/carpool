import React, { Component } from 'react';
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';
import { loadModules, loadCss } from 'esri-loader';
import axios from 'axios';


class Settings extends Component {

  //--------------------- STATE---------------------\\
  state = {
    searchWidget: null,
    data: [],
    name: null,
    email: null,
    driver: 1,
    office_id: 1,
    arrive_work: '09:00',
    leave_work: '17:00',
    lat: null,
    lon: null,
    start_addr: null,
    route: 'testing'
  };


  //--------------------- LIFE CYCLE FUNCTIONS ---------------------\\
  componentDidMount() {
    this.getDataFromDb();

    // initialize JS API search widget
    loadCss();
    loadModules(["esri/portal/Portal", "esri/identity/OAuthInfo", "esri/identity/IdentityManager", "esri/widgets/Search"])
      .then(([Portal, OAuthInfo, IdentityManager, Search]) => {
        this.setState({
          searchWidget: Search({
            container: document.getElementById("startLoc")
            //searchTerm: 'current address'
          })
        })

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

              // get user info based on email
              axios.get('http://localhost:3001/api/getOneUser', {
                params: {
                  email: portal.user.email
                }
              }).then((res) => {
                const user = res.data.data;
                // fill in form and state with settings saved in db
                if (!!user) { // check to see if user is already saved
                  that.setState({
                    office_id: user.office_id,
                    driver: user.driver,
                    arrive_work: user.arrive_work,
                    leave_work: user.leave_work,
                  });

                  // the request promise seems to resolve after the component mounts
                  // so need to manually change the form values
                  document.getElementById('officeSelect').value = user.office_id;
                  document.getElementById('driverSelect').value = user.driver;
                  document.getElementById('arriveTime').value = user.arrive_work;
                  document.getElementById('leaveTime').value = user.leave_work;
                }
              });
            });
          })
      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });

  };

  componentWillUnmount() {
    this.setState({ searchWidget: null });
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


  //--------------------- CRUD OPERATIONS ---------------------\\
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getAllUsers')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  updateDB = (mid) => {
    axios.post('http://localhost:3001/api/updateUser', {
      id: mid,
      update: {
        name: this.state.name,
        email: this.state.email,
        arrive_work: this.state.arrive_work,
        leave_work: this.state.leave_work,
        driver: parseInt(this.state.driver),
        office_id: parseInt(this.state.office_id),
        lat: this.state.lat,
        lon: this.state.lon,
        start_addr: this.state.start_addr,
        route: this.state.route
      }
    })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  };

  addDataToDB = () => {
    // find the user's id
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    // post data
    axios.post('http://localhost:3001/api/addUser', {
      id: idToBeAdded,
      name: this.state.name,
      email: this.state.email,
      arrive_work: this.state.arrive_work,
      leave_work: this.state.leave_work,
      driver: parseInt(this.state.driver),
      office_id: parseInt(this.state.office_id),
      lat: this.state.lat,
      lon: this.state.lon,
      start_addr: this.state.start_addr,
      route: this.state.route
    })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  };


  //--------------------- SUBMIT HANDLER ---------------------\\
  submitF = () => {
    // load esri modules
    loadModules(["esri/widgets/Search", "esri/tasks/RouteTask", "esri/tasks/support/RouteParameters", "esri/tasks/support/FeatureSet", "esri/Graphic"])
      .then(([Search, RouteTask, RouteParameters, FeatureSet, Graphic]) => {
        var that = this;
        const address = document.getElementById("startLoc").value;
        // search the address that was input
        this.state.searchWidget.search(address).then((event) => {
          // get the lat/lon and address
          const lat = event.results[0].results[0].feature.geometry.latitude;
          const lon = event.results[0].results[0].feature.geometry.longitude;
          const addr = event.results[0].results[0].feature.attributes.Match_addr;

          that.setState({
            lat: lat,
            lon: lon,
            start_addr: addr
          });

          // var routeTask = new RouteTask({
          //   url:
          //     "https://utility.arcgis.com/usrsvcs/appservices/w2zxoNZu0ai45kI5/rest/services/World/Route/NAServer/Route_World/solve"
          // });
          // // Setup the route parameters
          // var routeParams = new RouteParameters({
          //   stops: new FeatureSet(),
          //   outSpatialReference: {
          //     // autocasts as new SpatialReference()
          //     wkid: 3857
          //   }
          // });

          // const startPoint = {
          //   type: "point", // autocasts as Point
          //   longitude: lon,
          //   latitude: lat,
          //   spatialReference: {
          //     wkid: 3857
          //   }
          // };

          // var start = new Graphic({
          //   geometry: startPoint
          // });

          // const officeCoords = {
          //   1: [-117.1946114, 34.057267],
          //   2: [-117.2180851, 34.0692566],
          //   3: [-80.7835061, 35.100138],
          //   4: [-77.0714945, 38.897275],
          //   5: [-73.9947568, 40.7542076]
          // }

          // const endPoint = {
          //   type: "point", // autocasts as Point
          //   longitude: officeCoords[this.state.office_id][0],
          //   latitude: officeCoords[this.state.office_id][1],
          //   spatialReference: {
          //     wkid: 3857
          //   }
          // };

          // var end = new Graphic({
          //   geometry: endPoint
          // });

          // routeParams.stops.features.push(start);
          // routeParams.stops.features.push(end);
          // routeTask.solve(routeParams).then((res) => {
          //     //REST CALLS HERE
          // })

          let objIdToUpdate = null;
          this.state.data.forEach((dat) => { // check to see if email is already in db
            if (dat.email == this.state.email) {
              objIdToUpdate = dat._id; // if it is get the user's id
            }
          });

          if (objIdToUpdate === null) {  // if the user is not in the db
            // add the user
            this.addDataToDB()
          }
          else {  // if the user is in the db
            // update the user info
            this.updateDB(objIdToUpdate)
          }
        });
      });
  }

  //--------------------- JSX ---------------------\\
  render() {
    const startLoc = {
      backgroundColor: 'white',
      padding: '1px',
      border: '1px solid lightgrey',
      borderRadius: '4px'
    }

    const settingStyle = {
      margin: '20px'
    }
    return (
      <div style={settingStyle}>
        <Row>
          <Col md={12}>
            <p><b>This information will be used to match you with a carpool buddy!</b></p>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="userName">Name</Label>
              <Input
                type="name"
                name="name"
                id="userName"
                //readOnly
                defaultValue={this.state.name}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="userEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="userEmail"
                //readOnly
                defaultValue={this.state.email}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="arriveTime">Arrive at Work</Label>
              <Input
                type="time"
                name="time"
                id="arriveTime"
                onChange={(e) => this.setState({ arrive_work: e.target.value })}
                defaultValue={this.state.arrive_work}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="leaveTime">Leave Work</Label>
              <Input
                type="time"
                name="time"
                id="leaveTime"
                onChange={(e) => this.setState({ leave_work: e.target.value })}
                defaultValue={this.state.leave_work}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="driver">Select</Label>
              <Input
                type="select"
                name="select"
                id="driverSelect"
                onChange={(e) => this.setState({ driver: e.target.value })}>
                <option value={1}>Driver</option>
                <option value={2}>Passanger</option>
                <option value={3}>Either</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleSelect">Office Location</Label>
              <Input
                type="select"
                name="office"
                id="officeSelect"
                onChange={(e) => this.setState({ office_id: e.target.value })}
                defaultValue={this.state.office_id}>
                <option value={1}>Redlands Main Campus</option>
                <option value={2}>Redlands V Buildings</option>
                <option value={3}>Charlotte</option>
                <option value={4}>Washington D.C.</option>
                <option value={5}>New York City</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="startLocation">Pickup Location (Use the search bar and select a dropdown option. If you have privacy concerns, you can use a cross street or store)</Label>

              <div id="startLoc" style={startLoc}></div>
              <Button color="success" className="float-right" onClick={() => this.submitF()}>Save</Button>
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  };
}

export default Settings;