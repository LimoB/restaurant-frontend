import { useState } from "react";
import { registerUser, verifyEmail } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "verify">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_phone: "",
    password: "",
    confirmPassword: "",
    user_type: "member",
  });
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (strength <= 2) return { label: "Weak", className: "text-red-500" };
    if (strength <= 4) return { label: "Medium", className: "text-yellow-600" };
    return { label: "Strong", className: "text-green-600" };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleRegister = async () => {
    if (formData.password.length < 6) {
      setIsError(true);
      setMessage("❌ Password must be at least 6 characters.");
      return;
    }

    if (!passwordsMatch) {
      setIsError(true);
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await registerUser(formData);
      setStep("verify");
      setIsError(false);
      setMessage("✅ Verification code sent to your email.");
    } catch (err: any) {
      setIsError(true);
      setMessage(err.response?.data?.error || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      await verifyEmail(code);
      alert("✅ Email verified! You can now log in.");
      navigate("/login");
    } catch (err: any) {
      setIsError(true);
      setMessage(err.response?.data?.error || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80")',
      }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {step === "form" ? "Create Your Account" : "Verify Your Email"}
        </h2>

        {message && (
          <div
            className={`text-sm p-3 rounded border ${isError
              ? "bg-red-100 text-red-700 border-red-300"
              : "bg-green-100 text-green-700 border-green-300"
              }`}
          >
            {message}
          </div>
        )}

        {step === "form" ? (
          <>
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                placeholder="123-456-7890"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
              />
            </div>

            {/* Password */}
            <div className="space-y-1 relative">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {formData.password && (
                <p className={`text-sm mt-1 ${passwordStrength.className}`}>
                  Strength: {passwordStrength.label}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1 relative">
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {!passwordsMatch && formData.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">❌ Passwords do not match</p>
              )}
            </div>

            {/* User Type */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">User Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
                value={formData.user_type}
                onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
              >
                <option value="member">Customer</option>
                <option value="owner">Restaurant Owner</option>
                <option value="driver">Driver</option>
              </select>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className={`w-full py-2 px-4 rounded text-white font-semibold transition-colors ${loading
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-yellow-700 hover:bg-yellow-800"
                }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-sm text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-800 font-medium hover:underline">
                Log in
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-700 text-center">
              Enter the 6-digit code sent to your email.
            </p>
            <input
              type="text"
              placeholder="123456"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleVerify}
              disabled={loading}
              className={`w-full py-2 px-4 rounded text-white font-semibold transition-colors ${loading
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-yellow-700 hover:bg-yellow-800"
                }`}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
