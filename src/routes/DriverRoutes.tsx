import { Route, Navigate } from "react-router-dom";
import RequireRole from "../components/RequireRole";
import DriverLayout from "../driver/DriverLayout";
import DriverDashboard from "../driver/DriverDashboard";
import DriverDeliveries from "../driver/DriverDeliveries";
import DriverMap from "../driver/DriverMap";

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
