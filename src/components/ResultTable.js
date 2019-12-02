import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Col, Row, Table, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button } from "reactstrap";
import axios from "axios";
import { loadModules } from "esri-loader";
import { convertTime, filterTime } from "../helpers"

class ResultTable extends Component {

  state = {
    data: [],
    new_user_p: false,
    new_user_l: false,
    point_id: null,
    line_id: null,
    office_id: null,
    driver: null,
    arrive_work: null,
    leave_work: null,
    user_route: null,
    distance: 5,
    units: 1,
    time: 30
  };

  componentDidMount() {
    this.getUserByEmail();
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
          this.filterF();
        }
        else {
          this.setState({
            new_user_p: true
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
      'where': "email='" + this.props.e + "'",
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
          const user = users[0];

          // populate form with user data
          this.setState({
            line_id: user.attributes.OBJECTID,
            user_route: {
              spatialReference: res.data.spatialReference,
              paths: user.geometry.paths,
              type: 'polyline'
            }
          });
          this.filterF();
        }

        else {
          this.setState({
            new_user_l: true
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
      query.geometry = this.state.user_route;  // the point location of the pointer
      query.distance = Math.abs(this.state.distance);
      query.units = unitLookup[this.state.units];
      query.spatialRelationship = "intersects";  // this is the default
      query.returnGeometry = true;
      query.outFields = ["*"];
      query.where = "(office_id=" + this.state.office_id + ") AND (NOT driver=" + this.state.driver + " OR driver=3) AND (NOT OBJECTID=" + this.state.point_id + ")";

      const that = this;

      featureLayer.queryFeatures(query)
        .then(function (response) {
          // returns a feature set
          that.setState({ data: response.features });
        })
        .catch((err) => {
          alert(err.message)
        });
    });
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

    if (this.state.new_user_l === true && this.state.new_user_p === true) {
      alert('Fill out your Settings in order to find a carpool buddy')
      return <Redirect to='/settings' />
    }

     const subject = encodeURIComponent("Lets Carpool!");
    
    
    return (
      <React.Fragment>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Row style={resultStyle}>
              <Form inline>
                <FormGroup>
                  <Input
                    type="number"
                    name="distF"
                    id="distF"
                    bsSize="sm"
                    style={distF}
                    onChange={e => { this.setState({ distance: Math.abs(e.target.value) }); this.filterF() }}
                    defaultValue={this.state.distance}
                  />
                </FormGroup>
                  <FormGroup style={mRight}>
                    <Input
                      type="select"
                      name="unitF"
                      id="unitF"
                      bsSize="sm"
                      onChange={e => { this.setState({ units: e.target.value }); this.filterF() }}
                      defaultValue={this.state.units}>
                      <option value={1}>miles</option>
                      <option value={2}>feet</option>
                      <option value={3}>kilometers</option>
                      <option value={4}>meters</option>
                    </Input>
                  </FormGroup>
                  <FormGroup style={mRight}>
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
                      <th>Ride Preference</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.filter(d => filterTime(this.state.arrive_work, this.state.leave_work, d.attributes.arrive_work, d.attributes.leave_work, this.state.time))
                      .map((fd) => (
                        <tr key={fd.attributes.OBJECTID}>
                          <td>{fd.attributes.name}</td>
                          <td>{convertTime(fd.attributes.arrive_work)}</td>
                          <td>{convertTime(fd.attributes.leave_work)}</td>
                          <td>{renderSwitch(fd.attributes.driver)}</td>
                          <td> 
                            <Button 
                              href={"mailto:" + fd.attributes.email + "?subject=" + subject + "&body=" + encodeURIComponent("Hello " + fd.attributes.name +", \n\nI show up to work at " + convertTime(this.state.arrive_work) + " and leave at " + convertTime(this.state.leave_work) + ". I work in the same office as you, would you like to carpool? You can contact me by replying to this email.\n\nThanks,\n" + this.props.n)} 
                              color="link" >{fd.attributes.email}</Button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment >
    );
  };
}

export default ResultTable;