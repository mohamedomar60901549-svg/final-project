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

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";

function Reports() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_donors: 0,
    total_patients: 0,
  });

  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [availableDonors, setAvailableDonors] = useState(0);

  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleString()
  );

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const loadData = async () => {
    try {
      // ===========================
      // SYSTEM STATS
      // ===========================

      const statsRes = await fetch(
        "http://127.0.0.1:5000/api/auth/stats",
        { headers }
      );

      const statsData = await statsRes.json();

      setStats(statsData);

      // ===========================
      // BLOOD REQUESTS
      // ===========================

      const requestRes = await fetch(
        "http://127.0.0.1:5000/api/blood-requests/",
        { headers }
      );

      const requestData = await requestRes.json();

      setRequests(
        Array.isArray(requestData)
          ? requestData
          : []
      );

      // ===========================
      // USERS
      // ===========================

      const usersRes = await fetch(
        "http://127.0.0.1:5000/api/auth/users",
        { headers }
      );

      const usersData = await usersRes.json();

      setUsers(
        Array.isArray(usersData)
          ? usersData
          : []
      );

      // ===========================
      // DONORS
      // ===========================

      const donorRes = await fetch(
        "http://127.0.0.1:5000/api/auth/donors",
        { headers }
      );

      const donorData = await donorRes.json();

      const donorList = Array.isArray(donorData)
        ? donorData
        : [];

      setAvailableDonors(
        donorList.filter(
          (donor) =>
            donor.availability &&
            donor.availability.toLowerCase() ===
              "available"
        ).length
      );

      setLastUpdated(
        new Date().toLocaleString()
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const safeRequests = Array.isArray(requests)
    ? requests
    : [];

  const safeUsers = Array.isArray(users)
    ? users
    : [];

  const completed = safeRequests.filter(
    (req) => req.status === "Completed"
  ).length;

  const pending = safeRequests.filter(
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

  safeUsers.forEach((user) => {
    if (user.blood_group) {
      groups[user.blood_group] =
        (groups[user.blood_group] || 0) + 1;
    }
  });

  const bloodChart = Object.keys(groups).map(
    (group) => ({
      name: group,
      value: groups[group],
    })
  );

  const COLORS = [
    "#ef4444",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
  ];

    // ==========================================
  // EXPORT PDF REPORT
  // ==========================================

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("LifeLink Blood Donation System", 14, 18);

    doc.setFontSize(15);
    doc.text("System Report", 14, 28);

    doc.setFontSize(11);

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      14,
      38
    );

    autoTable(doc, {
      startY: 48,
      head: [["Statistic", "Value"]],
      body: [
        ["Total Users", stats.total_users],
        ["Total Donors", stats.total_donors],
        ["Available Donors", availableDonors],
        ["Total Patients", stats.total_patients],
        ["Blood Requests", safeRequests.length],
        ["Completed Requests", completed],
        ["Pending Requests", pending],
      ],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [
        [
          "ID",
          "Name",
          "Email",
          "Blood Group",
          "Location",
          "Availability",
        ],
      ],
      body: safeUsers.map((user) => [
        user.id,
        user.full_name,
        user.email,
        user.blood_group || "-",
        user.location || "-",
        user.availability || "-",
      ]),
    });

    doc.save("LifeLink_Report.pdf");
  };

  // ==========================================
  // EXPORT EXCEL REPORT
  // ==========================================

  const exportExcel = () => {
    const workbook = XLSX.utils.book_new();

    // ========================
    // SUMMARY SHEET
    // ========================

    const summary = [
      {
        Statistic: "Total Users",
        Value: stats.total_users,
      },
      {
        Statistic: "Total Donors",
        Value: stats.total_donors,
      },
      {
        Statistic: "Available Donors",
        Value: availableDonors,
      },
      {
        Statistic: "Total Patients",
        Value: stats.total_patients,
      },
      {
        Statistic: "Blood Requests",
        Value: safeRequests.length,
      },
      {
        Statistic: "Completed Requests",
        Value: completed,
      },
      {
        Statistic: "Pending Requests",
        Value: pending,
      },
      {
        Statistic: "Generated",
        Value: new Date().toLocaleString(),
      },
    ];

    const summarySheet =
      XLSX.utils.json_to_sheet(summary);

    XLSX.utils.book_append_sheet(
      workbook,
      summarySheet,
      "Summary"
    );

    // ========================
    // USERS SHEET
    // ========================

    const usersSheet =
      XLSX.utils.json_to_sheet(safeUsers);

    XLSX.utils.book_append_sheet(
      workbook,
      usersSheet,
      "Users"
    );

    // ========================
    // REQUESTS SHEET
    // ========================

    const requestsSheet =
      XLSX.utils.json_to_sheet(safeRequests);

    XLSX.utils.book_append_sheet(
      workbook,
      requestsSheet,
      "Blood Requests"
    );

    XLSX.writeFile(
      workbook,
      "LifeLink_Report.xlsx"
    );
  };

    return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}

      <div className="bg-gradient-to-r from-red-700 to-red-500 text-white rounded-xl p-8 shadow-lg">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              📊 System Reports
            </h1>

            <p className="mt-2 text-red-100">
              Monitor LifeLink Blood Donation System Performance
            </p>

            <p className="mt-2 text-sm">
              Last Updated: {lastUpdated}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={loadData}
              className="bg-white text-red-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              🔄 Refresh
            </button>

            <button
              onClick={exportPDF}
              className="bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700"
            >
              📄 Export PDF
            </button>

            <button
              onClick={exportExcel}
              className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              📊 Export Excel
            </button>

          </div>

        </div>

      </div>

      {/* ================= SUMMARY CARDS ================= */}

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
          value={safeRequests.length}
          icon="📄"
          color="bg-purple-500"
        />

        <StatCard
          title="Completed Requests"
          value={completed}
          icon="✅"
          color="bg-emerald-500"
        />

        <StatCard
          title="Pending Requests"
          value={pending}
          icon="⏳"
          color="bg-yellow-500"
        />

      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-5">
            User Distribution
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>

              <Pie
                data={userChart}
                dataKey="value"
                outerRadius={110}
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

          <h2 className="text-xl font-bold mb-5">
            Blood Request Status
          </h2>

          <ResponsiveContainer width="100%" height={320}>

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

      {/* ================= BLOOD GROUP CHART ================= */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-5">
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
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

            {/* ================= FOOTER ================= */}

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <p className="text-gray-600">
          🩸 LifeLink Blood Donation Management System
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Report generated on {lastUpdated}
        </p>
      </div>

    </div>
  );
}

/* ===========================================================
   STAT CARD COMPONENT
=========================================================== */

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition duration-300">

      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div
        className={`${color} w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl shadow`}
      >
        {icon}
      </div>

    </div>
  );
}

export default Reports;