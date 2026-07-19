import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationLink, setShowVerificationLink] =
    useState(false);

  const [accountType, setAccountType] = useState("");
  const [welcomeName, setWelcomeName] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        const dashboardNames = {
          admin: "Administrator Dashboard",
          donor: "Donor Dashboard",
          patient: "Patient Dashboard",
        };

        const redirectPaths = {
          admin: "/admin/dashboard",
          donor: "/donor/dashboard",
          patient: "/patient/dashboard",
        };

        const roleNames = {
          admin: "Administrator",
          donor: "Donor",
          patient: "Patient",
        };

        const redirectPath =
          redirectPaths[data.user.role] || "/";

        const dashboard =
          dashboardNames[data.user.role] || "Home";

        const name =
          data.user.role === "admin"
            ? "LifeLink Administrator"
            : data.user.full_name;

        setSuccess(true);
        setWelcomeName(name);
        setAccountType(roleNames[data.user.role]);

        setMessage(
          `Redirecting to the ${dashboard}...`
        );

        setTimeout(() => {
          navigate(redirectPath);
        }, 1500);
      } else {
        setSuccess(false);

        setMessage(
          data.message || "Invalid email or password."
        );

        if (
          data.message &&
          data.message
            .toLowerCase()
            .includes("verify")
        ) {
          setShowVerificationLink(true);
        }
      }
    } catch (error) {
      console.error(error);

      setSuccess(false);

      setMessage(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="bg-red-600 text-white text-center px-8 py-8">
          <div className="text-5xl mb-2">🩸</div>

          <h1 className="text-3xl font-bold">
            LifeLink
          </h1>

          <p className="text-red-100 mt-2">
            Welcome Back
          </p>

          <p className="text-sm text-red-200 mt-1">
            Sign in to continue to your account
          </p>
        </div>

        <div className="p-8">

          {/* Success */}
          {success && (
            <div className="mb-6 rounded-xl border border-green-300 bg-green-50 p-5">

              <div className="flex flex-col items-center text-center">

                <CheckCircle
                  size={55}
                  className="text-green-600 mb-3"
                />

                <h2 className="text-xl font-bold text-green-700">
                  Login Successful
                </h2>

                <p className="mt-3 text-gray-700">
                  Welcome back,
                </p>

                <p className="font-semibold text-lg text-gray-900">
                  {welcomeName}
                </p>

                <span className="mt-3 inline-block rounded-full bg-red-100 text-red-700 px-4 py-1 text-sm font-semibold">
                  {accountType}
                </span>

                <p className="mt-4 text-green-700 font-medium">
                  {message}
                </p>

                <Loader2
                  size={26}
                  className="animate-spin mt-4 text-green-600"
                />

              </div>

            </div>
          )}

          {/* Error */}
          {!success && message && (
            <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4">

              <div className="flex items-start gap-3">

                <AlertCircle
                  size={24}
                  className="text-red-600 mt-1"
                />

                <div>

                  <h3 className="font-semibold text-red-700">
                    Login Failed
                  </h3>

                  <p className="text-red-600 mt-1">
                    {message}
                  </p>

                  {showVerificationLink && (
                    <Link
                      to="/resend-verification"
                      className="inline-block mt-3 text-red-700 font-semibold hover:underline"
                    >
                      Resend Verification Email
                    </Link>
                  )}

                </div>

              </div>

            </div>
          )}

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
          >

            <input
              type="text"
              name="fakeUsername"
              autoComplete="username"
              className="hidden"
            />

            <input
              type="password"
              name="fakePassword"
              autoComplete="current-password"
              className="hidden"
            />

            <div className="mb-5">

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="off"
                spellCheck={false}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none"
              />

            </div>

            <div className="mb-2">

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

                        <div className="flex items-center justify-between mt-3 mb-6">

              <Link
                to="/forgot-password"
                className="text-sm text-red-600 hover:text-red-700 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  Signing in...
                </>
              ) : success ? (
                <>
                  <CheckCircle size={20} />
                  Login Successful
                </>
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          <div className="mt-8 text-center border-t pt-6">

            <p className="text-gray-600">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="inline-block mt-2 font-semibold text-red-600 hover:text-red-700 hover:underline"
            >
              Create an Account
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;