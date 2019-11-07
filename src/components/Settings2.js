import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { loadModules } from 'esri-loader';
import { loadCss } from 'esri-loader';
loadCss();

let searchWidget;
loadModules(["esri/widgets/Search"])
  .then(([Search]) => {
    searchWidget = new Search({
      container: "searchWidget"
    });
  })
  .catch(err => {
    // handle any errors
    console.error(err);
  });

  function submitForm() {
    searchWidget.search().then((results) => {
      console.log(results)
    })
  }  

const Settings2 = (props) => {
  return (

    <Form id='settings'>
      <Row form>
      <Col md={3}>
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
        <Col md={3}>
        <FormGroup>
        <Label for="driver">Select</Label>
        <Input type="select" name="select" id="driverSelect">
          <option>Driver</option>
          <option>Passanger</option>
        </Input>
      </FormGroup>
    </Col>
      </Row>
      
      <Row form>
    <Col md={3}>
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
    <Col md={3}>
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
   
    <Col md={3}>
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
    <Col md={3}>
        <FormGroup>
          <Label for="startLocation">Pickup Location</Label>
          <div id="startLoc">
          <div id="searchWidget"></div>
          </div>
        </FormGroup>
      </Col>
      </Row>
      <Button onClick={submitForm}>Save</Button>
    </Form>
  );
}

export default Settings2;