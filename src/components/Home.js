import React, { Component } from 'react';
import { Col, Row} from 'reactstrap';




class Home extends Component {
  render() {
    return (
        <div id="bodyComp">
          <Row form>
            <Col md={12}>
              <h1><b>This will be a homepage</b></h1>
            </Col>
          </Row>
        </div>
    )};
}

export default Home;