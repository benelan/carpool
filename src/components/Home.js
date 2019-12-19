import React, { Component } from "react";
import { Col, Row, Button } from "reactstrap";
import { NavLink as RRNavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react'

const Home = inject("UserStore")(observer(
  class Home extends Component {

    render() {
      const homeStyle = {
        margin: "20px"
      };
      return (
        <Row style={homeStyle}>
          <Col md={12}>
            <h2 className="text-center">Welcome {this.props.UserStore.userName}</h2>
            <Row style={homeStyle}>

              <Col md={4}>
                <h4 className="text-center">Getting Started</h4>

                <p>If this is your first time visiting this app, fill out the <Button outline color="success" size="sm" tag={RRNavLink} to="/settings">Settings</Button> to get started. </p>

                <p>Otherwise, you can skip directly to the <Button outline color="success" size="sm" tag={RRNavLink} to="/results">Results</Button> to find a ride.</p>

                <p> Once you find a ride or have a full car and are no longer looking, check the "Found a Ride" box in the Settings. Whenever changing the Settings make sure to save!</p>
              </Col>

              <Col md={{ size: 4, offset: 4 }}>
                <h4 className="text-center">Bugs & Enhancements</h4>

                <p>If you discover any bugs in the application, or have suggestions for future development, please log an <Button outline color="success" size="sm" href="https://github.com/benelan/carpool/issues">Issue</Button>  on the Githubpage</p>

                <p>Alternatively, you can reach out to Ben Elan using Skype, Teams, or by email.</p>

                <p>If you are a developer, I will accept pull requests on<Button outline color="success" size="sm" href="https://github.com/benelan/carpool">Github</Button>.</p>
              </Col>
            </Row>

            <Row style={homeStyle}>
              <Col md={4}>
                <h4 className="text-center">How It Works</h4>
                <p>You will only be matched with people who go you office and who have compatible ride preferences.</p>
                <p>There are two time filters, one for arrival and one for departure. The times chosen in the Settings are padded on either side to create time ranges. For example, if you arrive at 7:30, and your arrival filter is 30 minutes, then people who arrive from 7-8 will appear on the list.</p>
              </Col>

              <Col md={{ size: 4, offset: 4 }}>

              </Col>
            </Row>
          </Col>
        </Row>
      );
    }
  }))

export default Home;
