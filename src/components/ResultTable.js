import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Col, Row, Table, Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import axios from "axios";
import { loadModules } from "esri-loader";
import { convertTime } from "../helpers"

class ResultTable extends Component {

  state = {
    data: [],
    fData: [],
    name: this.props.n,
    email: this.props.e,
    new_user: false,
    point_id: null,
    line_id: null,
    office_id: null,
    driver: null,
    arrive_work: null,
    leave_work: null,
    user_route: null,
    distance: 5,
    units: 'miles',
    time: 30,

  };

  componentDidMount() {
    this.getUserByEmail()
  }
  componentWillUnmount() {

  }

  getData = () => {
    const serviceUrl = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/query?';
    const proxyUrl = 'https://belan2.esri.com/DotNet/proxy.ashx?'
    let url = proxyUrl + serviceUrl;
    const data = {
      "f": "json",
      "returnGeometry": true,
      'where': '1=1',
      'outFields': "*"
    };

    const query = Object.keys(data)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

    url = url + query;

    axios.get(url)
      .then(res => {
        // fill in form and state with settings saved in db
        this.setState({ data: res.data.features });
      }).catch(err => {
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
      'where': "email='" + this.state.email + "'",
      'outFields': "*"
    };

    const query = Object.keys(data)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

    url = url + query;

    axios.get(url)
      .then(res => {
        const users = res.data.features;
        if (users.length > 0) {  // check to see if user is already saved
          const user = users[0].attributes
          // populate form with user data
          this.setState({
            point_id: user.OBJECTID,
            office_id: user.office_id,
            driver: user.driver,
            arrive_work: user.arrive_work,
            leave_work: user.leave_work
          })
        }
        else {
          // set up blank Search Widget if new user
          this.setState({
            new_user: true
          });
        }
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
      'where': "email='" + this.state.email + "'",
      'outFields': "*",
      'returnGeometry': true
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
          const user = users[0]

          // populate form with user data
          this.setState({
            line_id: user.attributes.OBJECTID,
            user_route: {
              spatialReference: res.data.spatialReference,
              paths: user.geometry.paths,
              type: 'polyline'
            }
          });
        }
      })
      .catch(err => {
        console.log(err)
      });
  };

  filterF = () => {
    const unitLookup = {
      1: 'miles',
      2: 'feet',
      3: 'kilometers',
      4: 'meters'
    }

    loadModules([
      "esri/layers/FeatureLayer",
      "esri/config"
    ]).then(([FeatureLayer, esriConfig]) => {
      esriConfig.request.proxyUrl = 'https://belan2.esri.com/DotNet/proxy.ashx?';
      const serviceUrl = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/';

      const featureLayer = new FeatureLayer(serviceUrl);

      var query = featureLayer.createQuery();
      query.geometry = this.state.user_route.geometry;  // the point location of the pointer
      query.distance = Math.abs(this.state.distance);
      query.units = unitLookup[this.state.units];
      query.spatialRelationship = "intersects";  // this is the default
      query.returnGeometry = true;
      query.outFields = ["*"];
      query.where = "(office_id=" + this.state.office_id + ") AND (NOT driver=" + this.state.driver + ")";

      const that = this;

      featureLayer.queryFeatures(query)
        .then(function (response) {
          // returns a feature set
          console.log(response.features)
          that.setState({ data: response.features });
        });
    });

    // const proxyUrl = 'https://belan2.esri.com/DotNet/proxy.ashx?'
    // let url = proxyUrl + serviceUrl;

    // const unitLookup = {
    //   1: 'esriSRUnit_StatuteMile',
    //   2: 'esriSRUnit_Foot',
    //   3: 'esriSRUnit_Kilometer',
    //   4: 'esriSRUnit_Meter'
    // }

    // const data = {
    //   "f": "json",
    //   'where': "office_id=" + this.state.office_id + "AND driver !=" + this.state.driver,
    //   'outFields': "*",
    //   'inSR': 102100,
    //   'outSR': 102100,
    //   'geometry': this.state.user_route,
    //   'distance': this.state.distance
    // };

    // const query = Object.keys(data)
    //   .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    //   .join('&');

    // url = url + query;

    // axios.get(url)
    //   .then(res => {
    //     const users = res.data.features;
    //     console.log(users)
    //     if (users.length > 0) {  // check to see if user is already saved
    //       this.setState({
    //         fData: users
    //       })
    //     }
    //     else {
    //       console.log('no users')
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   });

  };

  render() {
    const { data } = this.state;
    const tableStyle = {
      backgroundColor: 'white',
      border: '1px solid lightgrey',
      borderRadius: '4px',
      margin: '20px'
    };

    const mRight = {
      margin: "0 50px 0 0"
    };

    const resultStyle = {
      margin: "20px"
    };

    const distF = {
      width: '130px'
    };

    function renderSwitch(param) {
      switch (param) {
        case 1:
          return 'Driver';
        case 2:
          return 'Passenger';
        default:
          return 'Either';
      };
    };

    if (this.state.new_user === true) {
      return <Redirect to='/settings' />
    }

    return (
      <div>
        <Row style={resultStyle}>
          <Form inline>
            <FormGroup>
              <Input
                type="number"
                name="distF"
                id="distF"
                bsSize="sm"
                style={distF}
                onChange={e => this.setState({ distance: Math.abs(e.target.value) })}
                defaultValue={this.state.distance}
              />
            </FormGroup>
            <div style={mRight}>
              <FormGroup>
                <Input
                  type="select"
                  name="unitF"
                  id="unitF"
                  bsSize="sm"
                  onChange={e => this.setState({ units: e.target.value })}
                  defaultValue={this.state.units}>
                  <option value={1}>miles</option>
                  <option value={2}>feet</option>
                  <option value={3}>kilometers</option>
                  <option value={4}>meters</option>
                </Input>
              </FormGroup>
            </div>
            <div style={mRight}>
              <FormGroup>
                <InputGroup size="sm">
                  <Input
                    type="number"
                    name="timeF"
                    id="timeF"
                    bsSize="sm"
                    onChange={e => this.setState({ time: Math.abs(e.target.value) })}
                    defaultValue={this.state.time}
                  />
                  <InputGroupAddon addonType="append" >
                    <InputGroupText>minutes</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </div>
            <FormGroup>
              <Button
                onClick={() => this.filterF()}
                size="sm"
                color="success">Filter
            </Button>
            </FormGroup>
          </Form>
        </Row>
        <Row style={tableStyle}>
          <Col md={12} >
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Arrive At Work</th>
                  <th>Leave Work</th>
                  <th>Miles from Route</th>
                  <th>Ride Preference</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.attributes.OBJECTID}>
                    <td>{d.attributes.name}</td>
                    <td>{convertTime(d.attributes.arrive_work)}</td>
                    <td>{convertTime(d.attributes.leave_work)}</td>
                    <td>Not Calculated</td>
                    <td>{renderSwitch(d.attributes.driver)}</td>
                    <td>{d.attributes.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  };
}

export default ResultTable;