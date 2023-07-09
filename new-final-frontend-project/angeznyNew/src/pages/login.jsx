// import React, { useState } from "react";
import * as React from "react";

import { useNavigate } from "react-router-dom";
// import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import axios from "axios";
import FormContainer from "./formitems/FormContainer";
import InputField from "./formitems/InputField";
import { BrowserRouter as Router, Link } from "react-router-dom";
import business from "../assets/images/bussiness/business.png";
import "./style.css";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Perform form validation
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      // Send login request to the server using Axios
      await axios
        .post("http://127.0.0.1:8000/api/login", {
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem("user_id", res.data.id);
          localStorage.setItem("user_name", res.data.name);
          localStorage.setItem("user_userName", res.data.userName);
          localStorage.setItem("user_role", res.data.role);
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("isLogin", true);

          switch (res.data.role) {
            case "Admin":
              toast.success("Login successful");
              navigate("/admin/");
              break;
            case "Client":
              toast.success("Login successful");
              navigate("/client");
              break;
            case "Freelancer":
              toast.success("Login successful");
              navigate("/freelancer");
              break;
            case "Employee":
              toast.success("Login successful");
              navigate("/developer");
              break;
            case "ProductManager":
              toast.success("Login successful");
              navigate("/manager");
              break;
            case "ProductOwner":
              toast.success("Login successful");
              navigate("/owner");
              break;
            default:
              navigate("/register");
              break;
          }
        })
        .catch((err) => {
          toast.error(err.response.data.error);
          console.log(err);
        });
    } catch (error) {
      // Handle error cases
      toast.error("Failed to log in");
    }
  };

  return (
    <div className="LoginConatain">
      <Link className="nav-link  logoL mx-5  " to="/">
        <span className="firstLetter">A</span>ngezny
      </Link>
      <form onSubmit={handleLogin}>
        <MDBContainer
          className="card gradient-form mycard d-flex justify-content-center align-content-center px-5"
          title="Login"
        >
          <MDBRow>
            <MDBCol col="6" className="mb-5">
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="d-flex flex-column text-center pt-1 mb-5 pb-1">
                <MDBBtn
                  className="mb-4 w-50 mx-auto gradient-custom-2"
                  variant="contained"
                  type="submit"
                >
                  Sign in
                </MDBBtn>
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Don't have an account?</p>
                <Link className="nav-link text-white " to="/register">
                  <MDBBtn outline className="mx-2 registerbtn ">
                    create account
                  </MDBBtn>
                </Link>
              </div>
            </MDBCol>
            <MDBCol col="6" className="mb-5">
              <div
                className="d-flex flex-column  border justify-content-center gradient-custom-2 h-100 mb-4"
                style={{ borderRadius: "2rem" }}
              >
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 class="mb-4">We are more than just a company</h4>
                  <p class="small mb-0">
                    we have product owner and product mager , Product owner is a
                    person who has a good experience in business and
                    reasbonsable for dealing with Clients . Product manger or we
                    can say team lead is reasbonsable for understanding and
                    overseeing the the team on tasks
                  </p>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
    </div>
  );
};

export default Login;
