import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showVerificationLink, setShowVerificationLink] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);
    setShowVerificationLink(false);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setSuccess(true);
        setMessage("Login successful.");

        setTimeout(() => {
          if (data.user.role === "donor") {
            navigate("/donor/dashboard");
          } else if (data.user.role === "patient") {
            navigate("/patient/dashboard");
          } else if (data.user.role === "admin") {
            navigate("/admin/dashboard");
          }
        }, 1000);

      } else {

        setMessage(data.message || "Invalid login details.");

        if (
          data.message &&
          data.message.includes("verify")
        ) {
          setShowVerificationLink(true);
        }

      }

    } catch (error) {

      setMessage("Backend server is not running.");

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
          Login
        </h1>

        {message && (
          <div
            className={`mb-5 p-3 rounded-lg text-center font-medium ${
              success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <div className="flex justify-between mt-3 mb-5 text-sm">

            <Link
              to="/forgot-password"
              className="text-red-600 hover:underline"
            >
              Forgot Password?
            </Link>

            {showVerificationLink && (
              <Link
                to="/resend-verification"
                className="text-red-600 hover:underline"
              >
                Resend Verification
              </Link>
            )}

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white p-3 rounded font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Don't have an account?

          <Link
            to="/register"
            className="text-red-600 ml-1 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;