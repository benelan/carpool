import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Col, Row, Table, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button } from "reactstrap";
import axios from "axios";
import { observer, inject } from 'mobx-react'
import { convertTime, filterTime } from "../helpers"

const ResultTable = inject("UserStore")(observer(
  class ResultTable extends Component {

    state = {
      data: [],
      time: 30
    };

    componentDidMount() {
      if (!this.props.UserStore.userNew) {
        this.getData();
      }
      axios.defaults.withCredentials = true
    }

    getData = () => {
      axios.get("http://localhost:3001/api/queryUsers", {
        params: {
          email: this.props.UserStore.userEmail,
          driver: this.props.UserStore.driver,
          office: this.props.UserStore.officeId
        }
      })
        .then(res => {
          this.setState({ data: res.data.data })
        })
        .catch((err) => {
          console.log(err);
        })
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

      if (!this.props.UserStore.userName && !this.props.UserStore.userEmail) {
        alert('Please login')
        return <Redirect to='/' />
      }

      if (this.props.UserStore.userNew) {
        alert('Fill out your Settings in order to find a carpool buddy')
        return <Redirect to='/settings' />
      }

      const subject = encodeURIComponent("Lets Carpool!");

      return (
        <React.Fragment>
          <Row className="justify-content-md-center">
            <Col md={8}>
              <Row style={resultStyle}>
                <Form inline>
                  <FormGroup style={mRight}>
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
                        <th>Ride Preference</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.filter(d => filterTime(this.props.UserStore.arrive, this.props.UserStore.leave, d.arrive_work, d.leave_work, this.state.time))
                        .map((fd) => (
                          <tr key={fd.email}>
                            <td>{fd.name}</td>
                            <td>{convertTime(fd.arrive_work)}</td>
                            <td>{convertTime(fd.leave_work)}</td>
                            <td>{renderSwitch(fd.driver)}</td>
                            <td>
                              <Button
                                href={"mailto:" + fd.email + "?subject=" + subject + "&body=" + encodeURIComponent("Hello " + fd.name + ", \n\nI show up to work at " + convertTime(this.props.UserStore.arrive) + " and leave at " + convertTime(this.props.UserStore.leave) + ". I work in the same office as you, would you like to carpool? You can contact me by replying to this email.\n\nThanks,\n" + this.props.UserStore.userName)}
                                color="link" >{fd.email}</Button></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
          </Row>
        </React.Fragment >
      );
    };
  }
))
export default ResultTable;