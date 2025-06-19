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
      await registerUser({
        name: formData.name,
        email: formData.email,
        contact_phone: formData.contact_phone,
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
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-2xl space-y-6">
        <h2 className="text-3xl font-bold text-primary text-center">
          {step === "form" ? "Create Your Account" : "Verify Your Email"}
        </h2>

        {message && (
          <div className={`alert ${isError ? "alert-error" : "alert-success"}`}>
            <span>{message}</span>
          </div>
        )}

        {step === "form" ? (
          <>
            <div className="form-control">
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-control">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-control">
              <input
                type="text"
                placeholder="Phone Number"
                className="input input-bordered"
                value={formData.contact_phone}
                onChange={(e) =>
                  setFormData({ ...formData, contact_phone: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="form-control relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered pr-10"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {formData.password && (
              <p className={`text-sm ${passwordStrength.className}`}>
                Strength: {passwordStrength.label}
              </p>
            )}

            {/* Confirm Password */}
            <div className="form-control relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="input input-bordered pr-10"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {!passwordsMatch && formData.confirmPassword && (
              <p className="text-sm text-red-500">❌ Passwords do not match</p>
            )}

            <div className="form-control">
              <select
                className="select select-bordered"
                value={formData.user_type}
                onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
              >
                <option value="member">Customer</option>
                <option value="owner">Restaurant Owner</option>
                <option value="driver">Driver</option>
              </select>
            </div>

            <button
              className="btn btn-primary w-full"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner" /> : "Register"}
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="link link-secondary">
                Log in
              </Link>
            </p>
          </>




        ) : (
          <>
            <p className="text-sm text-gray-600">
              Enter the 6-digit code sent to your email.
            </p>
            <div className="form-control">
              <input
                type="text"
                placeholder="123456"
                className="input input-bordered"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <button
              onClick={handleVerify}
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner" /> : "Verify Email"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
