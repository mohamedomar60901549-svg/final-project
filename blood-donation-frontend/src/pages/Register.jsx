import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    blood_group: "",
    password: "",
    confirmPassword: "",
    role: "",
    location: "Nairobi",
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

    console.clear();
    console.log("========== REGISTER ==========");

    setMessage("");
    setSuccess(false);

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.phone ||
      !formData.blood_group ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role
    ) {
      console.log("Missing fields");
      setMessage("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      console.log("Invalid email");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      console.log("Password too short");
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending request...");

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
            blood_group: formData.blood_group,
            password: formData.password,
            role: formData.role,
            location: formData.location,
          }),
        }
      );

      console.log("Status:", response.status);

      const data = await response.json();

      console.log("Response:", data);

      if (response.ok) {
        setSuccess(true);
        setMessage(data.message);

        setFormData({
          full_name: "",
          email: "",
          phone: "",
          blood_group: "",
          password: "",
          confirmPassword: "",
          role: "",
          location: "Nairobi",
        });
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessage("Cannot connect to backend.");
    }

    setLoading(false);
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

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
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
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
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
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold p-3 rounded-lg"
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