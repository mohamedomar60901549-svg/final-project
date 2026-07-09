import { Routes, Route } from "react-router-dom";

// ================= PUBLIC =================
import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import HowItWorks from "../pages/HowItWorks";
import Hospitals from "../pages/Hospitals";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import ChangePassword from "../pages/ChangePassword";
import ResendVerification from "../pages/ResendVerification";


// ================= ROUTE GUARDS =================
import PatientRoute from "../components/PatientRoute";
import DonorRoute from "../components/DonorRoute";
import AdminRoute from "../components/AdminRoute";


// ================= DONOR =================
import DonorLayout from "../layouts/DonorLayout";

import DonorDashboard from "../pages/donor/DonorDashboard";
import DonorProfile from "../pages/donor/DonorProfile";
import DonationHistory from "../pages/donor/DonationHistory";
import DonateBlood from "../pages/donor/DonateBlood";
import DonorChatPage from "../pages/donor/DonorChatPage";


// ================= PATIENT =================
import PatientLayout from "../layouts/PatientLayout";

import PatientDashboard from "../pages/patient/PatientDashboard";
import CreateRequest from "../pages/patient/CreateRequest";
import MyRequests from "../pages/patient/MyRequests";
import FindDonors from "../pages/patient/FindDonors";
import PatientChatPage from "../pages/patient/PatientChatPage";


// ================= ADMIN =================
import AdminLayout from "../layouts/AdminLayout";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageDonors from "../pages/admin/ManageDonors";
import BloodRequests from "../pages/admin/BloodRequests";
import ManageDonations from "../pages/admin/ManageDonations";
import Reports from "../pages/admin/Reports";
import AdminChatPage from "../pages/admin/AdminChatPage";



function AppRoutes() {


  return (

    <Routes>



      {/* =================================================
          PUBLIC WEBSITE
      ================================================= */}


      <Route path="/" element={<PublicLayout />}>



        {/* HOME */}

        <Route index element={<Home />} />



        {/* WEBSITE PAGES */}

        <Route path="about" element={<About />} />

        <Route 
          path="how-it-works" 
          element={<HowItWorks />} 
        />


        <Route 
          path="hospitals" 
          element={<Hospitals />} 
        />


        <Route 
          path="faq" 
          element={<FAQ />} 
        />


        <Route 
          path="contact" 
          element={<Contact />} 
        />



        {/* AUTH PAGES */}

        <Route path="login" element={<Login />} />

        <Route path="register" element={<Register />} />

        <Route 
          path="forgot-password" 
          element={<ForgotPassword />} 
        />


        <Route 
          path="reset-password/:token" 
          element={<ResetPassword />} 
        />


        <Route 
          path="verify-email/:token" 
          element={<VerifyEmail />} 
        />


        <Route 
          path="change-password" 
          element={<ChangePassword />} 
        />


        <Route 
          path="resend-verification" 
          element={<ResendVerification />} 
        />


      </Route>





      {/* =================================================
          DONOR DASHBOARD
      ================================================= */}


      <Route 
        path="/donor" 
        element={<DonorRoute />}
      >


        <Route element={<DonorLayout />}>


          <Route 
            path="dashboard" 
            element={<DonorDashboard />} 
          />


          <Route 
            path="profile" 
            element={<DonorProfile />} 
          />


          <Route 
            path="history" 
            element={<DonationHistory />} 
          />


          <Route 
            path="donate" 
            element={<DonateBlood />} 
          />


          <Route 
            path="chat" 
            element={<DonorChatPage />} 
          />


        </Route>


      </Route>







      {/* =================================================
          PATIENT DASHBOARD
      ================================================= */}


      <Route 
        path="/patient" 
        element={<PatientRoute />}
      >


        <Route element={<PatientLayout />}>


          <Route 
            path="dashboard" 
            element={<PatientDashboard />} 
          />


          <Route 
            path="request" 
            element={<CreateRequest />} 
          />


          <Route 
            path="requests" 
            element={<MyRequests />} 
          />


          <Route 
            path="donors" 
            element={<FindDonors />} 
          />


          <Route 
            path="chat" 
            element={<PatientChatPage />} 
          />


        </Route>


      </Route>







      {/* =================================================
          ADMIN DASHBOARD
      ================================================= */}


      <Route 
        path="/admin" 
        element={<AdminRoute />}
      >


        <Route element={<AdminLayout />}>


          <Route 
            path="dashboard" 
            element={<AdminDashboard />} 
          />


          <Route 
            path="users" 
            element={<ManageUsers />} 
          />


          <Route 
            path="donors" 
            element={<ManageDonors />} 
          />


          <Route 
            path="requests" 
            element={<BloodRequests />} 
          />


          <Route 
            path="donations" 
            element={<ManageDonations />} 
          />


          <Route 
            path="reports" 
            element={<Reports />} 
          />


          <Route 
            path="chat" 
            element={<AdminChatPage />} 
          />


        </Route>


      </Route>




    </Routes>

  );

}



export default AppRoutes;