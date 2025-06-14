import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../services/auth";

function RequestResetPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequest = async () => {
    try {
      const res = await requestPasswordReset(email);
      setMessage(res.data.message || "Reset code sent to your email.");
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to request reset.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>

        {message && (
          <p className="text-sm text-green-600 mb-4 text-center">{message}</p>
        )}
        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleRequest}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Send Reset Code
        </button>

        <p className="text-sm text-center mt-6">
          Already have a code?{" "}
          <Link to="/reset-password" className="text-blue-600 hover:underline">
            Reset your password
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RequestResetPage;
