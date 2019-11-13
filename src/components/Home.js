import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Settings from './Settings'


class Home extends Component {
  render() {
    return (
        <div id="bodyComp">
          <Row form>
            <Col md={12}>
              <Settings />
            </Col>
          </Row>
        </div>
    )};
}

export default Home;