import React from "react";
import { Col, Row, Button, FormGroup, Label, Input, UncontrolledPopover, PopoverBody } from "reactstrap";
import { Redirect } from "react-router-dom";
import { loadModules, loadCss } from "esri-loader";
import axios from "axios";
import { observer, inject } from 'mobx-react'
import UserStore from '../store/UserStore';

type MyState = {
  searchWidget: import("esri/widgets/Search") | null,
  form_complete: Boolean,
  office_old: number,
  route: any | null,  // needs to cast as geometry for arcgis query
  lon: number | null,
  lat: number | null,
};

type MyProps = {
  UserStore?: UserStore
};

const Settings = inject("UserStore")(observer(
class Settings extends React.Component<MyProps, MyState> {
  //--------------------- STATE---------------------\\
  state: MyState = {
    form_complete: false,
    searchWidget: null,
    office_old: this.props.UserStore!.officeId,
    lat: null,
    lon: null,
    route: null
  };

  proxyUrl: string = 'https://belan2.esri.com/DotNet/proxy.ashx?'

  //--------------------- LIFE CYCLE FUNCTIONS ---------------------\\
  componentDidMount() {
    loadCss();
    loadModules(["esri/widgets/Search"])
    .then(([Search]) => {
        this.setState({
          searchWidget: Search({
            container: document.getElementById("startLoc"),
            searchTerm: this.props.UserStore!.address
          })
        });
      })
  }

  componentWillUnmount() {
    this.setState({ searchWidget: null });
  }

  //--------------------- CRUD OPERATIONS ---------------------\\
  async addUser(): Promise<void> {
    //--------------------- ROUTE ---------------------\\
    if (!!this.state.route) {
      const serviceUrl2: string = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/addFeatures?f=json';
      let url2: string = this.proxyUrl + serviceUrl2;

      const data2: any = [{
        "geometry": this.state.route.geometry,
        'attributes': {
          'email': this.props.UserStore!.userEmail,
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

    //--------------------- Point ---------------------\\
    const serviceUrl: string = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/addFeatures?f=json&features='
    let url: string = this.proxyUrl + serviceUrl;

    
    const success_val = (this.props.UserStore!.successful) ? 1 : 0;
    const data: any = [{
      "geometry": {
        "x": this.state.lon,
        "y": this.state.lat,
        "spatialReference": {
          "wkid": 4326
        }
      },
      'attributes': {
        'name': this.props.UserStore!.userName,
        'email': this.props.UserStore!.userEmail,
        'arrive_work': this.props.UserStore!.arrive,
        'leave_work': this.props.UserStore!.leave,
        'driver': this.props.UserStore!.driver,
        'office_id': this.props.UserStore!.officeId,
        'start_addr': encodeURIComponent(this.props.UserStore!.address),
        'success': success_val
      }
    }]

    url += JSON.stringify(data)

    axios
      .post(url, JSON.stringify(data))
      .then(() => {
        this.props.UserStore!.setNew(false);
        this.setState({ form_complete: true });
      })
      .catch((err: any) => {
        // handle any errors
        console.log(err);
      });
  };

  async updateUser(): Promise<void> {
    //--------------------- ROUTE ---------------------\\
    if (!!this.state.route) {
      const serviceUrl2: string = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/updateFeatures?f=json';
      let url2: string = this.proxyUrl + serviceUrl2;

      const data2: any = [{
        "geometry": this.state.route.geometry,
        'attributes': {
          'OBJECTID': this.props.UserStore!.lineId,
          'email': this.props.UserStore!.userEmail,
          'travel_minutes': this.state.route.attributes.Total_TravelTime,
          'travel_miles': this.state.route.attributes.Total_Miles,
        }
      }];

      const querystring2: string = 'features=' + JSON.stringify(data2);
      await axios
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

    // 0 = FALSE .... 1 = TRUE
    const success_val = (this.props.UserStore!.successful) ? 1 : 0;

    const data: any = [{
      "geometry": {
        "x": this.state.lon,
        "y": this.state.lat,
        "spatialReference": {
          "wkid": 4326
        }
      },
      'attributes': {
        'OBJECTID': this.props.UserStore!.pointId,
        'name': this.props.UserStore!.userName,
        'email': this.props.UserStore!.userEmail,
        'arrive_work': this.props.UserStore!.arrive,
        'leave_work': this.props.UserStore!.leave,
        'driver': this.props.UserStore!.driver,
        'office_id': this.props.UserStore!.officeId,
        'start_addr': encodeURIComponent(this.props.UserStore!.address),
        'success': success_val
      }
    }];

    url += JSON.stringify(data)

    await axios
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

      that.setState({
        lat: lat,
        lon: lon
      });
      // if the address didn't change
      if ((addr === that.props.UserStore!.address) && (that.props.UserStore!.officeId === that.state.office_old)) {
        // REST CALLS HERE
        if (that.props.UserStore!.userNew) {
          // if the user is not in the db, add the user
          that.addUser();
        } else {
          // if the user is in the db, update the user info
          that.updateUser();
        }
      }

      // if the address changed
      else {
        this.props.UserStore!.setAddress(addr);
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
          longitude: officeCoords[that.props.UserStore!.officeId][0],
          latitude: officeCoords[that.props.UserStore!.officeId][1],
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
          that.props.UserStore!.setRoute(res.routeResults[0].route.geometry)

          // REST CALLS HERE
          if (that.props.UserStore!.userNew) {
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

  //--------------------- JSX ---------------------\\
  render() {
    //------------------------------------------ CSS STYLE ------------------------------------------\\
    const startLoc = {
      backgroundColor: "white",
      padding: "1px",
      border: "1px solid lightgrey",
      borderRadius: "4px",
      width: "75%"
    };

    const marg = {
      margin: "50px 20px 20px 20px"
    };

    const submitB: any = {
      position: "absolute",
      bottom: "15px",
      right: "20px"
    };
    const infoB = {
      margin: "0 0 0 5px"
    };

     //------------------------------------------ REDIRECT ------------------------------------------\\
    if (this.state.form_complete) {
      return <Redirect to='/results' />
    }

    if (this.props.UserStore!.offsite) {
      alert('This app currently only works on the internal Esri network')
      return <Redirect to='/home' />
    }
    return (
      <Row className="justify-content-md-center" style={marg}>
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
                  defaultValue={this.props.UserStore!.userName}
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
                  defaultValue={this.props.UserStore!.userEmail}
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
                  onChange={e => this.props.UserStore!.setArrive(e.target.value)}
                  defaultValue={this.props.UserStore!.arrive}
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
                  onChange={e => this.props.UserStore!.setLeave(e.target.value)}
                  defaultValue={this.props.UserStore!.leave}
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
                  defaultValue={this.props.UserStore!.driver}
                  onChange={e => this.props.UserStore!.setDriver(parseInt(e.target.value))}>
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
                  defaultValue={this.props.UserStore!.officeId}
                  onChange={e => this.props.UserStore!.setOffice(parseInt(e.target.value))}>
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
                <UncontrolledPopover target="PopoverFocus">
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
                  checked={this.props.UserStore!.successful}
                  onChange={e => this.props.UserStore!.setSuccess(!this.props.UserStore!.successful)}
                  />Found a Ride (Remove from List)
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
))

export default Settings;
