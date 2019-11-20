import React, { Component } from "react";
import { Col, Row} from "reactstrap";

class Home extends Component {
  state = {};

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <h1> Home page </h1>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
