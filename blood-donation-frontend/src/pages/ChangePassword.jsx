import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      setMessage("Please fill in all fields.");

      return;

    }

    if (newPassword !== confirmPassword) {

      setMessage("New passwords do not match.");

      return;

    }

    if (newPassword.length < 8) {

      setMessage(
        "Password must be at least 8 characters long."
      );

      return;

    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/change-password",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({

            current_password: currentPassword,

            new_password: newPassword,

          }),

        }
      );

      const data = await response.json();

      if (response.ok) {

        setSuccess(true);

        setMessage(data.message);

        setCurrentPassword("");

        setNewPassword("");

        setConfirmPassword("");

        setTimeout(() => {

          navigate("/dashboard");

        }, 2000);

      } else {

        setSuccess(false);

        setMessage(data.message);

      }

    } catch (error) {

      setSuccess(false);

      setMessage(
        "Unable to connect to the server."
      );

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          Change Password
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Update your LifeLink account password.
        </p>

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

          <div className="mb-4">

            <label className="block font-semibold mb-2">
              Current Password
            </label>

            <input
              type="password"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              required
            />

          </div>

          <div className="mb-4">

            <label className="block font-semibold mb-2">
              New Password
            </label>

            <input
              type="password"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              required
            />

          </div>

          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Confirm New Password
            </label>

            <input
              type="password"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Updating..."
              : "Change Password"}
          </button>

        </form>

      </div>

    </div>

  );

}

export default ChangePassword;