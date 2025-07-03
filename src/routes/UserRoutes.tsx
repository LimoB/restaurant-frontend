import { Route } from "react-router-dom";
import RequireRole from "../components/RequireRole";
import UserLayout from "@/features/user/UserLayout";
import UserDashboard from "@/features/user/UserDashboard";
import MenuPage from "@/features/user/MenuPage";
import MyOrders from "@/features/user/MyOrders"; // Assuming MyOrders should be a separate page

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
