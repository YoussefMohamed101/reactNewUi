import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import React from 'react';

const ClientGuard = () => {
  const isClient = () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem('user_role');
    const client = jwtDecode(token);
    console.log(client);
    return userRole === 'Client'
  };
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token;
  };
  return (
    isLoggedIn() && isClient() ?
    <Outlet/> 
    :
    <Navigate to='/login'/>
  )
};

export default ClientGuard;
