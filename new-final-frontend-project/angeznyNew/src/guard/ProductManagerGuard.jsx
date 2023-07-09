import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProductManagerGuard = () => {
  const isClient = () => {
    const token = localStorage.getItem("token");
    const productManager = jwtDecode(token);
    return productManager.role === 'Product Manager'
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

export default ProductManagerGuard;
