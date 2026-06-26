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

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/auth/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));

    fetch("http://127.0.0.1:5000/api/blood-requests/")
      .then((res) => res.json())
      .then((data) => setRequests(data));

    fetch("http://127.0.0.1:5000/api/auth/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
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
    "#8b5cf6",
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-red-700 to-red-500 text-white rounded-xl p-8 shadow-lg">

        <h1 className="text-4xl font-bold">
          📊 System Reports
        </h1>

        <p className="mt-2 text-red-100">
          Monitor donors, patients, blood requests and
          overall system performance.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Users"
          value={stats.total_users}
          icon="👥"
          color="bg-blue-500"
        />

        <StatCard
          title="Registered Donors"
          value={stats.total_donors}
          icon="🩸"
          color="bg-red-500"
        />

        <StatCard
          title="Patients"
          value={stats.total_patients}
          icon="🏥"
          color="bg-green-500"
        />

        <StatCard
          title="Blood Requests"
          value={requests.length}
          icon="📄"
          color="bg-purple-500"
        />

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-4">
            Users Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={userChart}
                dataKey="value"
                outerRadius={100}
                label
              >

                {userChart.map((entry, index) => (
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

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-4">
            Blood Request Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={requestChart}>

              <XAxis dataKey="name" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#dc2626"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Blood Groups */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-6">
          Blood Group Distribution
        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={bloodChart}>

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#dc2626"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="font-bold text-xl mb-4">
            📈 System Summary
          </h2>

          <ul className="space-y-3">

            <li>
              👥 Total Users:
              <strong> {stats.total_users}</strong>
            </li>

            <li>
              🩸 Registered Donors:
              <strong> {stats.total_donors}</strong>
            </li>

            <li>
              🏥 Patients:
              <strong> {stats.total_patients}</strong>
            </li>

            <li>
              📄 Total Requests:
              <strong> {requests.length}</strong>
            </li>

          </ul>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="font-bold text-xl mb-4">
            🚨 Emergency Status
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Completed Requests</span>

              <span className="font-bold text-green-600">
                {completed}
              </span>

            </div>

            <div className="flex justify-between">

              <span>Pending Requests</span>

              <span className="font-bold text-red-600">
                {pending}
              </span>

            </div>

            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">

              <p className="text-red-700 font-semibold">
                Keep monitoring pending requests to
                improve emergency response time.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">

      <div>

        <p className="text-gray-500">
          {title}
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {value}
        </h2>

      </div>

      <div
        className={`${color} text-white text-3xl w-16 h-16 rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>

    </div>
  );
}

export default Reports;