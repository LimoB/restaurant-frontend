import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import RequestResetPage from "./pages/RequestResetPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Layouts and guards
import Layout from "./components/Layout";
import RequireAdmin from "./components/RequireAdmin";
import AdminLayout from "./admin/AdminLayout";

// Admin pages
import AdminDashboard from "./admin/AdminDashboard";
import ManageUsers from "./admin/ManageUsers";
import ManageRestaurants from "./admin/ManageRestaurants";
import ManageOrders from "./admin/ManageOrders";
import AdminSettings from "./admin/AdminSettings";

function App() {
  return (
    <div className="min-h-screen font-sans">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/menu" element={<Layout><MenuPage /></Layout>} />
          <Route path="/request-reset" element={<Layout><RequestResetPage /></Layout>} />
          <Route path="/reset-password" element={<Layout><ResetPasswordPage /></Layout>} />

          {/* Protected Admin Routes with Layout */}
          <Route path="/admin" element={<RequireAdmin />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="restaurants" element={<ManageRestaurants />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
