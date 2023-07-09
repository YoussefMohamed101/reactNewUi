import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../../../../styles/navStyles.css';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';

const NavBarC = () => {
    const [showBasic, setShowBasic] = useState(false);
    return (
      <div>
        <MDBNavbar expand="lg" className="NnavBarContainer mb-2">
        <MDBContainer fluid>
          <Link className="nav-link  logoName " to="/">
          </Link>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <div className=" headerMenu col-11">
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 linksMenu">
                <MDBNavbarItem className="linksWords">
                <Link className="nav-link  text-white" to="/client/project">
                    <i className="font-weight-bold"></i>{" "}
                    <span className="ml-3 ">Project</span>
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem className="linksWords">
                <Link className="nav-link  text-white" to="/client/chat">
                    <i className="font-weight-bold"></i>{" "}
                    <span className="ml-3 ">Chat</span>
                  </Link>
                </MDBNavbarItem>

                <MDBNavbarItem className="linksWords">
                <Link className="nav-link  text-white" to="/client/payment">
                    <i className="font-weight-bold"></i>{" "}
                    <span className="ml-3 ">Payment</span>
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem className="linksWords">
                <Link className="nav-link  text-white" to="/client/profile">
                    <i className="font-weight-bold"></i>{" "}
                    <span className="ml-3 ">Profile</span>
                  </Link>
                </MDBNavbarItem>

              </MDBNavbarNav>
            </div>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      </div>
      );
}

export default NavBarC
