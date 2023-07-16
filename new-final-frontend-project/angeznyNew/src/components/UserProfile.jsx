import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";
// import jwt from 'jsonwebtoken';
import WebFont from "webfontloader";
import "../styles/userProfile.css";

import ClientEditForm from "./EditUserProfile";

import { Column } from "primereact/column";

import { toast } from "react-toastify";
import { Button, Card, Row, Col } from "react-bootstrap";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { Select, MenuItem } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Aos from "aos";
import "aos/dist/aos.css";
const UserProfile = () => {
  // animation
  useEffect(() => {
    Aos.init();
  }, []);
  const visaImageUrl =
    "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png";
  const visaImageUrl2 =
    "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png";

  const [activeButton, setActiveButton] = useState("online");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState("");
  const [selectedUser, setSelectedUser] = useState();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handleIDChange = (event) => {
    setNationalID(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/user/${userId}`,
        {
          name: name || selectedUser.name,
          email: user.email,
          password: password,
          address: address,
          phone: phone,
          country: country,
          nationalID: nationalID,
          profilePic: image,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User updated");

      // Fetch updated data
      getUserData();
    } catch (error) {
      toast.error("Error updating user: " + error.message);
    } finally {
      setOpen(false);
      setSelectedUser(null);
    }
  };

  const handleEditBtn = () => {
    setSelectedUser(user);
    setOpen(true);
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Font1",
          "Font2:ital,wght@0,400;0,700;1,400;1,700&display=swap",
        ],
      },
    });
  }, []);

  // Fetch user data
  const getUserData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/user/${userId}`)
      .then((response) => {
        console.log(response.data.data);
        setUser(response.data.data || 0);
        setName(response.data.data.name);
        // setPassword(response.data.data.password);
        setAddress(response.data.data.address);
        setCountry(response.data.data.country);
        setNationalID(response.data.data.nationalID);
        setPhone(response.data.data.phone);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  return (
    <>
      {user ? (
        <div>
          <Modal
            sx={{ overflow: "auto" }}
            open={open}
            onClose={() => setOpen(false)}
          >
            <ModalDialog
              aria-labelledby="basic-modal-dialog-title"
              aria-describedby="basic-modal-dialog-description"
              sx={{ maxWidth: 500 }}
            >
              <Typography id="basic-modal-dialog-title" component="h2">
                Edit user
              </Typography>
              <Typography
                id="basic-modal-dialog-description"
                textColor="text.tertiary"
              >
                Fill in the information of the Project.
              </Typography>
              <form onSubmit={handleEdit}>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={name}
                      onChange={handleNameChange}
                      autoFocus
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      value={password}
                      onChange={handlePasswordChange}
                      autoFocus
                      required
                      type="password"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                      value={address}
                      onChange={handleAddressChange}
                      autoFocus
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Country</FormLabel>
                    <Input
                      value={country}
                      onChange={handleCountryChange}
                      autoFocus
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      value={phone}
                      onChange={handlePhoneChange}
                      autoFocus
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>National ID</FormLabel>
                    <Input
                      value={nationalID}
                      onChange={handleIDChange}
                      autoFocus
                      required
                    />
                  </FormControl>
                  {/* <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              // value={image}
              type="file"
              onChange={handleIDChange}
              autoFocus
              required
            />
          </FormControl> */}
                  <Button type="submit">Edit</Button>
                </Stack>
              </form>
            </ModalDialog>
          </Modal>

          <div className="" style={{}}>
            <MDBContainer className="py-5 h-100">
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="9" xl="10">
                  <MDBCard>
                    <div
                      className="rounded-top text-white d-flex flex-row gradient-custom-2"
                      style={{ height: "200px" }}
                    >
                      <div
                        className="ms-4 mt-5 d-flex flex-column"
                        style={{ width: "150px" }}
                      >
                        <MDBCardImage
                          src={`http://localhost:8000/images/users/${user.profilePic}`}
                          // src={require(`../assets/images/${user.profilePic}`)}
                          alt="Generic placeholder image"
                          className="mt-4 mb-2 img-thumbnail"
                          fluid
                          style={{
                            width: "150px",
                            zIndex: "1",
                            borderRadius: "100px",
                          }}
                        />
                        {/* <MDBCardImage
                  src="data:image/png;base64,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"
                  alt="Generic placeholder image"
                  className="mt-4 mb-2 img-thumbnail"
                  fluid
                  style={{
                    width: "150px",
                    zIndex: "1",
                    borderRadius: "100px",
                  }}
                /> */}
                        <MDBBtn
                          outline
                          color="white"
                          style={{
                            height: "36px",
                            overflow: "visible",
                            backgroundColor: "black",
                            color: "#fff",
                          }}
                          onClick={() => handleEditBtn()}
                        >
                          Edit profile
                          <i class="fa-solid fa-pen-to-square mx-1 "></i>
                        </MDBBtn>
                      </div>

                      <div className="ms-3" style={{ marginTop: "100px" }}>
                        <MDBTypography tag="h5" className=" fs-1">
                          {user["name"]}
                        </MDBTypography>
                        <MDBCardText className="fs-3">
                          {user["email"]}
                        </MDBCardText>
                      </div>
                    </div>
                    <div
                      className="p-4 text-black"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          <MDBCardText className="mb-1 h5">
                            <i class="fa-solid fa-heart fa-xl "></i>
                          </MDBCardText>
                        </div>
                        <div className="px-3">
                          <MDBCardText className="mb-1 h5">
                            <i class="fa-solid fa-laptop-code fa-xl emoji"></i>
                          </MDBCardText>
                        </div>
                        <div>
                          <MDBCardText className="mb-1 h5">
                            <i class="fa-solid fa-face-smile fa-xl "></i>
                          </MDBCardText>
                        </div>
                      </div>
                      {localStorage.getItem("user_role") == "Freelancer" ? (
                        <div className="btn-group buttonsStatus">
                          <button
                            className={`btn ${
                              activeButton === "online"
                                ? "btn-primary active"
                                : ""
                            }`}
                            onClick={() => handleButtonClick("online")}
                          >
                            online
                          </button>
                          <button
                            className={`btn ${
                              activeButton === "invisible"
                                ? "btn-primary active"
                                : ""
                            }`}
                            onClick={() => handleButtonClick("invisible")}
                          >
                            invisible
                          </button>
                        </div>
                      ) : (
                        <div className="div-hidden"></div>
                      )}
                    </div>

                    <MDBCardBody className="text-black p-4">
                      <MDBCard data-aos="zoom-in">
                        {" "}
                        <div className="mb-5">
                          <MDBCardText className=" font-italic mb-2 text-center fw-bolder pt-3 fs-1">
                            <i class="fa-solid fa-user fa-lg Icons"></i> Angezny
                            member
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-2 text-center fs-3">
                            {user["userName"]}
                          </MDBCardText>
                        </div>
                      </MDBCard>

                      <div className="mb-5 ">
                        <p className="lead fw-normal mb-2 text-center fs-4 Icons fw-bolder pt-3 pb-3">
                          About
                        </p>{" "}
                        <div className="mb-5 d-flex">
                          <MDBCard className="w-50 mx-3">
                            <MDBCardText
                              className="font-italic mb-2 text-center mt-4 fs-5"
                              data-aos="fade-left"
                              data-aos-anchor="#example-anchor"
                              data-aos-offset="500"
                              data-aos-duration="500"
                            >
                              {user["gender"] == "female" ? (
                                <i class="fa-solid fa-venus fa-lg Icons"></i>
                              ) : (
                                <i class="fa-solid fa-mars fa-lg Icons"></i>
                              )}{" "}
                              Gender : {user["gender"]}
                            </MDBCardText>
                            <MDBCardText
                              className="font-italic mb-2 text-center mt-4 fs-5"
                              data-aos="fade-left"
                              data-aos-anchor="#example-anchor"
                              data-aos-offset="500"
                              data-aos-duration="500"
                            >
                              <i class="fa-solid fa-location-dot fa-lg Icons"></i>{" "}
                              Address :
                              {!user["address"]
                                ? "empty field"
                                : user["address"]}{" "}
                            </MDBCardText>
                            <MDBCardText
                              className="font-italic mb-2 text-center mt-4 fs-5 pb-4"
                              data-aos="fade-left "
                              data-aos-anchor="#example-anchor"
                              data-aos-offset="500"
                              data-aos-duration="500"
                            >
                              <i class="fa-solid fa-calendar fa-lg Icons"></i>{" "}
                              Goined date :{user["joinedDate"]}{" "}
                            </MDBCardText>
                          </MDBCard>
                          <MDBCard className="w-50">
                            <MDBCardText
                              className="font-italic mb-2 text-center mt-4 fs-5"
                              data-aos="fade-left"
                              data-aos-anchor="#example-anchor"
                              data-aos-offset="500"
                              data-aos-duration="500"
                            >
                              <i class="fa-solid fa-flag fa-lg Icons"></i>{" "}
                              Country :{" "}
                              {!user["country"]
                                ? "empty field"
                                : user["country"]}{" "}
                            </MDBCardText>{" "}
                            <MDBCardText
                              className="font-italic mb-2 text-center mt-4 fs-5"
                              data-aos="fade-left"
                              data-aos-anchor="#example-anchor"
                              data-aos-offset="500"
                              data-aos-duration="500"
                            >
                              <i class="fa-solid fa-address-card fa-lg Icons"></i>{" "}
                              National id :{" "}
                              {!user["nationalID"]
                                ? "empty field"
                                : user["nationalID"]}{" "}
                            </MDBCardText>{" "}
                            <MDBCardText
                              className="font-italic mb-2 text-center mt-4 fs-5"
                              data-aos="fade-left"
                              data-aos-anchor="#example-anchor"
                              data-aos-offset="500"
                              data-aos-duration="500"
                            >
                              <i class="fa-solid fa-phone fa-lg Icons"></i>{" "}
                              Phone :{" "}
                              {!user["phone"] ? "empty field" : user["phone"]}{" "}
                            </MDBCardText>
                          </MDBCard>
                        </div>
                        <div className="container containercard">
                          <div className="circles">
                            <div className="circle circle-1"></div>
                            <div className="circle circle-2"></div>
                          </div>
                          {/* <Link className="" to="/payment"> */}
                          <div className=" cardVisa">
                            <div className="visa_logo">
                              <img src={visaImageUrl} alt="" />
                            </div>
                            <div className="visa_info">
                              <img src={visaImageUrl2} alt="" />
                              <p>4586 7985 9271 6388</p>
                            </div>
                            <div className="visa_crinfo">
                              <p>02/12</p>
                              <p>Angezny</p>
                            </div>
                          </div>
                          {/* </Link> */}
                        </div>
                      </div>

                      {/* <MDBRow>
              <MDBCol className="mb-2">
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                  alt="image 1" className="w-100 rounded-3" />
              </MDBCol>
              <MDBCol className="mb-2">
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                  alt="image 1" className="w-100 rounded-3" />
              </MDBCol>
            </MDBRow> */}
                      {/* <MDBRow className="g-2">
              <MDBCol className="mb-2">
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                  alt="image 1" className="w-100 rounded-3" />
              </MDBCol>
              <MDBCol className="mb-2">
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                  alt="image 1" className="w-100 rounded-3" />
              </MDBCol>
            </MDBRow> */}

                      {
                        // old design
                      }
                      {/*  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>

                  <MDBCardText className="font-italic mb-2">
                    <i class="fa-solid fa-user fa-lg"></i> User name :{' '}
                    {user['userName']}
                  </MDBCardText>
                  <MDBCardText className="font-italic mb-2">
                    {user['gender'] == 'female' ? (
                      <i class="fa-solid fa-venus fa-lg"></i>
                    ) : (
                      <i class="fa-solid fa-mars fa-lg"></i>
                    )}{' '}
                    Gender : {user['gender']}
                  </MDBCardText>
                  <MDBCardText className="font-italic mb-2">
                    <i class="fa-solid fa-location-dot fa-lg"></i> Address :
                    {!user['address'] ? 'empty field' : user['address']}{' '}
                  </MDBCardText>
                  <MDBCardText className="font-italic mb-2">
                    <i class="fa-solid fa-calendar fa-lg"></i> Goined date :
                    {user['joinedDate']}{' '}
                  </MDBCardText>
                  <MDBCardText className="font-italic mb-2">
                    <i class="fa-solid fa-flag fa-lg"></i> Country :{' '}
                    {!user['country'] ? 'empty field' : user['address']}{' '}
                  </MDBCardText>{' '}
                  <MDBCardText className="font-italic mb-2">
                    <i class="fa-solid fa-address-card fa-lg"></i> National
                    id :{' '}
                    {!user['nationalID']
                      ? 'empty field'
                      : user['nationalID']}{' '}
                  </MDBCardText>{' '}
                  <MDBCardText className="font-italic mb-2">
                    <i class="fa-solid fa-phone fa-lg"></i> Phone :{' '}
                    {!user['phone'] ? 'empty field' : user['phone']}{' '}
                  </MDBCardText>
                </div> */}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default UserProfile;
