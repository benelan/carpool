import React from 'react';
import logo from '../logo.png';

import {
  Container, Row, Col, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem
} from 'reactstrap';


export const Header = () => (
  <header>
    <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>
    
      <Container>
        <Row noGutters className="position-relative w-100 align-items-center">
        
          <Col className=" d-lg-flex justify-content-start">
            <Nav className="mrx-auto" navbar>
            
              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/">
                  <img src={logo} alt="logo" className="img-fluid" style={{ width: 100 }} />
                </NavLink>
                <NavbarBrand className="d-inline-block p-0" href="/">
                  <h1 style={{font: 'bold 34px Verdana'}}>carpool</h1>
                </NavbarBrand>
              </NavItem>
            </Nav>
          </Col>
          
          <Col className=" d-lg-flex justify-content-end">
          <Nav className="mrx-auto" navbar>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="/settings">Settings</NavLink>
            </NavItem>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" color="info" href="/login"><Button type="submit" color="info" outline>Login</Button></NavLink>
            </NavItem>
          </Nav>
          </Col>
          
        </Row>
      </Container>
      
    </Navbar>
  </header>
);