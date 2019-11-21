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

import logo from '../logo.png';

const Header = (props) => {
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
          <NavLink className="font-weight-bold" href="/">
            <img src={logo} alt="logo" className="img-fluid" style={{ width: 100 }} />
          </NavLink>
          <NavbarBrand className="d-inline-block p-0  align-items-left" href="/">
            <h1 style={{ font: '38px Arial Black' }}>carpool</h1>
          </NavbarBrand>
        </NavItem>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="/settings">Settings</NavLink>
            </NavItem>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="/results">Results</NavLink>
            </NavItem>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="https://github.com/benelan/carpool">Github</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;