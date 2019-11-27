import React, { Component } from "react";
import { Col, Row, Button, FormGroup, Label, Input, UncontrolledPopover, PopoverBody } from "reactstrap";
import { Redirect } from "react-router-dom";
import { loadModules, loadCss } from "esri-loader";
import axios from "axios";

class Settings extends Component {
  //--------------------- STATE---------------------\\
  state = {
    new_user: true,
    form_complete: false,
    searchWidget: null,
    point_id: null,
    line_id: null,
    driver: 1,
    office_id: 1,
    office_old: null,
    arrive_work: "09:00",
    leave_work: "17:00",
    lat: null,
    lon: null,
    start_addr: null,
    route: null
  };

  //--------------------- LIFE CYCLE FUNCTIONS ---------------------\\
  componentDidMount() {
    loadCss();
    this.getUserByEmail();
  }

  componentWillUnmount() {
    this.setState({ searchWidget: null });
  }

  //--------------------- CRUD OPERATIONS ---------------------\\
  addUser = () => {
    //--------------------- ROUTE ---------------------\\
    if (!!this.state.route) {
      const serviceUrl2 = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/addFeatures?f=json';
      const proxyUrl2 = 'https://belan2.esri.com/DotNet/proxy.ashx?'
      let url2 = proxyUrl2 + serviceUrl2;

      const data2 = [{
        "geometry": this.state.route.geometry,
        'attributes': {
          'email': this.props.e,
          'travel_minutes': this.state.route.attributes.Total_TravelTime,
          'travel_miles': this.state.route.attributes.Total_Miles,
        }
      }];

      const querystring2 = 'features=' + JSON.stringify(data2);
      axios
        .post(url2, querystring2)
        .catch(err => {
          // handle any errors
          console.error(err);
        });
    }

    //--------------------- Line ---------------------\\
    const serviceUrl = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/addFeatures?f=json&features=';
    const proxyUrl = 'https://belan2.esri.com/DotNet/proxy.ashx?'
    let url = proxyUrl + serviceUrl;

    const data = [{
      "geometry": {
        "x": this.state.lon,
        "y": this.state.lat,
        "spatialReference": {
          "wkid": 4326
        }
      },
      'attributes': {
        'name': this.props.n,
        'email': this.props.e,
        'arrive_work': this.state.arrive_work,
        'leave_work': this.state.leave_work,
        'driver': parseInt(this.state.driver),
        'office_id': parseInt(this.state.office_id),
        'start_addr': encodeURIComponent(this.state.start_addr)
      }
    }]

    url += JSON.stringify(data)

    axios
      .post(url, JSON.stringify(data))
      .then(() => {
        this.setState({ new_user: false, form_complete: true });
      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  };

  updateUser = () => {
    //--------------------- ROUTE ---------------------\\
    if (!!this.state.route) {
      const serviceUrl2 = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/updateFeatures?f=json';
      const proxyUrl2 = 'https://belan2.esri.com/DotNet/proxy.ashx?'
      let url2 = proxyUrl2 + serviceUrl2;

      const data2 = [{
        "geometry": this.state.route.geometry,
        'attributes': {
          'OBJECTID': this.state.line_id,
          'email': this.props.e,
          'travel_minutes': this.state.route.attributes.Total_TravelTime,
          'travel_miles': this.state.route.attributes.Total_Miles,
        }
      }];

      const querystring2 = 'features=' + JSON.stringify(data2);
      axios
        .post(url2, querystring2)
        .catch(err => {
          // handle any errors
          console.error(err);
        })
        .catch(err => {
          console.log(err)
        });
    }


    //--------------------- POINT ---------------------\\
    const serviceUrl = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/updateFeatures?f=json&features=';
    const proxyUrl = 'https://belan2.esri.com/DotNet/proxy.ashx?'
    let url = proxyUrl + serviceUrl;

    const data = [{
      "geometry": {
        "x": this.state.lon,
        "y": this.state.lat,
        "spatialReference": {
          "wkid": 4326
        }
      },
      'attributes': {
        'OBJECTID': this.state.point_id,
        'name': this.props.n,
        'email': this.props.e,
        'arrive_work': this.state.arrive_work,
        'leave_work': this.state.leave_work,
        'driver': parseInt(this.state.driver),
        'office_id': parseInt(this.state.office_id),
        'start_addr': encodeURIComponent(this.state.start_addr)
      }
    }];

    url += JSON.stringify(data)

    axios
      .post(url, JSON.stringify(data))
      .then(() => {
        this.setState({ form_complete: true });
      })
      .catch(err => {
        // handle any errors
        console.error(err);
      })
      .catch(err => {
        console.log(err)
      });
  };

  getUserByEmail = () => {
    //--------------------- POINT ---------------------\\
    const serviceUrl = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/query?';
    const proxyUrl = 'https://belan2.esri.com/DotNet/proxy.ashx?'
    let url = proxyUrl + serviceUrl;

    const data = {
      "f": "json",
      'where': "email='" + this.props.e + "'",
      'outFields': "*"
    };

    const query = Object.keys(data)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

    url = url + query;

    axios.get(url)
      .then(res => {
        const users = res.data.features;
        // fill in form and state with settings saved in db
        loadModules(["esri/widgets/Search"])
          .then(([Search]) => {
            if (users.length > 0) {  // check to see if user is already saved
              const user = users[0].attributes

              // populate form with user data
              this.setState({
                point_id: user.OBJECTID,
                office_id: user.office_id,
                office_old: user.office_id,
                driver: user.driver,
                arrive_work: user.arrive_work,
                leave_work: user.leave_work,
                new_user: false,
                start_addr: user.start_addr,
                searchWidget: Search({
                  container: document.getElementById("startLoc"),
                  searchTerm: user.start_addr
                })
              });

              // the request promise seems to resolve after the component mounts
              // so need to manually change the form values
              document.getElementById("officeSelect").value = user.office_id;
              document.getElementById("driverSelect").value = user.driver;
              document.getElementById("arriveTime").value = user.arrive_work;
              document.getElementById("leaveTime").value = user.leave_work;
            }
            else {
              // set up blank Search Widget if new user
              this.setState({
                searchWidget: Search({
                  container: document.getElementById("startLoc")
                })
              });
            }
          });
      })
      .catch(err => {
        console.log(err)
      });
    //--------------------- Line ---------------------\\
    const serviceUrl2 = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/query?';
    const proxyUrl2 = 'https://belan2.esri.com/DotNet/proxy.ashx?'
    let url2 = proxyUrl2 + serviceUrl2;

    const data2 = {
      "f": "json",
      'where': "email='" + this.props.e + "'",
      'outFields': "*"
    };

    const query2 = Object.keys(data2)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data2[k]))
      .join('&');

    url2 = url2 + query2;

    axios.get(url2)
      .then(res => {
        const users = res.data.features;
        // fill in form and state with settings saved in db
        if (users.length > 0) {  // check to see if user is already saved
          const user = users[0].attributes

          // populate form with user data
          this.setState({
            line_id: user.OBJECTID,
          });
        }
      })
      .catch(err => {
        console.log(err)
      });
  };

  //--------------------- SUBMIT HANDLER ---------------------\\
  submitF = () => {
    // load esri modules
    loadModules([
      "esri/widgets/Search",
      "esri/tasks/RouteTask",
      "esri/tasks/support/RouteParameters",
      "esri/tasks/support/FeatureSet",
      "esri/Graphic"
    ]).then(([Search, RouteTask, RouteParameters, FeatureSet, Graphic]) => {
      var that = this;
      const address = document.getElementById("startLoc").value;
      // search the address that was input
      this.state.searchWidget.search(address).then(event => {
        // get the lat/lon and address
        const lat = event.results[0].results[0].feature.geometry.latitude;
        const lon = event.results[0].results[0].feature.geometry.longitude;
        const addr = event.results[0].results[0].feature.attributes.Match_addr;

        // if the address didn't change
        if ((addr === that.state.start_addr) && (that.state.office_id === that.state.office_old)) {
          that.setState({
            lat: lat,
            lon: lon,
            start_addr: addr
          });

          // REST CALLS HERE
          if (that.state.new_user) {
            // if the user is not in the db, add the user
            that.addUser();
          } else {
            // if the user is in the db, update the user info
            that.updateUser();
          }
        }

        // if the address changed
        else {
          that.setState({
            lat: lat,
            lon: lon,
            start_addr: addr
          });
          var routeTask = new RouteTask({
            url:
              "https://utility.arcgis.com/usrsvcs/appservices/w2zxoNZu0ai45kI5/rest/services/World/Route/NAServer/Route_World/solve"
          });

          // Setup the route parameters
          var routeParams = new RouteParameters({
            stops: new FeatureSet(),
            outSpatialReference: {
              // autocasts as new SpatialReference()
              wkid: 4326
            }
          });

          const startPoint = {
            type: "point", // autocasts as Point
            longitude: lon,
            latitude: lat,
            spatialReference: {
              wkid: 4326
            }
          };

          var start = new Graphic({
            geometry: startPoint
          });

          const officeCoords = {
            1: [-117.1946114, 34.057267],
            2: [-117.2180851, 34.0692566],
            3: [-80.7835061, 35.100138],
            4: [-77.0714945, 38.897275],
            5: [-73.9947568, 40.7542076]
          }

          const endPoint = {
            type: "point", // autocasts as Point
            longitude: officeCoords[that.state.office_id][0],
            latitude: officeCoords[that.state.office_id][1],
            spatialReference: {
              wkid: 4326
            }
          };

          var end = new Graphic({
            geometry: endPoint
          });

          // add start/office stops
          routeParams.stops.features.push(start);
          routeParams.stops.features.push(end);
          // calc route
          routeTask.solve(routeParams).then((res) => {
            that.setState({ route: res.routeResults[0].route });
            // REST CALLS HERE
            if (that.state.new_user) {
              // if the user is not in the db, add the user
              that.addUser();
            } else {
              // if the user is in the db, update the user info
              that.updateUser();
            }
          })
            .catch((err) => {
              alert(err.message)
            });
        }
      });
    });
  };

  //--------------------- JSX ---------------------\\
  render() {
    const startLoc = {
      backgroundColor: "white",
      padding: "1px",
      border: "1px solid lightgrey",
      borderRadius: "4px",
      width: "75%"
    };

    const submitB = {
      position: 'absolute',
      bottom: '15px',
      right: '20px'
    };
    const infoB = {
      margin: "0 0 0 5px"
    };

    const settingStyle = {
      margin: "20px"
    };

    if (this.state.form_complete === true) {
      return <Redirect to='/results' />
    }
    return (
      <Row className="justify-content-md-center" style={settingStyle}>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <p>
                <b>This information will be used to match you with a carpool buddy!</b>
              </p>
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
                  readOnly
                  //onChange={e => this.setState({ new_user: true, name: e.target.value })}
                  defaultValue={this.props.n}
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
                  readOnly
                  //onChange={e => this.setState({ new_user: true, email: e.target.value })}
                  defaultValue={this.props.e}
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
                  onChange={e => this.setState({ arrive_work: e.target.value })}
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
                  onChange={e => this.setState({ leave_work: e.target.value })}
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
                  onChange={e => this.setState({ driver: e.target.value })}
                >
                  <option value={1}>Driver</option>
                  <option value={2}>Passenger</option>
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
                  onChange={e => this.setState({ office_id: e.target.value })}
                  defaultValue={this.state.office_id}
                >
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
            <Col md={8}>
              <FormGroup>
                <Label for="startLocation">Pickup Location</Label>
                <Button id="PopoverFocus" size="sm" color="link" style={infoB}>help</Button>
                <UncontrolledPopover trigger="focus" placement="auto" target="PopoverFocus">
                  <PopoverBody> Use the search bar below and select a dropdown
                  option. If you have privacy concerns, you can use a cross street
                or store</PopoverBody>
                </UncontrolledPopover>
                <div id="startLoc" style={startLoc} className="form-control"></div>
              </FormGroup>
            </Col>
            <Col md={4}>
              <Button
                color="success"
                style={submitB}
                className='float-right'
                onClick={() => this.submitF()}>Save
            </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Settings;
