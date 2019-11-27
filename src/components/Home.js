import React, { Component } from "react";
import { Col, Row, Button } from "reactstrap";

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
            <h2 className="text-center">Welcome {this.props.n}</h2>
           
            <Col md={4}>
            <p>If this is your first time visiting this app, fill out the <Button outline color="success" size="sm" href="/settings">Settings</Button>{' '} to get started. </p>
    
            <p>Otherwise, you can skip directly to the <Button outline color="success" size="sm" href="/results">Results</Button>{' '} to find a carpool buddy.</p>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
