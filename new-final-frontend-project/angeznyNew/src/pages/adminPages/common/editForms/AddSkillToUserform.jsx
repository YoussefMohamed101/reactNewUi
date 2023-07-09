import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { toast } from "react-toastify";

function AddSkillToUserForm({ skill }) {
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const handleUserChange = (event, newValue) => {
    setSelectedUser(newValue);
    console.log(newValue);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log(formData);
    handleResultClick();
    handleClose();
  };
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/user").then((response) => {
      console.log(response.data.data);
      // const data = response.json();

      setSearchResults(response.data.data);
    });
  }, []);

  const [show, setShow] = useState(false);
  // console.log(employee);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleResultClick = () => {
    axios
      .post("http://127.0.0.1:8000/api/user/Skills", {
        user_id: selectedUser.id,
        skill_id: skill.id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success == "true") {
          toast.success("Skill Added successfully");
        } else {
          toast.warn("Skill Already Added to the user");
        }
        // console.log(response.json());
        // handleUserChat(response.data.manager.user);
      })
      .catch((error) => {
        toast.success("Failed to Add Skill");

        console.log(error);

        // console.error(error);
        // toast.error("failed to load the data");

        // toast.error(error);
      });
  };

  return (
    <>
      <Button className="btn btn-warning me-4" onClick={handleShow}>
        <span>Add to user</span>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Autocomplete
            options={searchResults}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            value={selectedUser}
            onChange={handleUserChange}
            renderInput={(params) => <TextField {...params} label="User" />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Add Skill
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSkillToUserForm;
