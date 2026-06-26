import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_donors: 0,
    total_patients: 0,
  });

  const [requests, setRequests] = useState([]);
  const [availableDonors, setAvailableDonors] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Load statistics
    fetch("http://127.0.0.1:5000/api/auth/stats", {
      headers,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => console.log(err));

    // Load blood requests
    fetch("http://127.0.0.1:5000/api/blood-requests/")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.log(err));

    // Load donors
    fetch("http://127.0.0.1:5000/api/auth/donors", {
      headers,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setAvailableDonors(
          data.filter(
            (donor) =>
              donor.availability &&
              donor.availability.toLowerCase() === "available"
          ).length
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const completedRequests = requests.filter(
    (req) => req.status === "Completed"
  ).length;

  const pendingRequests = requests.filter(
    (req) => req.status === "Pending"
  ).length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard 👨‍💼
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-600">
          <p className="text-gray-500">Total Users 👥</p>
          <h2 className="text-4xl font-bold mt-3">
            {stats.total_users}
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-600">
          <p className="text-gray-500">Total Donors 🩸</p>
          <h2 className="text-4xl font-bold text-red-600 mt-3">
            {stats.total_donors}
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-600">
          <p className="text-gray-500">Available Donors 🟢</p>
          <h2 className="text-4xl font-bold text-green-600 mt-3">
            {availableDonors}
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-purple-600">
          <p className="text-gray-500">Total Patients 🏥</p>
          <h2 className="text-4xl font-bold mt-3">
            {stats.total_patients}
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-orange-600">
          <p className="text-gray-500">Blood Requests 🩸</p>
          <h2 className="text-4xl font-bold text-orange-600 mt-3">
            {requests.length}
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-500">
          <p className="text-gray-500">Pending Requests ⏳</p>
          <h2 className="text-4xl font-bold text-yellow-600 mt-3">
            {pendingRequests}
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-700">
          <p className="text-gray-500">Completed Requests ✅</p>
          <h2 className="text-4xl font-bold text-green-700 mt-3">
            {completedRequests}
          </h2>
        </div>

      </div>

      <div className="mt-8 bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-5">
          System Status ⚙️
        </h2>

        <div className="space-y-3">
          <p className="text-green-600 font-semibold">
            🟢 System Active
          </p>

          <p>✅ Database Connected</p>

          <p>✅ Flask API Running</p>

          <p>✅ React Frontend Connected</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;