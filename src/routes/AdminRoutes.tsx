import { Route } from "react-router-dom";
import RequireRole from "../components/RequireRole";
import AdminLayout from "../admin/AdminLayout";
import AdminDashboard from "../admin/AdminDashboard";
import ManageUsers from "../admin/ManageUsers";
import ManageRestaurants from "../admin/ManageRestaurants";
import ManageOrders from "../admin/ManageOrders";
import AdminSettings from "../admin/AdminSettings";

export const AdminRoutes = (
  <Route element={<RequireRole allowedRoles={["admin"]} />}>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<ManageUsers />} />
      <Route path="restaurants" element={<ManageRestaurants />} />
      <Route path="orders" element={<ManageOrders />} />
      <Route path="settings" element={<AdminSettings />} />
    </Route>
  </Route>
);
