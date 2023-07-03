import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import { MaterialUIControllerProvider } from "context";
import reportWebVitals from "./reportWebVitals";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
// import "./index.css";
import App from "./App";
// Material Dashboard 2 React Context Provider
const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
      <ToastContainer />
    </MaterialUIControllerProvider>
  </BrowserRouter>
);

reportWebVitals();

// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { MaterialUIControllerProvider } from 'context';

// import ReactDOM from 'react-dom/client';
// // import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';
// createRoot(document.getElementById('app')).render(
//   <>
//     <BrowserRouter>
//       <MaterialUIControllerProvider>
//         <App />
//         <ToastContainer />
//       </MaterialUIControllerProvider>
//     </BrowserRouter>
//   </>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
