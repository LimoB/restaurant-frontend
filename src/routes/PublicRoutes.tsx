import { Route } from "react-router-dom";
import Layout from "../components/PublicLayout";
import LandingPage from "../pages/LandingPage/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import RequestResetPage from "../pages/RequestResetPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import Unauthorized from "../pages/Unauthorized";
import MenuPage from "../user/MenuPage"; // Make sure this path is correct
import NotFound from "../components/NotFound"; // ✅ New reusable 404 component

export const PublicRoutes = (
  <>
    <Route path="/" element={<Layout><LandingPage /></Layout>} />
    <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
    <Route path="/login" element={<Layout><LoginPage /></Layout>} />
    <Route path="/menu" element={<Layout><MenuPage /></Layout>} />
    <Route path="/request-reset" element={<Layout><RequestResetPage /></Layout>} />
    <Route path="/reset-password" element={<Layout><ResetPasswordPage /></Layout>} />
    <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />

    {/* Reusable NotFound page */}
    <Route
      path="*"
      element={
        <Layout>
          <NotFound />
        </Layout>
      }
    />
  </>
);
