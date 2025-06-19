import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Public Pages
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import RequestResetPage from "./pages/RequestResetPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Unauthorized from "./pages/Unauthorized";

// Layouts and Guards
import Layout from "./components/Layout";
import RequireRole from "./components/RequireRole";
import AdminLayout from "./admin/AdminLayout";

// Admin Pages
import AdminDashboard from "./admin/AdminDashboard";
import ManageUsers from "./admin/ManageUsers";
import ManageRestaurants from "./admin/ManageRestaurants";
import ManageOrders from "./admin/ManageOrders";
import AdminSettings from "./admin/AdminSettings";

// Auth Logic
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { logout } from "./features/auth/authSlice";
import { isTokenExpired } from "./utils/checkTokenExpiry";

function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  // ⏳ Auto-logout on token expiration
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(logout());
    }
  }, [token, dispatch]);

  return (
    <div className="min-h-screen font-sans">
      <BrowserRouter>
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/menu" element={<Layout><MenuPage /></Layout>} />
          <Route path="/request-reset" element={<Layout><RequestResetPage /></Layout>} />
          <Route path="/reset-password" element={<Layout><ResetPasswordPage /></Layout>} />
          <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />

          {/* 🛡️ Admin Protected Routes */}
          <Route element={<RequireRole allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="restaurants" element={<ManageRestaurants />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* 🚧 Future: Owner or Driver Routes */}
          {/*
          <Route element={<RequireRole allowedRoles={["owner"]} />}>
            <Route path="/owner" element={<OwnerLayout />}>
              <Route index element={<OwnerDashboard />} />
            </Route>
          </Route>
          */}

          {/* ❌ 404 Fallback */}
          <Route
            path="*"
            element={
              <Layout>
                <div className="text-center py-20 text-2xl font-semibold text-red-600">
                  404 – Page Not Found
                </div>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
