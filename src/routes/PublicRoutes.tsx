import { Route } from "react-router-dom";
import Layout from "@/components/PublicLayout";
import LandingPage from "../pages/LandingPage/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import RequestResetPage from "../pages/RequestResetPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import Unauthorized from "../pages/Unauthorized";
import MenuPage from "@/features/user/MenuPage";
import AboutPage from "../pages/AboutPage";
import NotFound from "../components/NotFound";

export const PublicRoutes = (
  <Route element={<Layout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/menu" element={<MenuPage />} />
    <Route path="/request-reset" element={<RequestResetPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
    <Route path="/unauthorized" element={<Unauthorized />} />

    {/* ✅ No need to wrap AboutPage again */}
    <Route path="/about" element={<AboutPage />} />

    <Route path="*" element={<NotFound />} />
  </Route>
);
