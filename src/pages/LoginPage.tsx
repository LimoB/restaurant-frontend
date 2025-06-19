import { useState, useEffect } from "react";
import { loginUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);





  
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await loginUser(formData);
      const userData = res.data;

      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));

      rememberMe
        ? localStorage.setItem("rememberedEmail", formData.email)
        : localStorage.removeItem("rememberedEmail");

      switch (userData.user_type) {
        case "member":
          navigate("/menu");
          break;
        case "owner":
          navigate("/owner/dashboard");
          break;
        case "driver":
          navigate("/driver/dashboard");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/menu");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>
        <p className="text-sm text-center text-gray-400">
          Enter your credentials to access your account
        </p>

        {error && (
          <div className="text-sm text-red-400 bg-red-900/30 border border-red-500 rounded-lg p-3">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full input input-bordered bg-base-200 text-white"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="space-y-1 relative">
          <label className="text-sm font-medium text-gray-300">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full input input-bordered bg-base-200 text-white pr-10"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Remember Me / Forgot */}
        <div className="flex justify-between items-center text-sm text-gray-400">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="checkbox checkbox-sm"
            />
            Remember me
          </label>
          <Link to="/request-reset" className="text-blue-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? <span className="loading loading-spinner" /> : "Login"}
        </button>

        {/* Register */}
        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
