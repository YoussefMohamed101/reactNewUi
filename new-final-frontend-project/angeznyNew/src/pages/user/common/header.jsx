import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import NavBarC from "../clientPages/common/navBarC";
import NavBarD from "../developerPages/common/navBarD";
import NavBarF from "../freelancerpages/common/navBarF";
import NavBarM from "../productManagerpages/common/navBarM";
import NavBarO from "../productOwnerPages/common/navBarO";
import user1 from "../../../assets/images/user.png";
import "./style.css";
import axios from "axios";
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
  const [imageName, setImageName] = useState("user.png");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user/${localStorage.getItem("user_id")}`)
      .then((response) => {
        console.log(response.data.data);
        setImageName(response.data.data.profilePic || 0);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [imageName]);

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
      <MDBNavbar expand="lg" light bgColor="light" className="mb-1">
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

            {!isLoggedIn && (
              <Link className="submissionSign" to="/login">
                SignIn
              </Link>
            )}

            {!isLoggedIn && (
              <Link className="submissionSign" to="/register">
                SignUp
              </Link>
            )}

            {isLoggedIn && (
              <MDBDropdown className="DropLogout">
                <MDBDropdownToggle className="DropLogout">
                  <img
                    src={`http://localhost:8000/images/users/${imageName}`}
                    className="userprofile"
                    alt="User Profile"
                  />
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
      <div>
        {isLoggedIn && (
          <>
            {userRole === "Client" && <NavBarC />}
            {userRole === "Employee" && <NavBarD />}
            {userRole === "Freelancer" && <NavBarF />}
            {userRole === "ProductManager" && <NavBarM />}
            {userRole === "ProductOwner" && <NavBarO />}
          </>
        )}
      </div>
    </>
  );
};

export default Header;
