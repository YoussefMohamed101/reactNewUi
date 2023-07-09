import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const SkillEditForm = ({ employee, handleUpdate }) => {
  // console.log(employee);
  // console.log("a8asldk;aslkdasd");

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
          <Modal.Title>Edit Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-form my-2">
            <div className="row justify-content-center my-3">
              <div className="col-md-6 col-sm-12">
                <form className="d-flex flex-column">
                  <div className="row my-3">
                    <label>Skill Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Edit Skill
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SkillEditForm;
