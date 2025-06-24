import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { isTokenExpired } from "../utils/checkTokenExpiry";

interface RequireRoleProps {
  allowedRoles: string[];
}

export default function RequireRole({ allowedRoles }: RequireRoleProps) {
  const { user, token } = useSelector((state: RootState) => state.auth);

  // ⏳ If auth state not loaded yet (possible on first mount)
  if (!user || !token) return null;

  // ❌ If token is expired — logout and redirect
  if (isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 If user exists but role is not allowed
  if (!allowedRoles.includes(user.user_type)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
