import { Navigate, Outlet } from "react-router-dom";

function RequireAdmin() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || user.user_type !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RequireAdmin;
