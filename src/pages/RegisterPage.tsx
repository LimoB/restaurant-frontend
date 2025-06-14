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
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        user_type: formData.user_type,
      });
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === "form" ? "Create Your Account" : "Verify Your Email"}
        </h2>

        {message && (
          <p
            className={`text-sm mb-4 ${
              isError ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        {step === "form" ? (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="input mb-3"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="input mb-3"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            {/* Password field */}
            <div className="relative mb-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input w-full pr-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {formData.password && (
              <p className={`text-sm mb-3 ${passwordStrength.className}`}>
                Strength: {passwordStrength.label}
              </p>
            )}

            {/* Confirm Password */}
            <div className="relative mb-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="input w-full pr-10"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {!passwordsMatch && formData.confirmPassword && (
              <p className="text-sm text-red-500 mb-2">
                ❌ Passwords do not match
              </p>
            )}

            <select
              className="input mb-4"
              value={formData.user_type}
              onChange={(e) =>
                setFormData({ ...formData, user_type: e.target.value })
              }
            >
              <option value="member">Customer</option>
              <option value="owner">Restaurant Owner</option>
              <option value="driver">Driver</option>
            </select>

            <button
              onClick={handleRegister}
              className="btn w-full mb-4"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="mb-2 text-sm text-gray-600">
              Enter the 6-digit code sent to your email.
            </p>
            <input
              type="text"
              placeholder="123456"
              className="input mb-4"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleVerify}
              className="btn w-full"
              disabled={loading}
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
