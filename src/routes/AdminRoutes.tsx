import { Route } from "react-router-dom";
import RequireRole from "@/components/RequireRole";
import AdminLayout from "@/features/admin/AdminLayout";
import AdminDashboard from "@/features/admin/AdminDashboard";
import ManageUsers from "@/features/admin/ManageUsers/ManageUsers";
import ManageRestaurants from "@/features/admin/ManageRestaurant/ManageRestaurants";
import ManageOwners from "@/features/admin/ManageRestaurant/ManageOwners";
import ManageOrders from "@/features/admin/ManageOrders/ManageOrders";
import AdminSettings from "@/features/admin/AdminSettings";
import DriverManagement from "@/features/admin/ManageDrivers/DriverManagement";
// import DriverForm from "../admin/ManageDrivers/DriverForm"; // New import
import ManageComments from "@/features/admin/ManageComments/ManageComments";
import ManageMenu from "@/features/admin/ManageMenu/ManageMenu";
import ManageCategories from "@/features/admin/ManageCategories/ManageCategories";
import StateManage from "@/features/admin/StateManage/ManageStates";
import ManageCities from "@/features/admin/ManageCities/ManageCities";

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
