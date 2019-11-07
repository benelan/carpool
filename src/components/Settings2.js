import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { loadModules } from 'esri-loader';
import { loadCss } from 'esri-loader';
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
      position: "top-right",
      index: 2
    });
  })
  .catch(err => {
    // handle any errors
    console.error(err);
  });

function submitForm() {
  searchWidget.search().then((res) => {
    const lat = res.results[0].results[0].feature.geometry.latitude;
    const lon = res.results[0].results[0].feature.geometry.longitude;
    const coord = [lon, lat];
    const address = res.results[0].results[0].feature.attributes.Match_addr;
  })
}

const Settings2 = (props) => {
  return (

    <Form id='settings'>
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
                <Input type="name" name="name" id="userName" placeholder="John Doe" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="userEmail">Email</Label>
                <Input type="email" name="email" id="userEmail" placeholder="example@esri.com" />
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
                  defaultValue="09:00"
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
                  defaultValue="17:00"
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
                <Label for="startLocation">Pickup Location</Label>
                <div id="viewDiv"></div>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <Button onClick={submitForm}>Save</Button>
    </Form>

  );
}

export default Settings2;