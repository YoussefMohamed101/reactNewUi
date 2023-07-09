import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
// import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import axios from "axios";
import bus2 from "../assets/images/bussiness/busssm.avif";
import SelectField from "./formitems/SelectField";
import "./style.css";
import { CometChat } from "@cometchat-pro/chat";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

const handleUserChat = () => {
  console.log("asd");
  const appID = "240169ef153c40df";
  const region = "US";
  const authKey = "581f246117c147b5f041cf28049c89388b3fc5cd";
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

  CometChat.init(appID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
      var uid = localStorage.getItem("user_id");
      var name = localStorage.getItem("user_name");
      var user = new CometChat.User(uid);
      user.setName(name);

      CometChat.createUser(user, authKey).then(
        (user) => {
          console.log("User created", user);
          CometChat.login(uid, authKey).then(
            (user) => {
              console.log("Login Successful:", { user });
            },
            (error) => {
              console.log("Login failed with exception:", { error });
            }
          );
        },
        (error) => {
          console.log("Error creating user", error);
        }
      );
    },
    (error) => {
      console.log("Initialization failed with error:", error);
    }
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("Client");
  const [gender, setGender] = React.useState("male");

  const handleRegister = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // add 1 because month is zero-based
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    console.log(email);
    console.log(password);
    console.log(name);
    console.log(userName);
    console.log(gender);
    console.log(role);

    try {
      // Perform form validation
      if (!name || !userName || !email || !password || !role || !gender) {
        toast.error("Please fill in all fields");
        return;
      }

      // Send registration request to the server using Axios
      if (role == "Client") {
        await axios
          .post("http://127.0.0.1:8000/api/register/client", {
            name,
            userName,
            email,
            password,
            role,
            gender,
            joinedDate: formattedDate,
          })
          .then((res) => {
            console.log(res);
            localStorage.setItem("user_id", res.data.client.user.id);
            localStorage.setItem("user_name", res.data.client.user.name);
            localStorage.setItem(
              "user_userName",
              res.data.client.user.userName
            );
            localStorage.setItem("user_role", "Client");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isLogin", true);
            // setCurrentUserData(userData);
            handleUserChat();
            toast.success("Registration successful");
            navigate("/client");
          })
          .catch((error) => {
            toast.error("register failed!");
            toast.error(error.res.data.message);
            console.log(error);
          });
      } else {
        await axios
          .post("http://127.0.0.1:8000/api/register/freelancer", {
            name,
            userName,
            email,
            password,
            role,
            gender,
            joinedDate: formattedDate,
          })
          .then((res) => {
            localStorage.setItem(
              "user_userName",
              res.data.freelancer.user.userName
            );
            localStorage.setItem("user_id", res.data.freelancer.user.id);
            localStorage.setItem("user_name", res.data.freelancer.user.name);
            localStorage.setItem("user_role", "Freelancer");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isLogin", true);
            // setCurrentUserData(userData);
            handleUserChat();
            toast.success("Registration successful");
            navigate("/freelancer");
          })
          .catch((error) => {
            toast.error("register failed freelanser!");
            toast.error(error.res.data.message);
            console.log(error);
          });
      }
    } catch (error) {
      // Handle error cases
      toast.error("Failed to register");
    }
  };
  return (
    <div className="contain">
      <Link className="nav-link  logoL mx-5  " to="/">
        <span className="firstLetter">A</span>ngezny
      </Link>
      <MDBContainer fluid className="data">
        <MDBRow className="d-flex justify-content-center align-items-center h-100 p-5">
          <MDBCol>
            <MDBCard className="my-4 pt-5 px-5">
              <MDBRow className="g-0">
                <MDBCol md="6" className="d-none d-md-block">
                  <MDBCardImage
                    src={bus2}
                    alt="Sample photo"
                    className="rounded-start h-100"
                    fluid
                  />
                </MDBCol>
                <MDBCol md="6">
                  <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                    <h3 className="mb-5 text-uppercase fw-bold">
                      Angezny Company
                    </h3>

                    <form onSubmit={handleRegister}>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Enter Your Name"
                        size="lg"
                        id="form1"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Enter Your User Name"
                        size="lg"
                        id="form2"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Enter Your Email"
                        size="lg"
                        id="form3"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Enter Your Password"
                        size="lg"
                        id="form4"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <MDBRow className="g-0 d-flex justify-content-between">
                        <MDBCol md="5">
                          <div className="d-md-flex ustify-content-start align-items-center mb-4">
                            <SelectField
                              className="mt-4"
                              label="Role"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              options={["Client", "Freelancer"]}
                            />
                          </div>
                        </MDBCol>
                        <MDBCol md="5">
                          <div className="d-md-flex ustify-content-start align-items-center mb-4">
                            <SelectField
                              className="mt-4"
                              label="Gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              options={["male", "female"]}
                            />
                          </div>
                        </MDBCol>
                      </MDBRow>
                      <div className="d-flex justify-content-end pt-3">
                        <Link className="nav-link text-secondary " to="/login">
                          <MDBBtn className="mx-2 signInBtn gradient-custom-2">
                            Sign In
                          </MDBBtn>
                        </Link>
                        <MDBBtn
                          className=" mx-2 signInBtn gradient-custom-2"
                          type="submit"
                        >
                          Sign UP
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Register;
