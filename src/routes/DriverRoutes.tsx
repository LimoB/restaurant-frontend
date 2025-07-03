import { Route, Navigate } from "react-router-dom";
import RequireRole from "@/components/RequireRole";
import DriverLayout from "@/features/driver/DriverLayout";
import DriverDashboard from "@/features/driver/DriverDashboard";
import DriverDeliveries from "@/features/driver/DriverDeliveries";
import DriverMap from "@/features/driver/DriverMap";

export const DriverRoutes = (
  <Route element={<RequireRole allowedRoles={["driver"]} />}>
    <Route path="/driver" element={<DriverLayout />}>
      {/* 🔁 Redirect /driver → /driver/dashboard */}
      <Route index element={<Navigate to="dashboard" replace />} />

      {/* ✅ Dashboard Route */}
      <Route path="dashboard" element={<DriverDashboard />} />

      {/* 🚚 Future driver-specific routes */}
      <Route path="deliveries" element={<DriverDeliveries />} /> 
       <Route path="map" element={<DriverMap />} />
    </Route>
  </Route>
);
