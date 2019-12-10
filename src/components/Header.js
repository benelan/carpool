import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import logo from '../logo.png';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const headerStyle = {
    backgroundColor: '#FFAA00',
    borderColor: '#FFF8EB',
    marginBottom: '40px'
  }

  const { n, e } = props
  return (
    <div>
      <Navbar light expand="md" style={headerStyle} >
        <NavItem className="d-flex align-items-center">
          <img src={logo} alt="logo" className="img-fluid" style={{ width: 100 }} />
          <div>{!!e && !!n ?
            <NavLink tag={RRNavLink} className="font-weight-bold" to={"/?email=" + e + "&name=" + n}>
              <h1 style={{ font: '36px Arial Black', color: 'black' }}>arcpool beta</h1>
            </NavLink>
            : (
              <NavLink tag={RRNavLink} className="font-weight-bold" to={"/"}>    <h1 style={{ font: '36px Arial Black', color: 'black' }}>arcpool beta</h1>
              </NavLink>
            )}</div>
        </NavItem>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="d-flex align-items-center">
              <div>{!!e && !!n ?
                <NavLink tag={RRNavLink} className="font-weight-bold" to={"/results?email=" + e + "&name=" + n}>Results</NavLink>
                : (
                  <NavLink tag={RRNavLink} className="font-weight-bold" to={"/results"}>Results</NavLink>
                )}</div>
            </NavItem>
            <NavItem className="d-flex align-items-center">
              <div>{!!e && !!n ?
                <NavLink tag={RRNavLink} className="font-weight-bold" to={"/settings?email=" + e + "&name=" + n}>Settings</NavLink>
                : (
                  <NavLink tag={RRNavLink} className="font-weight-bold" to={"/settings"}>Settings</NavLink>
                )}</div>
            </NavItem>
            <NavItem className="d-flex align-items-center">
              <div>{!!e && !!n ?
                <Button outline color="success" href="http://localhost:3001/logout">Logout</Button>
                : (
                  <Button outline color="success" href="http://localhost:3001/auth/arcgis">Login</Button>
                )}</div>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;