import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const DeveloperGuard = () => {
  const isDeveloper = () => {
    const token = localStorage.getItem("token");
    const developer = jwtDecode(token);
    return developer.role === 'Employee'
  };
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token;
  };
  return (
    isLoggedIn() && isDeveloper() ?
    <Outlet/> 
    :
    <Navigate to='/login'/>
  )
};

export default DeveloperGuard;
