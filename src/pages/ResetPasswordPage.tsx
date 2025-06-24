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
  const [loading, setLoading] = useState(false);

  const getStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;
    if (score >= 4) return "Strong";
    if (score >= 2) return "Medium";
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
      setLoading(true);
      const res = await resetPassword({ token, newPassword });
      setMessage(res.data.message || "✅ Password reset successful.");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "❌ Password reset failed.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Set New Password
        </h2>

        {message && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded border border-green-300 text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded border border-red-300 text-center">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
            Reset Token
          </label>
          <input
            id="token"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the token from your email"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="relative">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 pr-10"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-600"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {newPassword && (
          <p
            className={`text-sm ${strength === "Strong"
                ? "text-green-600"
                : strength === "Medium"
                  ? "text-yellow-600"
                  : "text-red-500"
              }`}
          >
            Strength: {strength}
          </p>
        )}

        <div className="relative">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 pr-10"
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-600"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {!passwordsMatch && confirmPassword && (
          <p className="text-sm text-red-500">❌ Passwords do not match</p>
        )}

        <button
          onClick={handleReset}
          disabled={
            loading ||
            !token ||
            !newPassword ||
            !confirmPassword ||
            newPassword.length < 6 ||
            !passwordsMatch
          }
          className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors ${loading ||
              !token ||
              !newPassword ||
              !confirmPassword ||
              newPassword.length < 6 ||
              !passwordsMatch
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
