import { Navigate } from "react-router-dom";

function DonorRoute({ children }) {

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

  if (!user || user.role !== "donor") {
    return <Navigate to="/" replace />;
  }

  return children;

}

export default DonorRoute;