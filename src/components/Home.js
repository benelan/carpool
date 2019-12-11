import React, { Component } from "react";
import { Col, Row, Button } from "reactstrap";
import axios from "axios";
import { observer, inject } from 'mobx-react'

const Home = inject("UserStore")(observer(
  class Home extends Component {
    componentDidMount() {
      this.getUserByEmail();
      axios.defaults.withCredentials = true
    }

    //--------------------- CRUD OPERATIONS ---------------------\\
    getUserByEmail = () => {
      // get user info by email
      axios.get("http://localhost:3001/api/getOneUser", {
        params: {
          email: this.props.UserStore.userEmail
        }
      })
        .then(res => {
        })
        .catch(err => {
          // handle any errors
          console.error(err);
        });
    }

    render() {
      const homeStyle = {
        margin: "20px"
      };
      return (
        <Row style={homeStyle}>
          <Col md={12}>
            <h2 className="text-center">Welcome {this.props.UserStore.userName}</h2>

            <Col md={4}>
              <p>If this is your first time visiting this app, fill out the <Button outline color="success" size="sm" href="/settings">Settings</Button>{' '} to get started. </p>

              <p>Otherwise, you can skip directly to the <Button outline color="success" size="sm" href="/results">Results</Button>{' '} to find a carpool buddy.</p>
            </Col>
          </Col>
        </Row>
      );
    }
  }
))
export default Home;
