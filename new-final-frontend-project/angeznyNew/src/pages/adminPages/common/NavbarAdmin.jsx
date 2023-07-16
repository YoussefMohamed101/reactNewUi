import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import user1 from "../../../assets/images/user.png";
import "./admin.css";
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

const NavbarAdmin = () => {
  const [showBasic, setShowBasic] = useState(false);
  const userRole = localStorage.getItem("user_role");
  const userName = localStorage.getItem("user_name");

  const isLoggedIn = !!userRole; // Check if user data exists

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("isLogin", false);
    // Perform any additional logout actions
  };

  return (
    <>
      <MDBNavbar
        expand="lg"
        light
        bgColor="light"
        className="mb-1"
        style={{ position: "fixed", zIndex: "999", width: "100%" }}
      >
        <MDBContainer fluid>
          <Link className="nav-link  logoName mx-5  " to="/">
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
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 linksMenu"></MDBNavbarNav>
            </div>
            {isLoggedIn && (
              <MDBDropdown className="DropLogout">
                <MDBDropdownToggle className="DropLogout">
                  <img src={user1} className="userprofile" alt="User Profile" />
                  <span className="caret">{userName}</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link className="nav-link  " to="/" onClick={handleLogout}>
                    <MDBDropdownItem link>Log out</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            )}
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default NavbarAdmin;
