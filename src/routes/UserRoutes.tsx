import { Route } from "react-router-dom";
import RequireRole from "../components/RequireRole";
import UserLayout from "../user/UserLayout";
import UserDashboard from "../user/UserDashboard";
import MenuPage from "../user/MenuPage";
import MyOrders from "../user/MyOrders"; // Assuming MyOrders should be a separate page

export const UserRoutes = (
  <Route element={<RequireRole allowedRoles={["member"]} />}>
    <Route path="/user" element={<UserLayout />}>
      <Route index element={<UserDashboard />} />
      <Route path="orders" element={<MyOrders />} />       {/* 🛒 Orders */}
      <Route path="menu" element={<MenuPage />} />         {/* 📋 Browse Menu under user layout */}
      {/* ✅ Add more user-specific routes here */}
    </Route>
  </Route>
);
