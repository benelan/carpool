import React, { Component } from 'react';
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';
import { loadModules, loadCss } from 'esri-loader';
import axios from 'axios';


class Settings extends Component {

  //--------------------- STATE---------------------\\
  state = {
    searchWidget: null,
    data: [],
    id: 0,
    username: null,
    driver: 1,
    office_id: 1,
    arrive_work: '09:00',
    leave_work: '17:00',
    route: null
  };

  //--------------------- LIFE CYCLE FUNCTIONS ---------------------\\
  componentDidMount() {
    this.getDataFromDb();

    // initialize JS API search widget
    loadCss();
    loadModules(["esri/portal/Portal", "esri/identity/OAuthInfo", "esri/identity/IdentityManager", "esri/widgets/Search"])
      .then(([Portal, OAuthInfo, IdentityManager, Search]) => {

        var info = new OAuthInfo({
          appId: "n5A1575tmQq5eFPd",
          popup: false
        });
        IdentityManager.registerOAuthInfos([info]);
        IdentityManager.getCredential(info.portalUrl + "/sharing");
        IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
          .then(e => this.setState({ username: e.userId }))

        var portal = new Portal();
        // Setting authMode to immediate signs the user in once loaded
        portal.authMode = "immediate";
        // Once loaded, user is signed in
        portal.load().then(function () {
          document.getElementById('userEmail').value = portal.user.email;
          document.getElementById('userName').value = portal.user.fullName;
          console.log(portal.user)
          this.getDataforUser(portal.user.email);
        });

        this.setState({
          searchWidget: Search({
            container: document.getElementById("startLoc")
            //searchTerm: 'current address'
          })
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

  getDataforUser = (em) => {
    fetch('http://localhost:3001/api/getOneUser', {
      email: em
    }).then((data) => data.json())
    .then((res) => {
      console.log(res);

      this.setState({ 
      arrive_work: res.arrive_work, 
      leave_work: res.leave_work,
      office_id: res.office_id,
      driver: res.driver
    
    })
  });
  
  };

  updateDB = (mid, na, em, arrive, leave, driver, office, lat, lon, start, rt) => {
      axios.post('http://localhost:3001/api/updateUser', {
        id: mid,
        update: {
          name: na,
          email: em,
          arrive_work: arrive,
          leave_work: leave,
          driver: parseInt(driver),
          office_id: parseInt(office),
          lat: lat,
          lon: lon,
          start_addr: start,
          route: rt
        }
      })
        .catch(err => {
          // handle any errors
          console.error(err);
        });
  };


  // deleteFromDB = (idTodelete) => {
  //   parseInt(idTodelete);
  //   let objIdToDelete = null;
  //   this.state.data.forEach((dat) => {
  //     if (dat.id == idTodelete) {
  //       objIdToDelete = dat._id;
  //     }
  //   });

  //   axios.delete('http://localhost:3001/api/deleteUser', {
  //     data: {
  //       id: objIdToDelete,
  //     },
  //   });
  // };

  addDataToDB = (na, em, arrive, leave, driver, office, lat, lon, start, rt) => {
    // find the user's id
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    // post data
    axios.post('http://localhost:3001/api/addUser', {
      id: idToBeAdded,
      name: na,
      email: em,
      arrive_work: arrive,
      leave_work: leave,
      driver: parseInt(driver),
      office_id: parseInt(office),
      lat: lat,
      lon: lon,
      start_addr: start,
      route: rt
    })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  };

  submitF = () => {
    // variables
    const em = document.getElementById('userEmail').value;
    const na = document.getElementById('userName').value;
    const address = document.getElementById("startLoc").value;
    let addr;
    let lat;
    let lon;

    // load esri modules
    loadModules(["esri/widgets/Search", "esri/tasks/RouteTask", "esri/tasks/support/RouteParameters", "esri/tasks/support/FeatureSet", "esri/Graphic"])
      .then(([Search, RouteTask, RouteParameters, FeatureSet, Graphic]) => {
        // search the address that was input
        this.state.searchWidget.search(address).then((event) => {
          // get the lat/lon and address
          lat = event.results[0].results[0].feature.geometry.latitude;
          lon = event.results[0].results[0].feature.geometry.longitude;
          addr = event.results[0].results[0].feature.attributes.Match_addr;

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
            if (dat.email == em) {
              objIdToUpdate = dat._id; // if it is get the user's id
            }
          });

          if (objIdToUpdate === null) {  // if the user is not in the db
            // add the user
            this.addDataToDB(na, em, this.state.arrive_work, this.state.leave_work, this.state.driver, this.state.office_id, lat, lon, addr, 'testing')
          }
          else {  // if the user is in the db
            // update the user info
            this.updateDB(objIdToUpdate, na, em, this.state.arrive_work, this.state.leave_work, this.state.driver, this.state.office_id, lat, lon, addr, 'null')
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