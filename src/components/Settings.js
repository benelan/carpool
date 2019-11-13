import React, { Component } from 'react';
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';
import { loadModules, loadCss } from 'esri-loader';
import axios from 'axios';


class Settings extends Component {

  //--------------------- STATE---------------------\\
  state = {
    searchWidget: null,
    data: [],
    id: 0,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    username: null,
    name: null,
    email: null,
    driver: true,
    start_loc: null,
    start_address: null,
    office_id: 1,
    arrive_work: '09:00',
    leave_work: '17:00',
    route: null
  };

  //--------------------- LIFE CYCLE FUNCTIONS ---------------------\\
  componentDidMount() {
    this.getDataFromDb();

    // initialize JS API search widget
    loadCss();
    loadModules(["esri/portal/Portal", "esri/identity/OAuthInfo", "esri/identity/IdentityManager", "esri/widgets/Search"])
      .then(([Portal, OAuthInfo, IdentityManager, Search]) => {

        var info = new OAuthInfo({
          appId: "n5A1575tmQq5eFPd",
          popup: false
        });
        IdentityManager.registerOAuthInfos([info]);
        IdentityManager.getCredential(info.portalUrl + "/sharing");
        IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
          .then(e => this.setState({username: e.userId}))


        this.setState({
          searchWidget: Search({
            container: document.getElementById("startLoc")
            //searchTerm: 'current address'
          })
        })
      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  };

  componentWillUnmount() {
    this.setState({ searchWidget: null });
    window.location.reload();
  }


  //--------------------- CRUD OPERATIONS ---------------------\\
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getAllUsers')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  updateDB = () => {
    console.log(this.state.data)
    loadModules(["esri/widgets/Search"])
      .then(([Search]) => {
        let address = document.getElementById("startLoc").value;

        this.state.searchWidget.search(address).then((event) => {
          const lat = event.results[0].results[0].feature.geometry.latitude;
          const lon = event.results[0].results[0].feature.geometry.longitude;
          const coords = [lon, lat];
          const addr = event.results[0].results[0].feature.attributes.Match_addr;
          this.setState({ start_loc: coords });
          this.setState({ start_address: addr });
          console.log(this.state.start_address)
        })
      });

    let objIdToUpdate = null;
    this.state.data.forEach((dat) => {
      if (dat.id == this.state.id) {
        objIdToUpdate = dat._id;
      }
    });

    console.log(this.state.office_id)
    axios.post('http://localhost:3001/api/updateUser', {
      id: objIdToUpdate,
      update: {
        name: this.state.name,
        email: this.state.email,
        arrive_work: this.state.arrive_work,
        leave_work: this.state.leave_work,
        driver: this.state.driver,
        office_id: this.state.office_id,
        start_loc: this.state.start_loc
      }
    })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  };

  addDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/addUser', {
      id: idToBeAdded,
      message: message,
    });
  };

  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteUser', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  //--------------------- JSX ---------------------\\
  render() {
    const startLoc = {
      backgroundColor: 'white',
      padding: '1px',
      border: '1px solid lightgrey',
      borderRadius: '4px'
    }

    const settingStyle = {
      margin: '20px'
    }
    return (
      <div style={settingStyle}>
        <Row>
          <Col md={12}>
            <p><b>This information will be used to match you with a carpool buddy!</b></p>
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
                defaultValue={this.state.username}
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
                onChange={(e) => this.setState({ email: e.target.value })}
                defaultValue={this.state.email}
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
                onChange={(e) => this.setState({ arrive_work: e.target.value })}
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
                onChange={(e) => this.setState({ leave_work: e.target.value })}
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
                onChange={(e) => this.setState({ driver: e.target.value })}
              >
                <option value={true}>Driver</option>
                <option value={false}>Passanger</option>
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
                onChange={(e) => this.setState({ office_id: e.target.value })}
                defaultValue={this.state.office_id}>
                <option value={1}>Redlands Main Campus</option>
                <option value={2}>Redlands V Buildings</option>
                <option value={3}>Charlotte</option>
                <option value={4}>Washington D.C.</option>
                <option value={5}>New York City</option>
                <option value={6}>Portland</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="startLocation">Pickup Location (Use the search bar and select a dropdown option. If you have privacy concerns, you can use a cross street or a store)</Label>

              <div id="startLoc" style={startLoc}></div>
              <Button color="success" className="float-right" onClick={() => this.updateDB()}>Save</Button>
            </FormGroup>
          </Col>
        </Row>

      </div>
    )
  };
}

export default Settings;