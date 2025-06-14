import { Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import ManageUsers from "./ManageUsers";
import ManageRestaurants from "./ManageRestaurants";
import ManageOrders from "./ManageOrders";
import AdminSettings from "./AdminSettings";

const AdminRoutes = (
    <>
        <Route path="" element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="restaurants" element={<ManageRestaurants />} />
        <Route path="orders" element={<ManageOrders />} />
        <Route path="settings" element={<AdminSettings />} />
    </>
);

export default AdminRoutes;
