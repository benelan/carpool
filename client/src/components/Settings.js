import React from "react";
import { Col, Row, Button, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { observer, inject } from 'mobx-react'

const Settings = inject("UserStore")(observer(
  class Settings extends React.Component {
    //--------------------- STATE---------------------\\

    state = {
      form_complete: false
    }
    //--------------------- LIFE CYCLE FUNCTIONS ---------------------\\
    componentDidMount() {
      axios.defaults.withCredentials = true
    }

    //--------------------- CRUD OPERATIONS ---------------------\\
    addUser = () => {
      const url = process.env.REACT_APP_API_URL +"/api/addUser";
      axios
        .post(url, {
          name: this.props.UserStore.userName,
          email: this.props.UserStore.userEmail,
          arrive_work: this.props.UserStore.arrive,
          leave_work: this.props.UserStore.leave,
          driver: this.props.UserStore.driver,
          office_id: this.props.UserStore.officeId,
          successful: this.props.UserStore.successful,
        })
        .then(() => {
          this.setState({ form_complete: true });
        })
        .catch(err => {
          // handle any errors
          console.error(err);
        });
    };

    updateUser = () => {
      const url = process.env.REACT_APP_API_URL +"/api/updateUser";
      axios
        .post(url, {
          em: this.props.UserStore.userEmail,
          update: {
            name: this.props.UserStore.userName,
            email: this.props.UserStore.userEmail,
            arrive_work: this.props.UserStore.arrive,
            leave_work: this.props.UserStore.leave,
            driver: this.props.UserStore.driver,
            office_id: this.props.UserStore.officeId,
            successful: this.props.UserStore.successful
          }
        })
        .then(() => {
          this.setState({ form_complete: true });
        })
        .catch(err => {
          // handle any errors
          console.error(err);
        });
    };


    //--------------------- SUBMIT HANDLER ---------------------\\
    submitF = () => {
      // REST CALLS HERE
      if (this.props.UserStore.userNew) {
        // if the user is not in the db, add the user
        this.addUser();
      } else {
        // if the user is in the db, update the user info
        this.updateUser();
      }
    }

    //--------------------- JSX ---------------------\\
    render() {
      const settingStyle = {
        margin: "20px"
      };

      if (!this.props.UserStore.userName && !this.props.UserStore.userEmail) {
        alert('Please login')
        return <Redirect to='/' />
      }

      if (this.state.form_complete === true) {
        return <Redirect to='/results' />
      }
      return (
        <Row className="justify-content-md-center" style={settingStyle}>
          <Col md={8}>
            <Row>
              <Col md={12}>
                <p>
                  <b>This information will be used to match you with a carpool buddy!</b>
                </p>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">Name</Label>
                  <Input
                    type="name"
                    name="name"
                    id="userName"
                    readOnly
                    //onChange={e => this.setState({ new_user: true, name: e.target.value })}
                    defaultValue={this.props.UserStore.userName} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="userEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="userEmail"
                    readOnly
                    //onChange={e => this.setState({ new_user: true, email: e.target.value })}
                    defaultValue={this.props.UserStore.userEmail} />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="arriveTime">Arrive at Work</Label>
                  <Input
                    type="time"
                    name="time"
                    id="arriveTime"
                    onChange={e => this.props.UserStore.setArrive(e.target.value)}
                    defaultValue={this.props.UserStore.arrive} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="leaveTime">Leave Work</Label>
                  <Input
                    type="time"
                    name="time"
                    id="leaveTime"
                    onChange={e => this.props.UserStore.setLeave(e.target.value)}
                    defaultValue={this.props.UserStore.leave} />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="driver">Select</Label>
                  <Input
                    type="select"
                    name="select"
                    id="driverSelect"
                    onChange={e => this.props.UserStore.setDriver(parseInt(e.target.value))}
                    defaultValue={this.props.UserStore.driver}>
                    <option value={1}>Driver</option>
                    <option value={2}>Passenger</option>
                    <option value={3}>Either</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleSelect">Office Location</Label>
                  <Input
                    type="select"
                    name="office"
                    id="officeSelect"
                    onChange={e => this.props.UserStore.setOffice(parseInt(e.target.value))}
                    defaultValue={this.props.UserStore.officeId}>
                    <option value={1}>Redlands Main Campus</option>
                    <option value={2}>Redlands V Buildings</option>
                    <option value={3}>Charlotte</option>
                    <option value={4}>Washington D.C.</option>
                    <option value={5}>New York City</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Button
                  color="success"
                  onClick={() => this.submitF()}>Save
            </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      );
    }
  }))
export default Settings;
