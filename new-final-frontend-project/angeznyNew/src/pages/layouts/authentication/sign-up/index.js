import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

// Authentication layout components
// import CoverLayout from 'layouts/authentication/components/CoverLayout';
import BasicLayout from 'layouts/authentication/components/BasicLayout';

// Images
import bgImage from 'assets/images/bg-sign-in-basic.jpeg';

//Material UI

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

function Cover() {
  const [accountType, setAccountType] = useState('client');
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male');
  const [acceptAgreements, setAcceptAgreements] = useState(false);

  const onSubmit = () => {
    console.log(email);
    console.log(password);
    console.log(name);
    console.log(userName);
    console.log(gender);
    console.log(accountType);
    console.log(acceptAgreements);

    if (name === '') {
      toast.error('Please enter your name');
    }

    // Check if email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      toast.error('Please enter your email');
    } else if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
    }

    if (password === '') {
      toast.error('Please enter your password');
    } else if (password.length < 8) {
      toast.error('Password should be at least 8 characters long');
    }

    // Check if password is at least 8 characters long

    if (!acceptAgreements) {
      toast.error('Please accept the agreements');
    }
    // axios
    //   .post('http://127.0.0.1:8000/api/login', { email, password })
    //   .then((response) => {
    //     // console.log(response.data.id);
    //     localStorage.setItem('user_id', response.data.id);
    //     localStorage.setItem('user_name', response.data.name);
    //     localStorage.setItem('user_role', response.data.role);
    //     localStorage.setItem('user_access_token', response.data.access_token);
    //     // setIsLoading(false);
    //     // toast.success('Logged in successfully!');
    //     switch (response.data.role) {
    //       case 'Admin':
    //         navigate('/dashboard');
    //         break;
    //       // case 'teacher':
    //       //   navigate('/t/');
    //       //   break;
    //       // case 'admin':
    //       //   navigate('/a/');
    //       //   break;
    //     }
    //   })
    //   .catch((error) => {
    //     // toast.error('login failed!');
    //     toast.error(error.response.data.message);
    //     console.log(error);
    //   });
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
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              value={gender}
              onChange={handleChange}
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>

            <FormLabel id="demo-row-radio-buttons-group-label">Select account type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              value={accountType}
              onChange={handleChange}
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="client" control={<Radio />} label="Client" />
              <FormControlLabel value="freelancer" control={<Radio />} label="Freelancer" />
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
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
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
              <MDButton onClick={onSubmit} variant="gradient" color="info" fullWidth>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={1} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{' '}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
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
