import React, { Component } from 'react';
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';
import { loadModules, loadCss } from 'esri-loader';
import axios from 'axios';


class Settings extends Component {

  // initialize our state
  state = {
    searchWidget: null,
    data: [],
    id: 0,
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


  // initialize the map to pick start location
  initMap = () => {
    loadCss();
    loadModules(["esri/widgets/Search"])
      .then(([Search]) => {

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

  }

  // request info on person and then intialize
  componentDidMount() {
    this.getDataFromDb();
    this.setState({ name: 'John Doe' });
    this.setState({ email: 'example@esri.com' });
    this.initMap()
  };

  componentWillUnmount() {
    this.setState({ searchWidget: null });
    console.log('unmount')
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getAllUsers')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  updateDB = () => {
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

  render() {
    return (
      <div id='bodyComp'>
        <Row form>
          <Col md={8} className="col-centered">
            <Row form>
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
                    onChange={(e) => this.setState({ name: e.target.value })}
                    defaultValue={this.state.name}
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
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="startLocation">Pickup Location (Use the search bar and select a dropdown option. If you have privacy concerns, you can use a cross street or a store)</Label>
                  
                  <div id="startLoc"></div>
                  <Button color="success" className="float-right" onClick={() => this.updateDB()}>Save</Button>
                </FormGroup>
               
              </Col>
             
            </Row>
            
          </Col>
         
        </Row>

      </div>
    )
  };
}

export default Settings;