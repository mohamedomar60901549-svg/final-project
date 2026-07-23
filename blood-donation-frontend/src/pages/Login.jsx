import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  Lock,
  ArrowRight,
  Heart,
  ChevronDown,
  Shield,
  User,
  Users,
  UserCog,
  Sparkles
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "donor",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationLink, setShowVerificationLink] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [welcomeName, setWelcomeName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const roles = [
    { value: "donor", label: "Donor", icon: <Heart className="size-3.5" /> },
    { value: "patient", label: "Patient", icon: <User className="size-3.5" /> },
    { value: "admin", label: "Administrator", icon: <UserCog className="size-3.5" /> },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role: role,
    }));
    setIsDropdownOpen(false);
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
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            // Send the role to the backend for validation
            role: formData.role,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Check if the returned role matches the selected role
        if (data.user.role !== formData.role) {
          setSuccess(false);
          setMessage(
            `❌ Invalid login attempt. You registered as a ${data.user.role} but tried to login as a ${formData.role}. Please select the correct account type.`
          );
          setLoading(false);
          return;
        }

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
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 soft-grid-bg opacity-40" aria-hidden />
      <div className="absolute inset-x-0 -top-40 -z-10 h-[300px] bg-gradient-to-b from-red-600/10 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 -bottom-40 -z-10 h-[300px] bg-gradient-to-t from-red-600/10 to-transparent" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px]"
      >
        <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-6 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mb-2 inline-flex size-12 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm"
            >
              <Heart className="size-6" />
            </motion.div>
            <h1 className="text-xl font-bold text-white tracking-tight">LifeLink</h1>
            <p className="text-xs text-red-100/90 mt-0.5">Sign in to your account</p>
          </div>

          <div className="p-6">
            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 overflow-hidden"
                >
                  <div className="flex flex-col items-center text-center">
                    <CheckCircle size={36} className="text-green-600 mb-2" />
                    <h2 className="text-base font-bold text-green-700">Welcome Back!</h2>
                    <p className="text-xs text-gray-600 mt-1">{welcomeName}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-red-100 text-red-700 px-3 py-0.5 text-xs font-medium">
                      {accountType}
                    </span>
                    <p className="mt-2 text-xs text-green-700">{message}</p>
                    <Loader2 size={18} className="animate-spin mt-2 text-green-600" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {!success && message && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 overflow-hidden"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-xs font-semibold text-red-700">Login Failed</h3>
                      <p className="text-xs text-red-600 mt-0.5">{message}</p>
                      {showVerificationLink && (
                        <Link
                          to="/resend-verification"
                          className="inline-block mt-1.5 text-xs text-red-700 font-medium hover:underline"
                        >
                          Resend Verification Email
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} autoComplete="off">
              {/* Role Selection */}
              <div className="mb-4">
                <label className="block mb-1.5 text-xs font-medium text-muted-foreground">
                  Account Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground hover:border-red-600/40 transition focus:outline-none focus:ring-2 focus:ring-red-600/15"
                  >
                    <span className="flex items-center gap-2">
                      {roles.find(r => r.value === formData.role)?.icon}
                      <span className="text-sm">{roles.find(r => r.value === formData.role)?.label}</span>
                    </span>
                    <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-10 mt-1.5 w-full rounded-lg border border-border bg-card shadow-md overflow-hidden"
                      >
                        {roles.map((role) => (
                          <button
                            key={role.value}
                            type="button"
                            onClick={() => handleRoleSelect(role.value)}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-sm transition ${
                              formData.role === role.value 
                                ? 'bg-red-50 text-red-600' 
                                : 'text-foreground hover:bg-slate-50'
                            }`}
                          >
                            {role.icon}
                            <span>{role.label}</span>
                            {formData.role === role.value && (
                              <CheckCircle className="size-3.5 ml-auto text-red-600" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1.5 text-xs font-medium text-muted-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="off"
                    spellCheck={false}
                    required
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/15 focus:border-red-600/40 transition"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block mb-1.5 text-xs font-medium text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/15 focus:border-red-600/40 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 mb-5">
                <Link
                  to="/forgot-password"
                  className="text-xs text-red-600 hover:text-red-700 hover:underline transition"
                >
                  Forgot password?
                </Link>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Shield className="size-3" />
                  Secure
                </span>
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition shadow-sm hover:shadow-red-600/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing in...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle size={16} />
                    Success
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="size-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center border-t border-border pt-5">
              <p className="text-xs text-muted-foreground">Don't have an account?</p>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 mt-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:underline transition"
              >
                Create an Account
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-muted-foreground mt-4">
          &copy; {new Date().getFullYear()} LifeLink. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}

export default Login;