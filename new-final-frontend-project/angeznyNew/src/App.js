import "./App.css";
import MyRoutes from "./routes/MyRoutes";
import React from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; //flex
import "react-toastify/dist/ReactToastify.css"
// import Admintest from "./pages/adminPages/admintest.jsx"

function App() {
  return (
    <div className="h-100">
      <MyRoutes></MyRoutes>
    </div>
  );
}

export default App;
