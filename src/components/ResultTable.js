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
      let interval = setInterval(this.getDataFromDb, 1000);
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
      .then((res) => this.setState({ data: res.data }));
  };

  render() {
    const { data } = this.state;
    return (
      <div >
        <Row id="resultComp">
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
              {data.length <= 0
            ? 'No Matches Found'
            : data.map((d) => (
                <tr key={d.id}>
                  <td>{d.message}</td> 
                  <td>{d.commute.driver}</td> 
                  <td>{d.commute.arrive_work}</td> 
                  <td>{d.commute.leave_work}</td>
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
