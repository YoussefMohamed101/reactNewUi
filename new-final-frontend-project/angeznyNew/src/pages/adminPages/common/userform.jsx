import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const UserForm = ({ formData, handleInputChange, handleSubmit }) => {
  const photoData = new FormData();
  const [photo, setPhoto] = useState(null);
  // formData.append("photo", photo);
  const [show, setShow] = useState(false);
  const [staffLevels, setStaffLevels] = useState([]);
  const [imagedata, setImagedata] = useState("");

  const handlePhotoChange = (event) => {
    console.log(event.target.files[0]);
    setPhoto(event.target.files[0]);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/staff", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setStaffLevels(response.data.data || []);
          // toast.success("product owners fectched successfully");
        } else {
          toast.error("failed to load the data");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("failed to load the data");

        // toast.error(error);
      });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitAndClose = () => {
    photoData.append("photo", photo);
    formData.profilePic = photoData.get("photo");
    handleSubmit();
    handleClose();
  };

  return (
    <>
      <div className="col-4 ">
        <Button className="btn btn-success mx-4" onClick={handleShow}>
          <i className="fa-solid fa-plus me-2"></i>
          <span>Add User</span>
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
            <h3 className="text-center">Add User</h3>
            <div className="row justify-content-center my-3">
              <div className="col-md-6 col-sm-12">
                <form className="d-flex flex-column">
                  {/*                   
                  <div className="row">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control"id="name" placeholder="Name"
                      name="name" value={formData.name} onChange={handleInputChange} required/>
                  </div> */}
                  <div className="row">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      onBlur={() => {
                        if (formData.name.trim() === "") {
                          toast.error("Name is required");
                        }
                      }}
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="userName">User name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      placeholder="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="gender">Gender</label>
                    <select
                      className="form-select"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="row">
                    <label htmlFor="nationalID">National ID</label>
                    <input
                      type="number"
                      className="form-control"
                      id="nationalID"
                      name="nationalID"
                      value={formData.nationalID}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* <div className="row">
                    <label htmlFor="password">Password</label>
                    <input type="password"className="form-control"
                      id="password" placeholder="Password"name="password"
                      value={formData.password}onChange={handleInputChange}required/>
                  </div> */}
                  <div className="row">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={6} // Set minimum length to 6 characters
                      onBlur={() => {
                        if (formData.password.length < 6) {
                          toast.error(
                            "Password should be at least 6 characters"
                          );
                        }
                      }}
                    />
                  </div>
                  {/* <div className="row ">
                    <label htmlFor="phone">Phone</label>
                    <input type="number"className="form-control" id="phone"
                      placeholder="Phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div> */}
                  <div className="row">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      className="form-control"
                      id="phone"
                      placeholder="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      minLength={11}
                      onBlur={() => {
                        if (formData.phone.length < 11) {
                          toast.error(
                            "Phone number should be at least 11 digits"
                          );
                        }
                      }}
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="row ">
                    <label htmlFor="joinedDate">Joined Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="joinedDate"
                      name="joinedDate"
                      value={formData.joinedDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* <div className="row ">
                    <label htmlFor="profilePic">Profile Picture</label>
                    <input
                      type="file"
                      className="form-control"
                      id="profilePic"
                      placeholder="Profile Picture"
                      name="profilePic"
                      value={formData.profilePic}
                      onChange={handleInputChange}
                    />
                  </div>   */}
                  {/* <input
                    type="file"
                    className="form-control"
                    id="profilePic"
                    placeholder="Profile Picture"
                    name="profilePic"
                    onChange={handleInputChange}
                  /> */}
                  <div className="row">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      placeholder="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="role">Role</label>
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="Admin">Admin</option>
                      <option value="ProductManager">Product Manager</option>
                      <option value="ProductOwner">Product Owner</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>
                  <div className="row">
                    <label htmlFor="role">Staff level</label>
                    <select
                      className="form-select"
                      id="staff"
                      name="staff"
                      value={formData.staff}
                      onChange={handleInputChange}
                    >
                      {staffLevels.map((level) => (
                        <option value={level.id}>{level.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="row">
                    <label htmlFor="img">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </div>
                  {/* <div className="row mb-3">
              <label htmlFor="skills">Skills</label>
              <input
                type="text"
                className="form-control"
                id="skills"
                placeholder="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
              />
            </div> */}
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitAndClose}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserForm;
