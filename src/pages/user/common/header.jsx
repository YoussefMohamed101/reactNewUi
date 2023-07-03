import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import NavBarC from "../clientPages/common/navBarC";
import NavBarD from "../developerPages/common/navBarD";
import NavBarF from "../freelancerpages/common/navBarF";
import NavBarM from "../productManagerpages/common/navBarM";
import NavBarO from "../productOwnerPages/common/navBarO";
import user1 from "../../../assets/images/user.png";
import "./style.css";
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
} from "mdb-react-ui-kit";

const Header = () => {
  const [showBasic, setShowBasic] = useState(false);
  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light" className="mb-3">
        <MDBContainer fluid>
          <Link className="nav-link  logoName " to="/">
            <span className="firstLetter">A</span>ngezny
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
            <div className=" headerMenu col-9">
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 linksMenu">
                <MDBNavbarItem className="linksWords">
                  <Link className="nav-link text-secondary " to="/">
                    <i className="font-weight-bold"></i>{" "}
                    <span className="ml-3 text-dark">Home</span>
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem className="linksWords">
                  <Link className="nav-link text-secondary " to="/contactUs">
                    <i className="font-weight-bold"></i>{" "}
                    <span className="ml-3 text-dark">Countact Us</span>
                  </Link>
                </MDBNavbarItem>

                <MDBNavbarItem className="linksWords">
                  <Link className="nav-link text-secondary " to="/aboutUs">
                    <i className="font-weight-bold"></i>{" "}
                    <span className="ml-3 text-dark">About Us</span>
                  </Link>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </div>

            <Link className="submissionSign" to="/login">
              Signin
            </Link>

            <MDBDropdown className="DropLogout">
              <MDBDropdownToggle className="DropLogout">
                <img src={user1} className="userprofile" alt="User Profile" />
                <span className="caret">User Name</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <Link className="nav-link  " to="/userprofile">
                  {" "}
                  <MDBDropdownItem link>User Profile </MDBDropdownItem>{" "}
                </Link>
                <Link className="nav-link  " to="/">
                  <MDBDropdownItem link>log out</MDBDropdownItem>
                </Link>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <div>
        <NavBarC />
        <NavBarD />
        <NavBarF />
        <NavBarM />
        <NavBarO />
      </div>
    </>
  );
};

export default Header;
