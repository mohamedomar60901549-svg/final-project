import { Navigate } from "react-router-dom";

function PatientRoute({ children }) {

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!token) {

    return <Navigate to="/login" replace />;

  }

  if (!user || user.role !== "patient") {

    return <Navigate to="/" replace />;

  }

  return children;

}

export default PatientRoute;