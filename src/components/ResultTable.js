import React, { Component } from "react";
import { Col, Row, Table, Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import axios from "axios";
import { convertTime } from "../helpers"

class ResultTable extends Component {

  state = {
    data: [],
    fData: [],
    name: this.props.n,
    email: this.props.e,
    distance: 5,
    units: 'miles',
    time: 30,
    //interval: false
  };

  componentDidMount() {
    this.getData();
    // if (!this.state.interval) {
    //   let interval = setInterval(this.getDataFromDb, 60000);
    //   this.setState({ interval: interval });
    // }
  }
  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({ interval: null });
    }
  }


  getData = () => {
    const serviceUrl = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/query?';
    const proxyUrl = 'https://belan2.esri.com/DotNet/proxy.ashx?'
    let url = proxyUrl + serviceUrl;
    const data = {
      "f": "json",
      "returnGeometry": true,
      'where': '1=1',
      'outFields': "*"
    };

    const query = Object.keys(data)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

    url = url + query;

    axios.get(url)
      .then(res => {
        console.log(res.data.features)
        // fill in form and state with settings saved in db
        this.setState({ data: res.data.features });
      });
  };


  filterF = () => {
    alert("Filter")
  };


  render() {
    const { data } = this.state;
    const tableStyle = {
      backgroundColor: 'white',
      border: '1px solid lightgrey',
      borderRadius: '4px',
      margin: '20px'
    };

    const mRight = {
      margin: "0 50px 0 0"
    };

    const resultStyle = {
      margin: "20px"
    };

    const distF = {
      width: '130px'
    };

    function renderSwitch(param) {
      switch (param) {
        case 1:
          return 'Driver';
        case 2:
          return 'Passenger';
        default:
          return 'Either';
      };
    };

    return (
      <div>
        <Row style={resultStyle}>
          <Form inline>
            <FormGroup>
              <Input
                type="number"
                name="distF"
                id="distF"
                bsSize="sm"
                style={distF}
                onChange={e => this.setState({ distance: Math.abs(e.target.value) })}
                defaultValue={this.state.distance}
              />
            </FormGroup>
            <div style={mRight}>
              <FormGroup>
                <Input
                  type="select"
                  name="unitF"
                  id="unitF"
                  bsSize="sm"
                  onChange={e => this.setState({ units: e.target.value })}
                  defaultValue={this.state.units}>
                  <option value={1}>miles</option>
                  <option value={2}>feet</option>
                  <option value={3}>kilometers</option>
                  <option value={4}>meters</option>
                </Input>
              </FormGroup>
            </div>
            <div style={mRight}>
              <FormGroup>
                <InputGroup size="sm">
                  <Input
                    type="number"
                    name="timeF"
                    id="timeF"
                    bsSize="sm"
                    onChange={e => this.setState({ time: Math.abs(e.target.value) })}
                    defaultValue={this.state.time}
                  />
                  <InputGroupAddon addonType="append" >
                    <InputGroupText>minutes</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </div>
            <FormGroup>
              <Button
                onClick={() => this.filterF()}
                size="sm"
                color="success">Filter
            </Button>
            </FormGroup>
          </Form>
        </Row>
        <Row style={tableStyle}>
          <Col md={12} >
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Arrive At Work</th>
                  <th>Leave Work</th>
                  <th>Miles from Route</th>
                  <th>Ride Preference</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.attributes.OBJECTID}>
                    <td>{d.attributes.name}</td>
                    <td>{convertTime(d.attributes.arrive_work)}</td>
                    <td>{convertTime(d.attributes.leave_work)}</td>
                    <td>Not Calculated</td>
                    <td>{renderSwitch(d.attributes.driver)}</td>
                    <td>{d.attributes.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  };
}

export default ResultTable;