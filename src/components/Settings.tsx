import React from "react";
import { Col, Row, Button, FormGroup, Label, Input, UncontrolledPopover, PopoverBody } from "reactstrap";
import { Redirect } from "react-router-dom";
import { loadModules, loadCss } from "esri-loader";
import axios from "axios";

type MyState = {
  searchWidget: import("esri/widgets/Search") | null,
  new_user: Boolean,
  form_complete: Boolean,
  point_id: number | null,
  line_id: number | null,
  office_id: number,
  office_old: number | null,
  driver: number,
  arrive_work: string,
  leave_work: string,
  route: any | null,  // needs to cast as geometry for arcgis query
  start_addr: string,
  lon: number | null,
  lat: number | null,
  success: boolean;
};

type MyProps = {
  e: string,
  n: string;
};

class Settings extends React.Component<MyProps, MyState> {
  //--------------------- STATE---------------------\\
  state: MyState = {
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
    start_addr: "",
    route: null,
    success: false
  };

  proxyUrl: string = 'https://belan2.esri.com/DotNet/proxy.ashx?'

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
      const serviceUrl2: string = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/addFeatures?f=json';
      let url2: string = this.proxyUrl + serviceUrl2;

      const data2: any = [{
        "geometry": this.state.route.geometry,
        'attributes': {
          'email': this.props.e,
          'travel_minutes': this.state.route.attributes.Total_TravelTime,
          'travel_miles': this.state.route.attributes.Total_Miles,
        }
      }];

      const querystring2: string = 'features=' + JSON.stringify(data2);
      axios
        .post(url2, querystring2)
        .catch((err: any) => {
          // handle any errors
          console.error(err);
        });
    }

    //--------------------- Line ---------------------\\
    const serviceUrl: string = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/addFeatures?f=json&features='
    let url: string = this.proxyUrl + serviceUrl;
    const success_val = (this.state.success) ? 1 : 0;
    const data: any = [{
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
        'driver': this.state.driver,
        'office_id': this.state.office_id,
        'start_addr': encodeURIComponent(this.state.start_addr),
        'success': success_val
      }
    }]

    url += JSON.stringify(data)

    axios
      .post(url, JSON.stringify(data))
      .then(() => {
        this.setState({ new_user: false, form_complete: true });
      })
      .catch((err: any) => {
        // handle any errors
        console.log(err);
      });
  };

  updateUser = () => {
    //--------------------- ROUTE ---------------------\\
    if (!!this.state.route) {
      const serviceUrl2: string = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/updateFeatures?f=json';
      let url2: string = this.proxyUrl + serviceUrl2;

      const data2: any = [{
        "geometry": this.state.route.geometry,
        'attributes': {
          'OBJECTID': this.state.line_id,
          'email': this.props.e,
          'travel_minutes': this.state.route.attributes.Total_TravelTime,
          'travel_miles': this.state.route.attributes.Total_Miles,
        }
      }];

      const querystring2: string = 'features=' + JSON.stringify(data2);
      axios
        .post(url2, querystring2)
        .catch((err: any) => {
          // handle any errors
          console.error(err);
        })
        .catch((err: any) => {
          console.log(err)
        });
    }


    //--------------------- POINT ---------------------\\
    const serviceUrl: string = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/updateFeatures?f=json&features='
    let url: string = this.proxyUrl + serviceUrl;

    const success_val = (this.state.success) ? 1 : 0;

    const data: any = [{
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
        'driver': this.state.driver,
        'office_id': this.state.office_id,
        'start_addr': encodeURIComponent(this.state.start_addr),
        'success': success_val
      }
    }];

    url += JSON.stringify(data)

    axios
      .post(url, JSON.stringify(data))
      .then(() => {
        this.setState({ form_complete: true });
      })
      .catch((err: any) => {
        // handle any errors
        console.error(err);
      })
      .catch((err: any) => {
        console.log(err)
      });
  };

  getUserByEmail = () => {
    //--------------------- POINT ---------------------\\
    const serviceUrl: string = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/query?'
    let url: string = this.proxyUrl + serviceUrl;

    const data: any = {
      "f": "json",
      'where': "email='" + this.props.e + "'",
      'outFields': "*"
    };

    const query: string = Object.keys(data)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

    url = url + query;

    axios.get(url)
      .then((res: any) => {
        const users: any = res.data.features;
        // fill in form and state with settings saved in db
        loadModules(["esri/widgets/Search"])
          .then(([Search]) => {
            if (users.length > 0) {  // check to see if user is already saved
              const user: any = users[0].attributes

              const success_user = (user.success) ? true : false;

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
                }),
                success: success_user
              });

              // the request promise seems to resolve after the component mounts
              // so need to manually change the form values
              (document.getElementById("officeSelect") as HTMLInputElement).value = user.office_id;
              (document.getElementById("driverSelect") as HTMLInputElement).value = user.driver;
              (document.getElementById("arriveTime") as HTMLInputElement).value = user.arrive_work;
              (document.getElementById("leaveTime") as HTMLInputElement).value = user.leave_work;
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
    const serviceUrl2: string = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/query?'
    let url2: string = this.proxyUrl + serviceUrl2;

    const data2: any = {
      "f": "json",
      'where': "email='" + this.props.e + "'",
      'outFields': "*"
    };

    const query2 = Object.keys(data2)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data2[k]))
      .join('&');

    url2 = url2 + query2;

    axios.get(url2)
      .then((res: any) => {
        const users: any = res.data.features;
        // fill in form and state with settings saved in db
        if (users.length > 0) {  // check to see if user is already saved
          const user: any = users[0].attributes

          // populate form with user data
          this.setState({
            line_id: user.OBJECTID,
          });
        }
      })
      .catch((err: any) => {
        console.log(err)
      });
  };

  //--------------------- SUBMIT HANDLER ---------------------\\
  async submitF(): Promise<void> {
    // load esri modules
    type MapModules = [
      typeof import("esri/widgets/Search"),
      typeof import("esri/tasks/RouteTask"),
      typeof import("esri/tasks/support/RouteParameters"),
      typeof import("esri/tasks/support/FeatureSet"),
      typeof import("esri/Graphic")
    ];
    const [Search, RouteTask, RouteParameters, FeatureSet, Graphic] = await (loadModules([
      "esri/widgets/Search",
      "esri/tasks/RouteTask",
      "esri/tasks/support/RouteParameters",
      "esri/tasks/support/FeatureSet",
      "esri/Graphic"
    ]) as Promise<MapModules>);


    var that = this;
    const address = (document.getElementById("startLoc") as HTMLInputElement).value;
    // search the address that was input
    this.state.searchWidget!.search(address).then((event: any) => {
      // get the lat/lon and address
      const lat: number = event.results[0].results[0].feature.geometry.latitude;
      const lon: number = event.results[0].results[0].feature.geometry.longitude;
      const addr: string = event.results[0].results[0].feature.attributes.Match_addr;

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
        var routeParams: any = new RouteParameters({
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

        const officeCoords: any = {
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
        routeTask.solve(routeParams).then((res: any) => {
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
          .catch((err: any) => {
            alert(err.message)
          });
      }
    });
  };


  toggleSuccess = () => {
    this.setState(prevState => ({
      success: !prevState.success
    }));
  }

  //--------------------- JSX ---------------------\\
  render() {
    const startLoc = {
      backgroundColor: "white",
      padding: "1px",
      border: "1px solid lightgrey",
      borderRadius: "4px",
      width: "75%"
    };

    const submitB: any = {
      position: "absolute",
      bottom: "15px",
      right: "20px"
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
                  onChange={e => this.setState({ driver: parseInt(e.target.value) })}
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
                  onChange={e => this.setState({ office_id: parseInt(e.target.value) })}
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
          <Row>
            <Col md={8}>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" 
                  checked={this.state.success}
                  onChange={e => this.setState(prevState => ({
                    success: !prevState.success
                  }))}
                  />{' '}
                  Found a Ride (Remove from List)
        </Label>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Settings;
