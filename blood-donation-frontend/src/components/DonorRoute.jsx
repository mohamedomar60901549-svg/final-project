import { Navigate, Outlet } from "react-router-dom";

function DonorRoute() {

  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== "donor") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default DonorRoute;