import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const ProductManagerEditForm = ({ employee, handleUpdate }) => {
  const [show, setShow] = useState(false);
  // console.log(employee);
  const [formData, setFormData] = useState(employee);

  const [staffLevels, setStaffLevels] = useState([]);

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
    handleSubmit();
    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      user: {
        ...prevFormData.user,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log(formData);
    handleUpdate(formData);
    handleClose();
  };

  return (
    <>
      <Button className="btn btn-info me-4" onClick={handleShow}>
        <span>Edit</span>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-form my-2">
            <div className="row justify-content-center my-3">
              <div className="col-md-6 col-sm-12">
                <form className="d-flex flex-column">
                  <div className="row my-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.user.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="row my-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control disabled"
                      value={formData.user.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="row my-3">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={formData.user.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={formData.user.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <label>National ID</label>
                    <input
                      type="number"
                      name="nationalID"
                      className="form-control"
                      value={formData.user.nationalID}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <label>Joined Date</label>
                    <input
                      type="date"
                      name="joinedDate"
                      className="form-control"
                      value={formData.user.joinedDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <label>End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      className="form-control"
                      value={formData.user.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <label>Profile Picture</label>
                    <input
                      type="file"
                      name="profilePic"
                      className="form-control"
                      value={formData.user.profilePic}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      className="form-control"
                      value={formData.user.country}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <label>Staff Level</label>
                      <Select
                        labelId="demo-simple-select-label"
                        id="staff"
                        name="staff"
                        value={formData.user.staff}
                        onChange={handleInputChange}
                        // autoFocus
                      >
                        {staffLevels.map((level) => (
                          <MenuItem value={level.id}>{level.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Edit User
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductManagerEditForm;
