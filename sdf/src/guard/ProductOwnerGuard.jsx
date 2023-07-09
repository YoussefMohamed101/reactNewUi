import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProductOwnerGuard = () => {
  const isClient = () => {
    const token = localStorage.getItem("token");
    const productOwner = jwtDecode(token);
    return productOwner.role === 'Product Owner'
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

export default ProductOwnerGuard;
