import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Reports() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_donors: 0,
    total_patients: 0,
  });

  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [availableDonors, setAvailableDonors] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Statistics
    fetch("http://127.0.0.1:5000/api/auth/stats", {
      headers,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch(console.log);

    // Blood Requests
    fetch("http://127.0.0.1:5000/api/blood-requests/")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch(console.log);

    // Users
    fetch("http://127.0.0.1:5000/api/auth/users", {
      headers,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch(console.log);

    // Donors
    fetch("http://127.0.0.1:5000/api/auth/donors", {
      headers,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        const available = data.filter(
          (donor) =>
            donor.availability &&
            donor.availability.toLowerCase() === "available"
        ).length;

        setAvailableDonors(available);
      })
      .catch(console.log);
  }, []);

  const completed = requests.filter(
    (req) => req.status === "Completed"
  ).length;

  const pending = requests.filter(
    (req) => req.status === "Pending"
  ).length;

  const userChart = [
    {
      name: "Donors",
      value: stats.total_donors,
    },
    {
      name: "Patients",
      value: stats.total_patients,
    },
    {
      name: "Admins",
      value:
        stats.total_users -
        stats.total_donors -
        stats.total_patients,
    },
  ];

  const requestChart = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Pending",
      value: pending,
    },
  ];

  const groups = {};

  users.forEach((user) => {
    if (user.blood_group) {
      groups[user.blood_group] =
        (groups[user.blood_group] || 0) + 1;
    }
  });

  const bloodChart = Object.keys(groups).map((group) => ({
    name: group,
    value: groups[group],
  }));

  const COLORS = [
    "#ef4444",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
  ];

  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-red-700 to-red-500 text-white rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold">
          📊 System Reports
        </h1>
        <p className="mt-2">
          Monitor LifeLink blood donation activities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard
          title="Total Users"
          value={stats.total_users}
          icon="👥"
          color="bg-blue-500"
        />

        <StatCard
          title="Total Donors"
          value={stats.total_donors}
          icon="🩸"
          color="bg-red-500"
        />

        <StatCard
          title="Available Donors"
          value={availableDonors}
          icon="🟢"
          color="bg-green-500"
        />

        <StatCard
          title="Blood Requests"
          value={requests.length}
          icon="📄"
          color="bg-purple-500"
        />

        <StatCard
          title="Completed"
          value={completed}
          icon="✅"
          color="bg-emerald-500"
        />

        <StatCard
          title="Pending"
          value={pending}
          icon="⏳"
          color="bg-yellow-500"
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">
            User Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userChart}
                dataKey="value"
                outerRadius={100}
                label
              >
                {userChart.map((item, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">
            Request Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={requestChart}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#dc2626"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-bold mb-5">
          Blood Group Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bloodChart}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#dc2626"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-4xl font-bold">
          {value}
        </h2>
      </div>

      <div
        className={`${color} text-white text-3xl rounded-full w-16 h-16 flex items-center justify-center`}
      >
        {icon}
      </div>
    </div>
  );
}

export default Reports;