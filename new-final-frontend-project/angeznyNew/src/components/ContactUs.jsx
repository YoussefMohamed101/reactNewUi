import React, { useState } from "react";
import { MDBInput, MDBCheckbox, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import contact from "../assets/images/contact-us-banner_1200x_b5d96e9c-3ac4-4678-9aff-aba24ff2b0fc_1600x.webp";
import { toast } from "react-toastify";

import axios from "axios";

import "../styles/contactUs.css";
const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/contact-us", {
        name: name,
        email: email,
        subject: subject,
        message: message,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Send successfully");
        // handle successful submission
      })
      .catch((error) => {
        console.log(error);
        toast.success("Failed in send message please try again");

        // handle submission error
      });
  };
  return (
    <div>
      <section>
        <div className="container">
          <div className="row justify-content-center p-5 ">
            <div className="col-7 contact-us">
              <img src={contact} className="contactImg"></img>
            </div>

            <div className="col-4 contactForm">
              <form
                id="form"
                className=""
                style={{ width: "100%", maxWidth: "300px" }}
                onSubmit={handleSubmit}
              >
                <h2 className="d-flex justify-content-around p-5 align-items-center  fw-bolder">
                  Contact us
                </h2>
                <p className="labels">Name: </p>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  wrapperClass="mb-4"
                  class="inputs"
                />
                <p className="labels">Email: </p>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  wrapperClass="mb-4"
                  class="inputs"
                />
                <p className="labels">Subject: </p>
                <input
                  type="text"
                  value={subject}
                  wrapperClass="mb-4"
                  class="inputs mb-5"
                  onChange={(event) => setSubject(event.target.value)}
                />
                <button
                  type="submit"
                  class="contactButton "
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
