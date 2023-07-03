import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const TaskEditForm = ({ employee, handleUpdate }) => {
  const [selectedValue, setSelectedValue] = useState("byProject");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: event.target.value,
    }));
  };
  const [show, setShow] = useState(false);
  // console.log(employee);
  const [formData, setFormData] = useState(employee);

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
      [name]: value,
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
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-form my-2">
            <div className="row justify-content-center my-3">
              <div className="col-md-6 col-sm-12">
                <form className="d-flex flex-column">
                  <div className="row my-3">
                    <label>Task Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="row my-3">
                    <label>Task Description</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="row my-3">
                    <label>Start Date</label>
                    <input
                      type="datetime-local"
                      name="Start"
                      className="form-control"
                      value={formData.start}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <label>End Date</label>
                    <input
                      type="datetime-local"
                      name="end"
                      className="form-control"
                      value={formData.end}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* <div className="row mb-3">
                    <label>National ID</label>
                    <input
                      type="text"
                      name="nationalID"
                      className="form-control"
                      value={formData.user.nationalID}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <label>Joined Date</label>
                    <input
                      type="text"
                      name="joinedDate"
                      className="form-control"
                      value={formData.user.joinedDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <label>End Date</label>
                    <input
                      type="text"
                      name="endDate"
                      className="form-control"
                      value={formData.user.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <label>Profile Picture</label>
                    <input
                      type="text"
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
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Edit Task
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskEditForm;
