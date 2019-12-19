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
import { observer, inject } from 'mobx-react'
import logo from '../logo.png';

const Header = inject("UserStore")(observer(({ UserStore }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const headerStyle = {
    backgroundColor: '#FFAA00',
    borderColor: '#FFF8EB',
    marginBottom: '40px'
  }

  return (
    <Navbar light expand="md" style={headerStyle} >
      <NavItem className="d-flex align-items-center">
        <img src={logo} alt="logo" className="img-fluid" style={{ width: 100 }} />
        <NavLink tag={RRNavLink} className="font-weight-bold" to={"/home"}>    <h1 style={{ font: '36px Arial Black', color: 'black' }}>carpool beta</h1>
        </NavLink>
      </NavItem>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
        <NavItem className="d-flex align-items-center">
            <NavLink tag={RRNavLink} className="font-weight-bold" to={"/home"}>Home</NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink tag={RRNavLink} className="font-weight-bold" to={"/results"}>Results</NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink tag={RRNavLink} className="font-weight-bold" to={"/settings"}>Settings</NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <div>{!!UserStore.userEmail && !!UserStore.userName ?
              <Button outline color="success" href="http://localhost:3001/logout">Logout</Button>
              : (
                <Button outline color="success" href="http://localhost:3001/auth/arcgis">Login</Button>
              )}</div>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}))

export default Header;