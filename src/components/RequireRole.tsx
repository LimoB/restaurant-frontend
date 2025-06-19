import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../utils/checkTokenExpiry";

interface RequireRoleProps {
  allowedRoles: string[];
}

export default function RequireRole({ allowedRoles }: RequireRoleProps) {
  const token = localStorage.getItem("token");
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  // ❌ If no user or token, or token is expired — redirect to login
  if (!user || !token || isTokenExpired(token)) {
    localStorage.clear(); // Auto-logout
    return <Navigate to="/login" replace />;
  }

  // 🚫 If user exists but role not allowed — redirect to unauthorized page
  if (!allowedRoles.includes(user.user_type)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
