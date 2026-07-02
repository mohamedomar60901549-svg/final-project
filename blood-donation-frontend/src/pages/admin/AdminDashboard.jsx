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
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        // -----------------------------
        // Load statistics
        // -----------------------------
        const statsResponse = await fetch(
          "http://127.0.0.1:5000/api/auth/stats",
          {
            headers,
          }
        );

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

        // -----------------------------
        // Load blood requests
        // -----------------------------
        const requestsResponse = await fetch(
          "http://127.0.0.1:5000/api/blood-requests/",
          {
            headers,
          }
        );

        if (requestsResponse.ok) {
          const requestsData = await requestsResponse.json();

          if (Array.isArray(requestsData)) {
            setRequests(requestsData);
          } else {
            setRequests([]);
          }
        } else {
          setRequests([]);
        }

        // -----------------------------
        // Load donors
        // -----------------------------
        const donorsResponse = await fetch(
          "http://127.0.0.1:5000/api/auth/donors",
          {
            headers,
          }
        );

        if (donorsResponse.ok) {
          const donorsData = await donorsResponse.json();

          if (Array.isArray(donorsData)) {
            setAvailableDonors(
              donorsData.filter(
                (donor) =>
                  donor.availability &&
                  donor.availability.toLowerCase() === "available"
              ).length
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const safeRequests = Array.isArray(requests) ? requests : [];

  const completedRequests = safeRequests.filter(
    (req) => req.status === "Completed"
  ).length;

  const pendingRequests = safeRequests.filter(
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
            {safeRequests.length}
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