import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Settings2 = (props) => {
  return (
    <Form id='settings'>
      <Row form>
      <Col md={6}>
          <FormGroup>
            <Label for="exampleName">Name</Label>
            <Input type="name" name="name" id="exampleName" placeholder="name placeholder" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
        </Col>     
      </Row>
      <Row form>
      <Col md={6}>
      <FormGroup>
        <Label for="exampleAddress">Address</Label>
        <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
      </FormGroup>
      </Col>
      <Col md={6}>
      <FormGroup>
        <Label for="exampleSelect">Office Location</Label>
        <Input type="select" name="office" id="officeSelect">
          <option>Redlands Main Campus</option>
          <option>Redlands V Buildings</option>
          <option>Charrolette</option>
          <option>Washington D.C.</option>
          <option>New York City</option>
          <option>Portland</option>
        </Input>
      </FormGroup>
      </Col>
      </Row>
      
      <Row form>
        <Col md={4}>
        <FormGroup>
        <Label for="arriveTime">Arrive at Work</Label>
        <Input
          type="time"
          name="time"
          id="arriveTime"
          placeholder="9"
        />
      </FormGroup>
        </Col>
        <Col md={4}>
        <FormGroup>
        <Label for="leaveTime">Leave Work</Label>
        <Input
          type="time"
          name="time"
          id="leaveTime"
          placeholder="time placeholder"
        />
      </FormGroup>
        </Col>
        <Col md={4}>
        <FormGroup>
        <Label for="driver">Select</Label>
        <Input type="select" name="select" id="driverSelect">
          <option>Driver</option>
          <option>Passanger</option>
        </Input>
      </FormGroup>
        </Col>
      </Row>
      <Button>Submit</Button>
    </Form>
  );
}

export default Settings2;