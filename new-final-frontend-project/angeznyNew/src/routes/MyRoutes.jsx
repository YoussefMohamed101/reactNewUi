import React, { Suspense, useState } from "react";
import {
  BrowserRouter,
  Switch,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import { CircleSpinner, WaveSpinner } from "react-spinners-kit";

// imports all pages

import Login from "../pages/login";
import SignIn from "../pages/layouts/authentication/sign-in";
import Register from "../pages/register";
import Home from "../pages/user/home";
import Chat from "../components/chat/chat";

import PaymentEmp from "../pages/user/common/paymentEmp";
import PaymentC from "../pages/user/clientPages/common/paymentC";
import PaymentF from "../pages/user/freelancerpages/common/paymentF";

import ContactUs from "../components/ContactUs";
import AboutUs from "../components/AboutUs";
import UserProfile from "../components/UserProfile";

import ClientProject from "../pages/user/clientPages/clientProject";
import StatusClient from "../pages/user/clientPages/common/navBarstatusC";

import DeveloperTask from "../pages/user/developerPages/task";
import StatusDeveloper from "../pages/user/developerPages/common/navBarStatusD";

import FreelancerTask from "../pages/user/freelancerpages/task";
import StatusFreelancer from "../pages/user/freelancerpages/common/navBarStatusF";

import Managerproject from "../pages/user/productManagerpages/Managerproject";
import ManagerTask from "../pages/user/productManagerpages/tasks";
import Status from "../pages/user/productManagerpages/common/navBarstatusM";

import Ownerproject from "../pages/user/productOwnerPages/Ownerproject";
import StatusOwner from "../pages/user/productOwnerPages/common/navBarstatusO";

import AdminClient from "../pages/adminPages/common/client";
import AdminDash from "../pages/adminPages/common/Dashboard";
import AdminSidnave from "../pages/adminPages/common/Sidnave";
import AdminFreelancer from "../pages/adminPages/common/freelancer";
import AdminDeveloper from "../pages/adminPages/common/developer";
import AdminPayment from "../pages/adminPages/common/payment";
import AdminManager from "../pages/adminPages/common/product_manger";
import AdminOwner from "../pages/adminPages/common/product_owner";
import AdminProject from "../pages/adminPages/common/project";
import AdminTask from "../pages/adminPages/common/task";
import AdminSkill from "../pages/adminPages/common/skills";
import AdminStaffLevel from "../pages/adminPages/common/staffLevels";
import AdminContactUs from "../pages/adminPages/common/contact-us";
import NavbarAdmin from "../pages/adminPages/common/NavbarAdmin";

// imports all guards
import LoggedInGuard from "../guard/LoggedInRoutes";
import ClientGuard from "../guard/ClientGuard";
import GuardRoute from "../guard/GuardRoute";
//imports all components
import Footer from "../pages/user/common/footer";
import Header from "../pages/user/common/header";
import NotFound from "../components/NotFound";
import Failed from "../pages/user/clientPages/common/failed"
import Success from "../pages/user/clientPages/common/success"

const MyRoutes = () => {
  // const [currentForm, setCurrentForm] = useState("Login");

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Home />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/contactUs"
          exact
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <ContactUs />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/aboutUs"
          exact
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <AboutUs />
              <Footer />
            </Suspense>
          }
        />

        <Route
          path="/userprofile"
          exact
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <UserProfile />
              <Footer />
            </Suspense>
          }
        />
        {/* <Route element={<LoggedInGuard />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LoggedInGuard />}>
          <Route path="/register" element={<Register />} />
        </Route> */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        {/* <Route element={<LoggedInGuard />}> */}
        <Route
          path="/admin/"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <div className="w-100 h-100">
              <NavbarAdmin className="col-12"/>
                <AdminSidnave className="col-2"style={{}}/>
                <AdminDash className="col-12" />
              </div>
              
            </Suspense>
          }
        />

        <Route
          path="/admin/product-owner"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
            
                <div className="w-100 h-100">
                <NavbarAdmin className="col-12"/>
                <AdminSidnave className="col-2"style={{}}/>
                <AdminOwner className="col-12" />
              </div>
            </Suspense>
          }
        />
        <Route
          path="/admin/product-manager"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60}/>
                </div>
              }
            >
              <div className="w-100 h-100">
                <NavbarAdmin className="col-12"/>
                <AdminSidnave className="col-2"style={{}}/>
                <AdminManager className="col-12" />
              </div>
            </Suspense>
          }
        />
        <Route
          path="/admin/developer"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <div className="w-100 h-100">
              <NavbarAdmin className="col-12"/>
                <AdminSidnave className="col-2"style={{}}/>
                <AdminDeveloper className="col-12" />
              </div>
            </Suspense>
          }
        />
        <Route
          path="/admin/freelancer"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <div className="w-100 h-100">
              <NavbarAdmin className="col-12"/>
                <AdminSidnave className="col-2"style={{}}/>
                <AdminFreelancer className="col-12" />
              </div>
            </Suspense>
          }
        />

        <Route
          path="/admin/payment"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <div className="row w-100 h-100">
                <NavbarAdmin className="col-12"/>
                <AdminSidnave className="col-2" style={{}} />
                <AdminPayment className="col-10" />
              </div>
            </Suspense>
          }
        />
        <Route
          path="/admin/client"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <div className="w-100 h-100">
              <NavbarAdmin className="col-12"/>
                <AdminSidnave className="col-2" style={{}} />
                <AdminClient className="col-10" />
              </div>
            </Suspense>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <div className="w-100 h-100">
              <NavbarAdmin className="col-12"/>
                <AdminSidnave className="col-2" style={{}} />
                <AdminProject className="col-12" />
              </div>
            </Suspense>
          }
        />

        <Route
          path="/admin/tasks"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <div className="w-100 h-100">
              <NavbarAdmin className="col-12"/>
                <AdminSidnave className="col-2" style={{}} />
                <AdminTask className="col-12" />
              </div>
            </Suspense>
          }
        />

        <Route
          path="/admin/skills"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <div className="w-100 h-100">
              <NavbarAdmin className="col-12"/>
                <AdminSidnave className="col-2" style={{}} />
                <AdminSkill className="col-12" />
              </div>
            </Suspense>
          }
        />

        <Route
          path="/admin/staffLevels"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <div className="w-100 h-100">
              <NavbarAdmin className="col-12"/>
                <AdminSidnave className="col-2" style={{}} />
                <AdminStaffLevel className="col-12" />
              </div>
            </Suspense>
          }
        />

        <Route
          path="/admin/contactUsForm"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <div className="w-100 h-100">
              <NavbarAdmin className="col-12"/>
                <AdminSidnave className="col-2" style={{}} />
                <AdminContactUs className="col-12" />
              </div>
            </Suspense>
          }
        />

        {/* </Route> */}

        {/* Client */}
        {/* <Route element={<clientGuard />}> */}
        <Route
          path="/client/"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Home />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/client/project"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <StatusClient />
              {/* <ClientProject /> */}
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/client/chat"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Chat />
              <Footer />
            </Suspense>
          }
        />

        <Route
          path="/client/payment"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <PaymentC />
              <Footer />
            </Suspense>
          }
        />

        <Route
          path="/client/payment/success"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >   
              <Header />
              <Success/>
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/client/payment/failed"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              
              <Header />
              <Failed/>
              <Footer />
            </Suspense>
          }
        /> 
        <Route
          path="/client/profile"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <UserProfile />
              <Footer />
            </Suspense>
          }
        />
        {/* </Route> */}

        {/* developer routes */}
        {/* <Route element={<DeveloperGuard />}> */}
        <Route
          path="/developer/"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Home />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/developer/task"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <StatusDeveloper />
              {/* <DeveloperTask /> */}
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/developer/chat"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Chat />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/developer/payment"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <paymentEmp />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/developer/profile"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <UserProfile />
              <Footer />
            </Suspense>
          }
        />

        {/* </Route> */}

        {/* freelancer routes */}
        {/* <Route element={<FreelancerGuard />}> */}
        <Route
          path="/freelancer/"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Home />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/freelancer/task"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              {/* <FreelancerTask /> */}
              <StatusFreelancer />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/freelancer/chat"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Chat />
              <Footer />
            </Suspense>
          }
        />

        <Route
          path="/freelancer/payment"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <PaymentF />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/freelancer/profile"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <UserProfile />
              <Footer />
            </Suspense>
          }
        />
        {/* </Route> */}
        {/* manager routes */}
        {/* <Route element={<ProductManagerGuard />}> */}
        <Route
          path="manager/"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Home />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/manager/task"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              {/* <ManagerTask /> */}
              <Status />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/manager/chat"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Chat />
              <Footer />
            </Suspense>
          }
        />

        <Route
          path="/manager/project"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              {/* <Managerproject /> */}
              <Status />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/manager/payment"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <paymentEmp />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/manager/profile"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <UserProfile />
              <Footer />
            </Suspense>
          }
        />

        {/* </Route> */}

        {/* Owner routes */}
        {/* <Route element={<ProductOwnerGuard />}> */}
        <Route
          path="owner/"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Home />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/owner/chat"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Chat />
              <Footer />
            </Suspense>
          }
        />

        <Route
          path="/owner/project"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              {/* <Ownerproject /> */}
              <StatusOwner />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/owner/payment"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <paymentEmp />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/owner/profile"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <UserProfile />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-blackm">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <NotFound />
              <Footer />
            </Suspense>
          }
        />

        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
