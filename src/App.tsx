import { BrowserRouter as Router, Routes } from "react-router-dom";

// Protected Routes
import { OwnerRoutes } from "./routes/OwnerRoutes";
import { DriverRoutes } from "./routes/DriverRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { UserRoutes } from "./routes/UserRoutes"; // Optional

// Public Routes
import { PublicRoutes } from "./routes/PublicRoutes"; // ✅ Add this import

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public routes like /, /login, /register, etc. */}
        {PublicRoutes}

        {/* ✅ Protected role-based routes */}
        {OwnerRoutes}
        {DriverRoutes}
        {AdminRoutes}
        {UserRoutes}
      </Routes>
    </Router>
  );
}

export default App;
