import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
  } from 'mdb-react-ui-kit';

const NavBarO = () => {
    const [showBasic, setShowBasic] = useState(false);
  return (
    <MDBNavbar expand='lg'   className='mainNav mb-5'>
     

      <MDBNavbarToggler
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
        onClick={() => setShowBasic(!showBasic)}
      >
        <MDBIcon icon='bars' fas />
      </MDBNavbarToggler>

      <MDBCollapse navbar show={showBasic}>
        <MDBNavbarNav className=' navBarContainer'>
            <MDBNavbarItem className='NavItem'>
          <Link className="nav-link text-white " to="/owner/project">
            <i className="font-weight-bold"></i> <span className="ml-3">project</span>
          </Link>
          </MDBNavbarItem>

            <MDBNavbarItem className='NavItem'>
          <Link className="nav-link text-white " to="/owner/chat">
            <i className="font-weight-bold"></i> <span className="ml-3">Chat</span>
          </Link>
          </MDBNavbarItem>
        </MDBNavbarNav>

      </MDBCollapse>
  </MDBNavbar>
  )
}

export default NavBarO