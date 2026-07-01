import { Routes, Route } from "react-router-dom";

// ================= PUBLIC =================
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home";
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

// ================= PATIENT =================
import PatientLayout from "../layouts/PatientLayout";
import PatientDashboard from "../pages/patient/PatientDashboard";
import CreateRequest from "../pages/patient/CreateRequest";
import MyRequests from "../pages/patient/MyRequests";
import FindDonors from "../pages/patient/FindDonors";

// ================= ADMIN =================
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageDonors from "../pages/admin/ManageDonors";
import BloodRequests from "../pages/admin/BloodRequests";
import Reports from "../pages/admin/Reports";
import ManageDonations from "../pages/admin/ManageDonations";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<PublicLayout />}>

        <Route index element={<Home />} />

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

      {/* ================= DONOR ROUTES ================= */}

      <Route
        path="/donor"
        element={
          <DonorRoute>
            <DonorLayout />
          </DonorRoute>
        }
      >

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

      </Route>

      {/* ================= PATIENT ROUTES ================= */}

      <Route
        path="/patient"
        element={
          <PatientRoute>
            <PatientLayout />
          </PatientRoute>
        }
      >

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

      </Route>

      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >

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

      </Route>

    </Routes>
  );
}

export default AppRoutes;