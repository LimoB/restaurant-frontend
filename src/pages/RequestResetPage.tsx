import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "@/services/auth";

function RequestResetPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    if (!email) {
      setError("Please enter your email address.");
      setMessage("");
      return;
    }

    try {
      setLoading(true);
      const res = await requestPasswordReset(email);
      setMessage(res.data.message || "Reset code sent to your email.");
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to request password reset.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Reset Your Password</h2>

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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          onClick={handleRequest}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Sending..." : "Send Reset Code"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have a code?{" "}
          <Link to="/reset-password" className="text-blue-600 hover:underline font-medium">
            Reset your password
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RequestResetPage;
