import React, { Component } from "react";
import { Col, Row, Button, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Settings extends Component {
  //--------------------- STATE---------------------\\
  state = {
    new_user: true,
    form_complete: false,
    driver: 1,
    office_id: 1,
    arrive_work: "09:00",
    leave_work: "17:00"
  };

  //--------------------- LIFE CYCLE FUNCTIONS ---------------------\\
  componentDidMount() {
    this.getUserByEmail();
  }

  componentWillUnmount() {
  }

  //--------------------- CRUD OPERATIONS ---------------------\\
  addUser = () => {
    axios
      .post("http://localhost:3001/api/addUser", {
        name: this.props.n,
        email: this.props.e,
        arrive_work: this.state.arrive_work,
        leave_work: this.state.leave_work,
        driver: parseInt(this.state.driver),
        office_id: parseInt(this.state.office_id)
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
    axios
      .post("http://localhost:3001/api/updateUser", {
        em: this.props.e,
        update: {
          name: this.props.n,
          email: this.props.e,
          arrive_work: this.state.arrive_work,
          leave_work: this.state.leave_work,
          driver: parseInt(this.state.driver),
          office_id: parseInt(this.state.office_id)
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

  //--------------------- CRUD OPERATIONS ---------------------\\
  getUserByEmail = () => {
    // get user info by email
    axios.get("http://localhost:3001/api/getOneUser", {
      params: {
        email: this.props.e
      }
    })
      .then(res => {
        const user = res.data.data;
        // fill in form and state with settings saved in db
        if (!!user) {
          // check to see if user is already saved
          this.setState({
            office_id: user.office_id,
            driver: user.driver,
            arrive_work: user.arrive_work,
            leave_work: user.leave_work,
            new_user: false
          });

          // the request promise seems to resolve after the component mounts
          // so need to manually change the form values
          document.getElementById("officeSelect").value = user.office_id;
          document.getElementById("driverSelect").value = user.driver;
          document.getElementById("arriveTime").value = user.arrive_work;
          document.getElementById("leaveTime").value = user.leave_work;
        }
      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  }
  //--------------------- SUBMIT HANDLER ---------------------\\
  submitF = () => {
    // REST CALLS HERE
    if (this.state.new_user) {
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
                defaultValue={this.props.n}
              />
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
                defaultValue={this.props.e}
              />
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
                onChange={e => this.setState({ arrive_work: e.target.value })}
                defaultValue={this.state.arrive_work}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="leaveTime">Leave Work</Label>
              <Input
                type="time"
                name="time"
                id="leaveTime"
                onChange={e => this.setState({ leave_work: e.target.value })}
                defaultValue={this.state.leave_work}
              />
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
                onChange={e => this.setState({ driver: e.target.value })}
              >
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
                onChange={e => this.setState({ office_id: e.target.value })}
                defaultValue={this.state.office_id}
              >
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
}

export default Settings;
