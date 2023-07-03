import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CometChat } from "@cometchat-pro/chat";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
// import CoverLayout from 'layouts/authentication/components/CoverLayout';
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

//Material UI

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";

function Cover() {
  const [accountType, setAccountType] = useState("Client");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [acceptAgreements, setAcceptAgreements] = useState(false);
  const navigate = useNavigate();

  const handleUserChat = () => {
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
        // You can now proceed with rendering your app or calling the login function.
        var uid = localStorage.getItem("user_id");
        var name = userName;
        var user = new CometChat.User(uid);
        user.setName(name);
        CometChat.createUser(user, authKey).then(
          (user) => {
            console.log("user created", user);
          },
          (error) => {
            console.log("error", error);
          }
        );
        // CometChat.login(uid, authKey).then(
        //   (user) => {
        //     console.log("Login Successful:", { user });
        //   },
        //   (error) => {
        //     console.log("Login failed with exception:", { error });
        //   }
        // );
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
  };

  const onSubmit = () => {
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
    console.log(accountType);
    console.log(acceptAgreements);

    if (name === "") {
      toast.error("Please enter your name");
    }

    // Check if email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      toast.error("Please enter your email");
    } else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
    }

    if (password === "") {
      toast.error("Please enter your password");
    } else if (password.length < 8) {
      toast.error("Password should be at least 8 characters long");
    }

    // Check if password is at least 8 characters long

    if (!acceptAgreements) {
      toast.error("Please accept the agreements");
    }

    if (
      name &&
      email &&
      password &&
      userName &&
      gender &&
      accountType &&
      acceptAgreements
    ) {
      if (accountType == "Client") {
        axios
          .post("http://127.0.0.1:8000/api/register/client", {
            name: name,
            userName: userName,
            email: email,
            password: password,
            gender: gender,
            role: accountType,
            joinedDate: formattedDate,
          })
          .then((response) => {
            localStorage.setItem("user_id", response.data.client.user.id);
            localStorage.setItem(
              "user_userName",
              response.data.client.user.userName
            );
            localStorage.setItem("user_name", response.data.client.user.name);
            localStorage.setItem("user_role", "Client");
            localStorage.setItem("user_access_token", response.data.token);
            // setIsLoading(false);
            // toast.success('Logged in successfully!');
            handleUserChat();
            navigate("/client");
          })
          .catch((error) => {
            // toast.error('login failed!');
            // toast.error(error.response.data.message);
            console.log(error);
          });
      } else {
        axios
          .post("http://127.0.0.1:8000/api/register/freelancer", {
            name: name,
            userName: userName,
            email: email,
            password: password,
            gender: gender,
            role: accountType,
            joinedDate: formattedDate,
          })
          .then((response) => {
            localStorage.setItem("user_id", response.data.client.user.id);
            localStorage.setItem("user_name", response.data.client.user.name);
            localStorage.setItem("user_role", "Client");
            localStorage.setItem("user_access_token", response.data.token);
            // setIsLoading(false);
            // toast.success('Logged in successfully!');
            handleUserChat();

            navigate("/freelancer");
          })
          .catch((error) => {
            // toast.error('login failed!');
            // toast.error(error.response.data.message);
            console.log(error);
          });
      }
    }
  };

  const handleChange = (event) => {
    setAccountType(event.target.value);
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={1}>
              <MDInput
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                label="Name"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                type="text"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                label="Username"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                label="Email"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                label="Password"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              value={gender}
              onChange={handleChange}
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>

            <FormLabel id="demo-row-radio-buttons-group-label">
              Select account type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              value={accountType}
              onChange={handleChange}
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="Client"
                control={<Radio />}
                label="Client"
              />
              <FormControlLabel
                value="Freelancer"
                control={<Radio />}
                label="Freelancer"
              />
            </RadioGroup>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox
                checked={acceptAgreements}
                onChange={(event) => setAcceptAgreements(event.target.checked)}
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={2} mb={1}>
              <MDButton
                onClick={onSubmit}
                variant="gradient"
                color="info"
                fullWidth
              >
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={1} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
