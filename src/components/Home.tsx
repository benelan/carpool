import React from "react";
import { Col, Row, Button, UncontrolledPopover, PopoverBody } from "reactstrap";
import { NavLink as RRNavLink } from 'react-router-dom';
import soon from '../img/soon.png';
type MyProps = {
  e: string,
  n: string;
};

class Home extends React.Component<MyProps> {
  render() {
    const homeStyle = {
      margin: "10px"
    };

    const marg = {
      margin: "50px 0px 0px 0px"
    };

    const margB = {
      margin: "0px 0px 40px 0px"
    };
    return (

      <Row style={marg}>
        <Col md={12}>
          <h2 className="text-center" style={margB}>Welcome {this.props.n}</h2>
          <Row style={homeStyle}>

            <Col md={4}>
              <h4 className="text-center">Getting Started</h4>

              <p>If this is your first time visiting this app, fill out the <Button outline color="success" size="sm" tag={RRNavLink} to="/settings">Settings</Button> to get started. </p>

              <p>Otherwise, you can skip directly to the <Button outline color="success" size="sm" tag={RRNavLink} to="/results">Results</Button> to find a ride.</p>

              <p> Once you find a ride or have a full car and are no longer looking, check the "Found a Ride" box in the Settings. Whenever changing the Settings make sure to save!</p>

              <p> There are a few <Button id="PopoverFocus" size="sm" color="link">help</Button>
                <UncontrolledPopover trigger="focus" placement="auto" target="PopoverFocus">
                  <PopoverBody>Helpful info</PopoverBody>
                </UncontrolledPopover>buttons throughout the app that provide additional information.</p>
            </Col>

            <Col md={{ size: 4, offset: 4 }}>
              <h4 className="text-center">Impact</h4>
              <img src={soon} alt="Coming Soon" className="mx-auto d-block img-fluid" style={{ width: '50%' }} />
              <p> </p>
            </Col>
          </Row>

          <Row style={homeStyle}>
            <Col md={4}>
              <h4 className="text-center">How It Works</h4>
              <p>When you sign up in the Settings, a point is created for your pickup location. Then a route is created from your point to the selected office. This info, along with arrival/departure times and a driving preference, will be used for finding potential carpool rides.</p>

              <p>In the Results, a buffer is created around your route. The size of the buffer is determined by the distance filter option. Other users within the buffer are added to your result list. </p>

              <p>There are also two time filters, one for arrival and one for departure. The times chosen in the Settings are padded on either side to create time ranges. For example, if you arrive at 7:30, and your arrival filter is 30 minutes, then people who arrive from 7-8 will appear on the list.</p>

              <p>Only users that match all 3 filters will show up on the list. More flexibility in the works.</p>
            </Col>

            <Col md={{ size: 4, offset: 4 }}>
              <h4 className="text-center">Bugs & Enhancements</h4>

              <p>If you discover any bugs in the application, or have suggestions for future development, please log an issue on the <Button outline color="success" size="sm" href="https://github.com/benelan/carpool/issues">Github</Button> page</p>

              <p>Alternatively, you can reach out to Ben Elan using Skype, Teams, or by email.</p>

              <p>If you are a developer, I will accept pull requests. This is the <Button outline color="success" size="sm" href="https://github.com/benelan/carpool/tree/spatial">Spatial</Button> branch on Github.</p>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Home;
