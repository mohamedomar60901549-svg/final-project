import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, MapPin, Droplets, Lock, 
  Eye, EyeOff, CheckCircle, AlertCircle, Loader2,
  Heart, ArrowRight, Shield, Users, UserPlus,
  Calendar, Activity, ClipboardCheck, ChevronDown
} from "lucide-react";

function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    blood_group: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.phone ||
      !formData.location ||
      !formData.blood_group ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            blood_group: formData.blood_group,
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setMessage(data.message || "Registration successful!");

        setFormData({
          full_name: "",
          email: "",
          phone: "",
          location: "",
          blood_group: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = 
    formData.full_name &&
    formData.email &&
    formData.phone &&
    formData.location &&
    formData.blood_group &&
    formData.password &&
    formData.confirmPassword &&
    formData.role;

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
        className="w-full max-w-[420px]"
      >
        <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mb-2 inline-flex size-12 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm"
            >
              <UserPlus className="size-6" />
            </motion.div>
            <h1 className="text-xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-xs text-red-100/90 mt-0.5">Join the LifeLink community</p>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto scrollbar-thin">
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
                    <h2 className="text-base font-bold text-green-700">Registration Successful!</h2>
                    <p className="text-xs text-gray-600 mt-1">{message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Please check your email to verify your account.
                    </p>
                    <Link
                      to="/login"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:underline transition"
                    >
                      Go to Login
                      <ArrowRight className="size-3.5" />
                    </Link>
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
                      <h3 className="text-xs font-semibold text-red-700">Registration Failed</h3>
                      <p className="text-xs text-red-600 mt-0.5">{message}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} autoComplete="off">
              {/* Hidden fields to reduce browser autofill */}
              <input type="text" name="fakeUsername" autoComplete="username" className="hidden" tabIndex={-1} />
              <input type="password" name="fakePassword" autoComplete="current-password" className="hidden" tabIndex={-1} />

              {/* Full Name */}
              <div className="mb-3.5">
                <label className="block mb-1 text-xs font-medium text-muted-foreground">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    autoComplete="off"
                    spellCheck={false}
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/15 focus:border-red-600/40 transition"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3.5">
                <label className="block mb-1 text-xs font-medium text-muted-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    spellCheck={false}
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/15 focus:border-red-600/40 transition"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-3.5">
                <label className="block mb-1 text-xs font-medium text-muted-foreground">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="off"
                    spellCheck={false}
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/15 focus:border-red-600/40 transition"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-3.5">
                <label className="block mb-1 text-xs font-medium text-muted-foreground">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter your location"
                    value={formData.location}
                    onChange={handleChange}
                    autoComplete="off"
                    spellCheck={false}
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/15 focus:border-red-600/40 transition"
                    required
                  />
                </div>
              </div>

              {/* Blood Group */}
              <div className="mb-3.5">
                <label className="block mb-1 text-xs font-medium text-muted-foreground">
                  Blood Group
                </label>
                <div className="relative">
                  <Droplets className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <select
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-8 py-2.5 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-red-600/15 focus:border-red-600/40 transition"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Role */}
              <div className="mb-3.5">
                <label className="block mb-1 text-xs font-medium text-muted-foreground">
                  Account Type
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-8 py-2.5 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-red-600/15 focus:border-red-600/40 transition"
                    required
                  >
                    <option value="">Select Account Type</option>
                    <option value="donor">🩸 Donor</option>
                    <option value="patient">🏥 Patient</option>
                    <option value="admin">👨‍💼 Administrator</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3.5">
                <label className="block mb-1 text-xs font-medium text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password (min 8 chars)"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/15 focus:border-red-600/40 transition"
                    required
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

              {/* Confirm Password */}
              <div className="mb-5">
                <label className="block mb-1 text-xs font-medium text-muted-foreground">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/15 focus:border-red-600/40 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || success || !isFormValid}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition shadow-sm hover:shadow-red-600/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating Account...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle size={16} />
                    Registered Successfully
                  </>
                ) : (
                  <>
                    <UserPlus className="size-4" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center border-t border-border pt-5">
              <p className="text-xs text-muted-foreground">Already have an account?</p>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 mt-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:underline transition"
              >
                Sign In
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="mt-3 text-center">
              <Link
                to="/resend-verification"
                className="text-xs text-muted-foreground hover:text-red-600 transition"
              >
                Didn't receive verification email?
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

export default Register;