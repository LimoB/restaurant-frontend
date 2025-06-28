// src/routes/OwnerRoutes.tsx
import { Route, Navigate } from "react-router-dom";
import RequireRole from "../components/RequireRole";
import OwnerLayout from "../owner/OwnerLayout";
import OwnerDashboard from "../owner/OwnerDashboard";
import OwnerMyRestaurants from "../owner/OwnerMyRestaurants";
import OwnerMenuPage from "../owner/OwnerMenuPage";

export const OwnerRoutes = (
  <Route element={<RequireRole allowedRoles={["owner"]} />}>
    <Route path="/owner" element={<OwnerLayout />}>
      {/* 🔁 Redirect /owner to /owner/dashboard */}
      <Route index element={<Navigate to="dashboard" replace />} />

      {/* ✅ Owner Dashboard */}
      <Route path="dashboard" element={<OwnerDashboard />} />

      {/* ✅ Owner Restaurants */}
      <Route path="restaurants" element={<OwnerMyRestaurants />} />

      {/* ✅ Owner Menu Management */}
      <Route path="menu" element={<OwnerMenuPage />} />
    </Route>
  </Route>
);
