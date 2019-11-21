import React, { Component } from "react";
import { Col, Row} from "reactstrap";

class Home extends Component {
  // state = {};

  // componentDidMount() {}
  // componentWillUnmount() {}

  render() {
    const homeStyle = {
      margin: "20px"
    };
    return (
      <div style={homeStyle}>
        <Row>
          <Col md={12}>
            <h2 className="text-center"> Welcome {this.props.n} </h2>
            <Col md={4}>
            <p>If this is your first name visiting this app, fill out the Settings to get started. Otherwise, you can skip directly to the Results to find a carpool buddy.</p>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
