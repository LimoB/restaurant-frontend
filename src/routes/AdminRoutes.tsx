import { Route } from "react-router-dom";
import RequireRole from "../components/RequireRole";
import AdminLayout from "../admin/AdminLayout";
import AdminDashboard from "../admin/AdminDashboard";
import ManageUsers from "../admin/ManageUsers/ManageUsers";
import ManageRestaurants from "../admin/ManageRestaurant/ManageRestaurants";
import ManageOwners from "../admin/ManageRestaurant/ManageOwners";
import ManageOrders from "../admin/ManageOrders/ManageOrders";
import AdminSettings from "../admin/AdminSettings";
import DriverManagement from "../admin/ManageDrivers/DriverManagement";
// import DriverForm from "../admin/ManageDrivers/DriverForm"; // ✅ New import
import ManageComments from "../admin/ManageComments/ManageComments";
import ManageMenu from "../admin/ManageMenu/ManageMenu";
import ManageCategories from "../admin/ManageCategories/ManageCategories";
import StateManage from "../admin/StateManage/ManageStates";
import ManageCities from "../admin/ManageCities/ManageCities";

export const AdminRoutes = (
  <Route element={<RequireRole allowedRoles={["admin"]} />}>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />

      {/* User Management */}
      <Route path="users" element={<ManageUsers />} />

      {/* Restaurant Management */}
      <Route path="restaurants" element={<ManageRestaurants />} />
      <Route path="restaurant-owners" element={<ManageOwners />} />

      {/* Orders, Menu, and Drivers */}
      <Route path="orders" element={<ManageOrders />} />
      <Route path="menu" element={<ManageMenu />} />
      <Route path="drivers" element={<DriverManagement />} />

      {/* Comments and Categorization */}
      <Route path="comments" element={<ManageComments />} />
      <Route path="categories" element={<ManageCategories />} />

      {/* Location Management */}
      <Route path="states" element={<StateManage />} />
      <Route path="cities" element={<ManageCities />} />

      {/* Settings */}
      <Route path="settings" element={<AdminSettings />} />
    </Route>
  </Route>
);
