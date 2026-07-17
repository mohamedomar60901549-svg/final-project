import { useState } from "react";
import { Link } from "react-router-dom";

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
        setMessage(data.message);

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
      setMessage("Cannot connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Create Account
        </h1>

        {message && (
          <div
            className={`mb-5 p-3 rounded-lg text-center ${
              success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Hidden fields to reduce browser autofill */}
          <input
            type="text"
            name="fakeUsername"
            autoComplete="username"
            className="hidden"
            tabIndex={-1}
          />

          <input
            type="password"
            name="fakePassword"
            autoComplete="current-password"
            className="hidden"
            tabIndex={-1}
          />

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            autoComplete="off"
            spellCheck={false}
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            spellCheck={false}
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="off"
            spellCheck={false}
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Enter Your Location"
            value={formData.location}
            onChange={handleChange}
            autoComplete="off"
            spellCheck={false}
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
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

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-6"
            required
          >
            <option value="">Select Role</option>
            <option value="donor">🩸 Donor</option>
            <option value="patient">🏥 Patient</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold p-3 rounded-lg transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p>
            Already have an account?
            <Link
              to="/login"
              className="text-red-600 font-semibold ml-1 hover:underline"
            >
              Login
            </Link>
          </p>

          <p className="mt-3">
            <Link
              to="/resend-verification"
              className="text-red-600 hover:underline"
            >
              Didn't receive the verification email?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;