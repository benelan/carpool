import React, { Component } from 'react';
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';
import { loadModules } from 'esri-loader';
import { loadCss } from 'esri-loader';
import axios from 'axios';


class Settings extends Component {

  // initialize our state
  state = {
    data: [],
    id: 0,
    name: null,
    email: null,
    driver: true,
    start_loc: null,
    start_address: null,
    office_id: 1,
    arrive_work: '09:00',
    leave_work: '17:00',
    route: null
  };

  // initialize the map to pick start location
  initMap = () => {
    loadCss();
    let map;
    let view;
    let searchWidget;
    loadModules(['esri/views/MapView', 'esri/Map', "esri/widgets/Search"])
      .then(([MapView, Map, Search]) => {
        // then we load a web map from an id
        map = new Map({
          basemap: "streets"
        });
        // and we show that map in a container w/ id #viewDiv
        view = new MapView({
          map: map,
          container: 'viewDiv',
          center: [-100, 35],
          zoom: 3
        });

        searchWidget = new Search({
          view: view,
          //searchTerm: 'current address'
        });

        view.ui.add(searchWidget, {
          position: "bottom-right",
          index: 2
        });
        searchWidget.on("search-complete", function(event){
          const lat = event.results[0].results[0].feature.geometry.latitude;
          const lon = event.results[0].results[0].feature.geometry.longitude;
          const coords = [lon, lat];
          const addr = event.results[0].results[0].feature.attributes.Match_addr;
          // this.setState({ start_loc: coords });
          // this.setState({ start_address: addr });
         
          
        });
      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });

  }

  // request info on person and then intialize
  componentDidMount() {
    this.getDataFromDb();
    this.setState({ name: 'John Doe' });
    this.setState({ email: 'example@esri.com' });
    this.initMap()
  };

  componentWillUnmount() {
    console.log('unmount')
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getAllUsers')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  updateDB = () => {
    let objIdToUpdate = null;
    this.state.data.forEach((dat) => {
      if (dat.id == this.state.id) {
        objIdToUpdate = dat._id;
      }
    });
    
    console.log(this.state.office_id)
    axios.post('http://localhost:3001/api/updateUser', {
      id: objIdToUpdate,
      update: { 
        name: this.state.name, 
        email: this.state.email, 
        arrive_work: this.state.arrive_work, 
        leave_work: this.state.leave_work, 
        driver: this.state.driver, 
        office_id: this.state.office_id,
        start_loc: this.state.start_loc
      }
    });
  };

  render() {
    return (
      <div id='bodyComp'>
        <Row form>
          <Col md={6}>
            <Row form>
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
                    onChange={(e) => this.setState({ name: e.target.value })} 
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
                    onChange={(e) => this.setState({ email: e.target.value })}
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
                    onChange={(e) => this.setState({ driver: e.target.value })}
                    >
                    <option value={true}>Driver</option>
                    <option value={false}>Passanger</option>
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
                    onChange={(e) => this.setState({ office_id: e.target.value})}
                    defaultValue={this.state.office_id}>
                    <option value={1}>Redlands Main Campus</option>
                    <option value={2}>Redlands V Buildings</option>
                    <option value={3}>Charlotte</option>
                    <option value={4}>Washington D.C.</option>
                    <option value={5}>New York City</option>
                    <option value={6}>Portland</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="startLocation">Pickup Location (use the search bar. If you have privacy concerns, you can put a cross street or a store near your home)</Label>
                  <div id="viewDiv"></div>
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button color="success" onClick={() =>this.updateDB()}>Save</Button>
      </div>
    )
  };
}

export default Settings;