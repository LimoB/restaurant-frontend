import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/auth";
import { Eye, EyeOff } from "lucide-react";

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    if (strength >= 4) return "Strong";
    if (strength >= 2) return "Medium";
    return "Weak";
  };

  const strength = getStrength(newPassword);
  const passwordsMatch = newPassword === confirmPassword;

  const handleReset = async () => {
    if (newPassword.length < 6) {
      setError("❌ Password must be at least 6 characters.");
      setMessage("");
      return;
    }

    if (!passwordsMatch) {
      setError("❌ Passwords do not match.");
      setMessage("");
      return;
    }

    try {
      const res = await resetPassword({ token, newPassword });
      setMessage(res.data.message || "✅ Password reset successful.");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "❌ Password reset failed.");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Set New Password
        </h2>

        {message && (
          <p className="text-sm text-green-600 mb-4 text-center">{message}</p>
        )}
        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="token"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Reset Token
          </label>
          <input
            id="token"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the token from your email"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        {/* New Password Field */}
        <div className="mb-2 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Password Strength Label */}
        {newPassword && (
          <p
            className={`text-sm mb-2 ${
              strength === "Strong"
                ? "text-green-600"
                : strength === "Medium"
                ? "text-yellow-600"
                : "text-red-500"
            }`}
          >
            Strength: {strength}
          </p>
        )}

        {/* Confirm Password Field */}
        <div className="mb-2 relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {!passwordsMatch && confirmPassword && (
          <p className="text-sm text-red-500 mb-3">❌ Passwords do not match</p>
        )}

        <button
          onClick={handleReset}
          disabled={
            !token ||
            !newPassword ||
            !confirmPassword ||
            newPassword.length < 6 ||
            !passwordsMatch
          }
          className={`w-full text-white py-2 px-4 rounded-md transition duration-200 ${
            !token ||
            !newPassword ||
            !confirmPassword ||
            newPassword.length < 6 ||
            !passwordsMatch
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
