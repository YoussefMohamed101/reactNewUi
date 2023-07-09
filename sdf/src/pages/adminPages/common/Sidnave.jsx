import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Sidnave = () => {
  return (
    <div
      className="col-md-3 col-lg-2 sidebar-offcanvas pl-0 h-100"
      id="sidebar"
      role="navigation"
      style={{ backgroundColor: "#2a52be", position: "fixed", zIndex: 1000 }}
    >
      <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 h-100">
        <li className="nav-item mb-2 mt-3">
          <Link className="nav-link text-secondary text-light" to="/admin">
            <h5>Admin Dashboard</h5>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            className="nav-link text-secondary text-light"
            to="/admin/product-owner"
          >
            <i className="font-weight-bold"></i>{" "}
            <span className="ml-3">Product Owner</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            className="nav-link text-secondary text-light"
            to="/admin/product-manager"
          >
            {/* <i className="fas fa-user font-weight-bold"></i>{" "} */}
            <span className="ml-3">Product Manager</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            className="nav-link text-secondary text-light"
            to="/admin/developer"
          >
            <span className="ml-3">Developer</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            className="nav-link text-secondary text-light"
            to="/admin/freelancer"
          >
            <span className="ml-3">Freelancer</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            className="nav-link text-secondary text-light"
            to="/admin/client"
          >
            <span className="ml-3">Client</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            className="nav-link text-secondary text-light"
            to="/admin/payment"
          >
            <span className="ml-3">Payment</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            className="nav-link text-secondary text-light"
            to="/admin/projects"
          >
            <span className="ml-3">Projects</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            className="nav-link text-secondary text-light"
            to="/admin/tasks"
          >
            <span className="ml-3">Tasks</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidnave;
