import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const FreelancerGuard = () => {
  const isFreelancer = () => {
    const token = localStorage.getItem("token");
    const freelancer = jwtDecode(token);
    return freelancer.role === 'Freelancer'
  };
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token;
  };
  return (
    isLoggedIn() && isFreelancer() ?
    <Outlet/> 
    :
    <Navigate to='/login'/>
  )
};

export default FreelancerGuard;
