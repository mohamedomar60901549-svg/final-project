import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.phone ||
      !formData.blood_group ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

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
            blood_group: formData.blood_group,
            password: formData.password,
            role: formData.role,
            location: formData.location,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Registration successful!");

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "donor") {
        navigate("/donor/dashboard");
      } else {
        navigate("/patient/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Backend server is not running.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
          Create Account
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (+254712345678)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg"
            required
          />

          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg"
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
            className="w-full border p-3 mb-4 rounded-lg"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg"
            required
          >
            <option value="">Select Role</option>
            <option value="donor">🩸 Donor</option>
            <option value="patient">🏥 Patient</option>
          </select>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold p-3 rounded-lg transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;