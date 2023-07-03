import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../../../../styles/navStyles.css'
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

const NavBarD = () => {
    const [showBasic, setShowBasic] = useState(false);
  return (
    <MDBNavbar expand='lg' className='mainNav mb-5'>
   
      

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

          {/* <MDBNavbarItem>
          <Link className="nav-link text-secondary " to="/developer">
            <i className="font-weight-bold"></i> <span className="ml-3">home</span>
          </Link>
          </MDBNavbarItem> */}
          <MDBNavbarItem className='NavItem'>

          <Link className="nav-link text-white " to="/developer/task">
            <i className="font-weight-bold"></i> <span className="ml-3">Task</span>
          </Link>
          </MDBNavbarItem>

          <MDBNavbarItem className='NavItem'>

          <Link className="nav-link text-white " to="/developer/chat">
            <i className="font-weight-bold"></i> <span className="ml-3">Chat</span>
          </Link>
          </MDBNavbarItem>
{/*     
          <MDBNavbarItem>
            <MDBDropdown>
              <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                Dropdown
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link>Action</MDBDropdownItem>
                <MDBDropdownItem link>Another action</MDBDropdownItem>
                <MDBDropdownItem link>Something else here</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarItem> */}

          {/* <MDBNavbarItem>
            <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
              Disabled
            </MDBNavbarLink>
          </MDBNavbarItem> */}

        </MDBNavbarNav>

        {/* <form className='d-flex input-group w-auto'>
          <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
          <MDBBtn color='primary'>Search</MDBBtn>
        </form> */}
      </MDBCollapse>
    
  </MDBNavbar>
  )
}

export default NavBarD