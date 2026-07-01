import { useState } from "react";
import { Link } from "react-router-dom";

function ResendVerification() {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/resend-verification",
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

      if (response.ok) {
        setSuccess(true);
      }

      setMessage(data.message);

    } catch (error) {

      setSuccess(false);

      setMessage(
        "Unable to connect to the server. Please try again."
      );

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          Resend Verification
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Enter the email address you used to register.
          We'll send you a new verification email.
        </p>

        {message && (
          <div
            className={`mb-5 rounded-lg p-3 text-center font-medium ${
              success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Email Address
            </label>

            <input
              type="email"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Sending..."
              : "Resend Verification Email"}
          </button>

        </form>

        <div className="text-center mt-6">

          <Link
            to="/login"
            className="text-red-600 hover:underline font-semibold"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ResendVerification;