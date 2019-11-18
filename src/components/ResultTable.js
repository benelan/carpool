import React, {Component} from "react";
import { Col, Row, Table } from "reactstrap";

class ResultTable extends Component {

  state = {
    data: [],
    interval: false
  };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.interval) {
      let interval = setInterval(this.getDataFromDb, 60000);
      this.setState({ interval: interval });
    }
  }
  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({ interval: null });
    }
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getAllUsers')
      .then((data) => data.json())
      .then((res) => { 
        console.log(res.data)
        this.setState({ data: res.data })
        });
  };


  render() {
    const { data } = this.state;
    const resultStyle = {
      backgroundColor: 'white',
      border: '1px solid lightgrey',
      borderRadius: '4px',
      margin: '20px'
    };

    function renderSwitch(param) {
      switch(param) {
        case 1:
          return 'Driver';
          case 2:
              return 'Passenger';
        default:
          return 'Either';
      };
    };
    return (
      <div >
        <Row style={resultStyle}>
          
          <Col md={12} >
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ride Preference</th>
                  <th>Arrive At Work</th>
                  <th>Leave Work</th>
                  <th>Miles from Route</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
              {data.map((d)=>(
                <tr key={d.id}>
                  <td>{d.name}</td> 
                  <td>{renderSwitch(d.driver)}</td> 
                  <td>{d.arrive_work}</td> 
                  <td>{d.leave_work}</td>
                  <td>Not Calculated</td> 
                  <td>{d.email}</td> 
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