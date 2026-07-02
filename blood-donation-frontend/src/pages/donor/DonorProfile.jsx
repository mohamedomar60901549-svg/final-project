import { useEffect, useState } from "react";

function DonorProfile() {
  const [user, setUser] = useState(null);
  const [availability, setAvailability] = useState("Available");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);

      setUser(userData);

      setAvailability(
        userData.availability || "Available"
      );
    }
  }, []);

  const updateAvailability = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const newStatus =
        availability === "Available"
          ? "Unavailable"
          : "Available";

      const response = await fetch(
        "http://localhost:5000/api/auth/availability",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            availability: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAvailability(data.availability);

        const updatedUser = {
          ...user,
          availability: data.availability,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

        alert("Availability updated successfully.");
      } else {
        alert(data.message);
        console.log(data);
      }
    } catch (error) {
      console.error("Availability update error:", error);
      alert("Failed to update availability.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Profile 👤
      </h1>

      <div className="bg-white shadow rounded-lg p-8 max-w-2xl">
        <div className="space-y-4">
          <div>
            <h2 className="text-gray-500">Full Name</h2>
            <p className="text-xl font-semibold">
              {user.full_name}
            </p>
          </div>

          <div>
            <h2 className="text-gray-500">Email</h2>
            <p className="text-xl font-semibold">
              {user.email}
            </p>
          </div>

          <div>
            <h2 className="text-gray-500">Blood Group</h2>
            <p className="text-xl font-bold text-red-600">
              {user.blood_group}
            </p>
          </div>

          <div>
            <h2 className="text-gray-500">Location</h2>
            <p className="text-xl font-semibold">
              {user.location}
            </p>
          </div>

          <div>
            <h2 className="text-gray-500">Role</h2>
            <p className="text-xl font-semibold">
              {user.role}
            </p>
          </div>

          <div>
            <h2 className="text-gray-500">Availability</h2>

            <p
              className={
                availability === "Available"
                  ? "text-xl font-bold text-green-600"
                  : "text-xl font-bold text-red-600"
              }
            >
              {availability === "Available"
                ? "Available 🟢"
                : "Unavailable 🔴"}
            </p>
          </div>
        </div>

        <button
          onClick={updateAvailability}
          disabled={loading}
          className="mt-8 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading
            ? "Updating..."
            : availability === "Available"
            ? "Go Offline"
            : "Become Available"}
        </button>
      </div>
    </div>
  );
}

export default DonorProfile;