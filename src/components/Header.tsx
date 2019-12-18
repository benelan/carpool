import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import logo from '../img/logo.png';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const headerStyle = {
    backgroundColor: '#FFAA00',
    borderColor: '#FFF8EB',
    marginBottom: '40px'
  }
  return (

    <div>
      <Navbar light expand="md" style={headerStyle} >
        <NavItem className="d-flex align-items-center">
          <NavLink className="font-weight-bold" href="https://www.esri.com/">
            <img src={logo} alt="logo" className="img-fluid" style={{ width: 100 }} />
          </NavLink>
          <NavbarBrand tag={RRNavLink} className="d-inline-block p-0  align-items-left" to="/">
            <h1 style={{ font: '36px Arial Black' }}>arcpool beta</h1>
          </NavbarBrand>
        </NavItem>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem className="d-flex align-items-center">
              <NavLink tag={RRNavLink} className="font-weight-bold" to="/home">Home</NavLink>
            </NavItem>
            <NavItem className="d-flex align-items-center">
              <NavLink tag={RRNavLink} className="font-weight-bold" to="/results">Results</NavLink>
            </NavItem>
            <NavItem className="d-flex align-items-center">
              <NavLink  tag={RRNavLink} className="font-weight-bold" to="/settings">Settings</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;