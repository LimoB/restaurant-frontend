import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import RequestResetPage from "./pages/RequestResetPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Layout from "./components/Layout";
import RequireAdmin from "./components/RequireAdmin";

// ✅ Import all admin pages
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
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/menu" element={<Layout><MenuPage /></Layout>} />
          <Route path="/request-reset" element={<Layout><RequestResetPage /></Layout>} />
          <Route path="/reset-password" element={<Layout><ResetPasswordPage /></Layout>} />

          {/* ✅ Protected Admin Routes */}
          <Route path="/admin" element={<RequireAdmin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="restaurants" element={<ManageRestaurants />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
