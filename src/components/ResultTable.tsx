import React from "react";
import { Redirect } from "react-router-dom";
import { Col, Row, Table, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, UncontrolledPopover, PopoverBody, Spinner } from "reactstrap";
import { loadModules } from "esri-loader";
import { convertTime, filterTime } from "../helpers";
import { observer, inject } from 'mobx-react'
import UserStore from '../store/UserStore';

// state typing
type MyState = {
  data: Array<any>,
  loaded: Boolean,
  distance: number,
  units: number,
  time_arrive: number,
  time_leave: number
};

// props typing
type MyProps = {
  UserStore?: UserStore
};

const ResultTable = inject("UserStore")(observer( // mobx stuff
  class ResultTable extends React.Component<MyProps, MyState> {
    state: MyState = {
      data: [], // the data returned from the api query
      loaded: false, // shows loading symbol while doing a query
      // filter options below
      distance: 5,
      units: 1,
      time_arrive: 30,
      time_leave: 30
    };

    proxyUrl: string = 'https://belan2.esri.com/DotNet/proxy.ashx?';

    //------------------------------------------ Lifecycle ------------------------------------------\\
    componentDidMount() {
      if (!this.props.UserStore!.userNew) { // prevents memory leak
        this.filterF(); // filter on load
      }
    }

    //------------------------------------------ Filter Function ------------------------------------------\\
    async filterF(): Promise<void> {
      this.setState({ loaded: false });  // when performing a query show the loading icon
      
      const unitLookup: any = {
        1: 'miles',
        2: 'feet',
        3: 'kilometers',
        4: 'meters'
      }

      // load modules
      type MapModules = [typeof import("esri/layers/FeatureLayer"), typeof import("esri/config")];
      const [FeatureLayer, esriConfig] = await (loadModules(["esri/layers/FeatureLayer", "esri/config"]) as Promise<MapModules>);

      // use proxy and set service url
      esriConfig.request.proxyUrl = this.proxyUrl;
      const serviceUrl: string = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/';

      const featureLayer = new FeatureLayer({ url: serviceUrl }); 

      // query options
      var query = featureLayer.createQuery();
      query.geometry = this.props.UserStore!.route;  // the Geometry of the user route
      query.distance = Math.abs(this.state.distance); // the filter distance
      query.units = unitLookup[this.state.units]; // the filter units
      query.spatialRelationship = "intersects";  // this is the default
      query.returnGeometry = false; // don't return the user's location for security
      query.outFields = ["name, email, driver, office_id, arrive_work, leave_work", "OBJECTID"]; // limit returned fields for security

      query.where =
        "(office_id=" + this.props.UserStore!.officeId + ") AND (NOT success=1) AND (NOT driver=" + this.props.UserStore!.driver + " OR driver=3) AND (NOT OBJECTID=" + this.props.UserStore!.pointId + ") AND (NOT email='" + this.props.UserStore!.userEmail + "')";

      const that = this; // this out of scope inside query promise

      // perform query
      featureLayer.queryFeatures(query)
        .then(function (response: any) {
          // returns a feature set
          that.setState({ data: response.features, loaded: true }); // query finished loading
        })
        .catch((err: any) => {
          alert(err.message)
        });
    };

    //------------------------------------------ JSX ------------------------------------------\\
    render() {
      //------------------------------------------ CSS STYLE ------------------------------------------\\
      const tableStyle = {
        backgroundColor: 'white',
        border: '1px solid lightgrey',
        borderRadius: '4px',
        margin: '20px',
        outline: '1px solid lightgrey',
        outlineRadius: '4px',
        outlineOffset: '-2px'
      };

      const mRight = {
        margin: "0px 20px 5px 0"
      };

      const resultStyle = {
        margin: "20px"
      };

      const distF = {
        width: '84px'
      };

      const unitF = {
        width: '105px'
      };


      const time2F = {
        width: '80px'
      };

      const timeF = {
        width: '103px'
      };

      //------------------------------------------ REDIRECT ------------------------------------------\\
      if (this.props.UserStore!.offsite) {
        alert('This app currently only works on the internal Esri network')
        return <Redirect to='/home' />
      }

      if (this.props.UserStore!.userNew) {
        alert('Fill out your Settings in order to find a carpool buddy')
        return <Redirect to='/settings' />
      }

      //------------------------------------------ VARIABLES ------------------------------------------\\
      function renderSwitch(param: number) {
        switch (param) {
          case 1:
            return 'Driver';
          case 2:
            return 'Passenger';
          default:
            return 'Either';
        };
      };
      const subject = encodeURIComponent("Lets Carpool!");
      const { data } = this.state;

      return (
        <React.Fragment>
          <Row className="justify-content-md-center">
            <Col md={8}>
              <Row style={resultStyle}>
                <FormGroup style={mRight}>
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend" >
                      <InputGroupText>arrival time buffer</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="number"
                      name="timeF"
                      id="timeF"
                      min="0"
                      step="1"
                      bsSize="sm"
                      style={timeF}
                      defaultValue={this.state.time_arrive}
                      onChange={e => this.setState({ time_arrive: Math.abs(parseInt(e.target.value)) })} />
                    <InputGroupAddon addonType="append" >
                      <InputGroupText>minutes</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup style={mRight}>
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend" >
                      <InputGroupText>departure time buffer</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="number"
                      name="time2F"
                      id="time2F"
                      min="0"
                      step="1"
                      bsSize="sm"
                      style={time2F}
                      defaultValue={this.state.time_leave}
                      onChange={e => this.setState({ time_leave: Math.abs(parseInt(e.target.value)) })} />
                    <InputGroupAddon addonType="append" >
                      <InputGroupText>minutes</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup style={mRight}>
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend" >
                      <InputGroupText>distance buffer</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="number"
                      name="distF"
                      id="distF"
                      min="0"
                      step="1"
                      style={distF}
                      defaultValue={this.state.distance}
                      onChange={e => { this.setState({ distance: Math.abs(parseInt(e.target.value)) }); this.filterF() }} />
                    <Input
                      type="select"
                      name="unitF"
                      id="unitF"
                      style={unitF}
                      onChange={e => { this.setState({ units: parseInt(e.target.value) }); this.filterF() }}
                      defaultValue={this.state.units}>
                      <option value={1}>miles</option>
                      <option value={2}>feet</option>
                      <option value={3}>kilometers</option>
                      <option value={4}>meters</option>
                    </Input>
                    <Button id="filterFocus" size="sm" color="link">help</Button>
                    <UncontrolledPopover trigger="legacy" target="filterFocus">
                      <PopoverBody>Info about how filtering works on the Home page</PopoverBody>
                    </UncontrolledPopover>
                  </InputGroup>
                </FormGroup>
              </Row>
              <Row style={tableStyle}>
                <Col md={12} >
                  <Table hover responsive>
                    <thead>
                      <tr className='text-center pagination-centered'>
                        <th>Name</th>
                        <th>Arrive At Work</th>
                        <th>Leave Work</th>
                        <th>Ride Preference</th>
                        <th>Email
                        <Button id="PopoverFocus" size="sm" color="link">help</Button>
                          <UncontrolledPopover trigger="legacy" target="PopoverFocus">
                            <PopoverBody>Clicking on a user's email address will open a pre-written template.</PopoverBody>
                          </UncontrolledPopover>
                        </th>
                      </tr>
                    </thead>
                    <tbody className='text-center pagination-centered'>
                      {this.state.loaded ?
                        data.filter(d => filterTime(this.props.UserStore!.arrive, this.props.UserStore!.leave, d.attributes.arrive_work, d.attributes.leave_work, this.state.time_arrive, this.state.time_leave))
                          .map((fd) => (
                            <tr key={fd.attributes.OBJECTID}>
                              <td>{fd.attributes.name}</td>
                              <td>{convertTime(fd.attributes.arrive_work)}</td>
                              <td>{convertTime(fd.attributes.leave_work)}</td>
                              <td>{renderSwitch(fd.attributes.driver)}</td>
                              <td>
                                <Button
                                  href={"mailto:" + fd.attributes.email + "?subject=" + subject + "&body=" + encodeURIComponent("Hello " + fd.attributes.name + ", \n\nI show up to work at " + convertTime(this.props.UserStore!.arrive) + " and leave at " + convertTime(this.props.UserStore!.leave) + ". I work in the same office as you, would you like to carpool? You can contact me by replying to this email.\n\nThanks,\n" + this.props.UserStore!.userName)}
                                  color="link" >{fd.attributes.email}
                                </Button>
                              </td>
                            </tr>
                          ))
                        : (
                          <tr><td><Spinner color="warning" style={{ width: '2.5rem', height: '2.5rem', margin: '10px' }} /></td></tr>
                        )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
          </Row>
        </React.Fragment>
      );
    };
  }
))
export default ResultTable;