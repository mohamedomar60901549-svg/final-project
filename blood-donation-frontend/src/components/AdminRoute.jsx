import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {

  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    user = null;
  }


  if (!token) {
    return <Navigate to="/login" replace />;
  }


  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }


  return <Outlet />;

}

export default AdminRoute;