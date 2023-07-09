import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const SkillForm = ({ formData, handleInputChange, handleSubmit }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitAndClose = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <>
      <div className="col-4">
        <Button className="btn btn-success mx-4" onClick={handleShow}>
          <i className="fa-solid fa-plus me-2"></i>
          <span>Add Skills</span>
        </Button>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
            <h3 className="text-center">Add User</h3>
            <div className="row justify-content-center my-3">
              <div className="col-md-6 col-sm-12">
                <form className="d-flex flex-column">
                  <div className="row">
                    <label htmlFor="skill">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="skill"
                      placeholder="Skill"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
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
            Add Skill
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SkillForm;
