import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          Forgot Password
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Enter your email address to receive a password reset link.
        </p>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label className="block font-semibold mb-2">
            Email Address
          </label>

          <input
            type="email"
            required
            className="w-full border rounded-lg p-3 mb-5"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <div className="text-center mt-6">

          <Link
            to="/login"
            className="text-red-600 hover:underline"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;