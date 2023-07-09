import React from 'react';
import jwtDecode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
// Admin', 'Product Manager', 'Product Owner','Freelancer','Client','Employee'
const LoggedInGuard = () => {
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token;
  };
  const isClient = () => {
    const token = localStorage.getItem("token");
    const client = jwtDecode(token);
    console.log(client);
    return client.role === "Client";//t/f
  };
  const isFreelancer = () => {
    const token = localStorage.getItem("token");
    const freelancer = jwtDecode(token);
    return freelancer.role === "Freelancer";
  };
  const isProductOwner = () => {
    const token = localStorage.getItem("token");
    const productOwner = jwtDecode(token);
    return productOwner.role === "Product Owner";
  };
  const isProductManager = () => {
    const token = localStorage.getItem("token");
    const productManager = jwtDecode(token);
    return productManager.role === "Product Manager";
  };
  const isDeveloper = () => {
    const token = localStorage.getItem("token");
    const developer = jwtDecode(token);
    return developer.role === "Employee";
  };
  const isAdmin = () => {
    const token = localStorage.getItem("token");
    const admin = jwtDecode(token);
    return admin.role === "Admin";
  };
  return isLoggedIn() && isClient() ? (
    <Navigate to="/client/" />
  ) : isLoggedIn() && isFreelancer() ? (
    <Navigate to="/freelancer/" />
  ): isLoggedIn() && isProductOwner() ? (
    <Navigate to="/owner/" />
  ): isLoggedIn() && isProductManager() ? (
    <Navigate to="/manager/" />
  ): isLoggedIn() && isDeveloper() ? (
    <Navigate to="/developer/" />
  ) : isLoggedIn() && isAdmin() ? (
    <Navigate to="/admin/" />
  ) : (
    <Outlet />
  );
};

export default LoggedInGuard;
