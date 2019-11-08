import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { loadModules } from 'esri-loader';
import { loadCss } from 'esri-loader';



class Settings extends Component {

  // initialize our state
  state = {
    id: null,
    message: null,
    name: null,
    email: null,
    commute: {
      driver: null,
      start_loc: null,
      start_address: null,
      office_id: null,
      arrive_work: '09:00',
      leave_work: '17:00',
      route: null
    }
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
      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });

  }
  

  // request info on person and then intialize
  componentDidMount() {
    this.setState({ name: 'John Doe' });
    this.setState({ email: 'example@esri.com' });
    this.initMap()
  };

  componentWillUnmount() {
    console.log('unmount')
  }

  render() {
    return (
    <Form id='bodyComp'>
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
                <Input type="name" name="name" id="userName" placeholder={this.state.name} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="userEmail">Email</Label>
                <Input type="email" name="email" id="userEmail" placeholder={this.state.email} />
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
                  defaultValue={this.state.commute.arrive_work}
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
                  defaultValue={this.state.commute.leave_work}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="driver">Select</Label>
                <Input type="select" name="select" id="driverSelect">
                  <option>Driver</option>
                  <option>Passanger</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleSelect">Office Location</Label>
                <Input type="select" name="office" id="officeSelect">
                  <option>Redlands Main Campus</option>
                  <option>Redlands V Buildings</option>
                  <option>Charlotte</option>
                  <option>Washington D.C.</option>
                  <option>New York City</option>
                  <option>Portland</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="startLocation">Pickup Location (use the search bar)</Label>
                <div id="viewDiv"></div>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <Button color="success">Save</Button>
    </Form>
    )};
}

export default Settings;