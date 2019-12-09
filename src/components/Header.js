import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
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
          <NavLink className="font-weight-bold" href={"/?email=" + e + "&name=" + n}>
            <img src={logo} alt="logo" className="img-fluid" style={{ width: 100 }} />
          </NavLink>
          <NavbarBrand className="d-inline-block p-0  align-items-left" href={"/?email=" + e + "&name=" + n}>
            <h1 style={{ font: '36px Arial Black' }}>arcpool beta</h1>
          </NavbarBrand>
        </NavItem>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="d-flex align-items-center">
              <NavLink tag={RRNavLink} className="font-weight-bold" to={"/results?email=" + e + "&name=" + n}>Results</NavLink>
            </NavItem>
            <NavItem className="d-flex align-items-center">
              <NavLink tag={RRNavLink} className="font-weight-bold"to={"/settings?email=" + e + "&name=" + n}>Settings</NavLink>
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