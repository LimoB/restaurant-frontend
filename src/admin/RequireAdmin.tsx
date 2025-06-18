import { Navigate, Outlet } from "react-router-dom";

const RequireAdmin = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default RequireAdmin;
