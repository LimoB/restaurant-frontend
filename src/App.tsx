import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { logout } from "./features/auth/authSlice";
import { isTokenExpired } from "./utils/checkTokenExpiry";

// Layout
import Layout from "./components/PublicLayout";

// Route groups
import { PublicRoutes } from "./routes/PublicRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { UserRoutes } from "./routes/UserRoutes"; // ✅ Import member routes

function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(logout());
    }
  }, [token, dispatch]);

  return (
    <div className="min-h-screen font-sans">
      <BrowserRouter>
        <Routes>
          {PublicRoutes}
          {AdminRoutes}
          {UserRoutes} {/* ✅ Member routes added */}

          {/* ❌ 404 fallback */}
          <Route
            path="*"
            element={
              <Layout>
                <div className="text-center py-20 text-2xl font-semibold text-red-600">
                  404 – Page Not Found
                </div>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
