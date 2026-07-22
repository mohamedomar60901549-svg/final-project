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
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import {
  Download, Printer, RefreshCw, FileText,
  FileSpreadsheet, TrendingUp, Users,
  Droplets, Heart, CheckCircle, Clock,
  AlertCircle, Calendar, Activity, UserCog,
  BarChart3, PieChart as PieChartIcon,
  Shield, Award, Sparkles, Database
} from "lucide-react";
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
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // System Stats
      const statsRes = await fetch(
        "http://127.0.0.1:5000/api/auth/stats",
        { headers }
      );
      const statsData = await statsRes.json();
      setStats(statsData);

      // Blood Requests
      const requestRes = await fetch(
        "http://127.0.0.1:5000/api/blood-requests/",
        { headers }
      );
      const requestData = await requestRes.json();
      setRequests(Array.isArray(requestData) ? requestData : []);

      // Users
      const usersRes = await fetch(
        "http://127.0.0.1:5000/api/auth/users",
        { headers }
      );
      const usersData = await usersRes.json();
      setUsers(Array.isArray(usersData) ? usersData : []);

      // Donors
      const donorRes = await fetch(
        "http://127.0.0.1:5000/api/auth/donors",
        { headers }
      );
      const donorData = await donorRes.json();
      const donorList = Array.isArray(donorData) ? donorData : [];
      setAvailableDonors(
        donorList.filter(
          (donor) =>
            donor.availability &&
            donor.availability.toLowerCase() === "available"
        ).length
      );

      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const safeRequests = Array.isArray(requests) ? requests : [];
  const safeUsers = Array.isArray(users) ? users : [];

  const completed = safeRequests.filter((req) => req.status === "Completed").length;
  const pending = safeRequests.filter((req) => req.status === "Pending").length;
  const approved = safeRequests.filter((req) => req.status === "Approved").length;

  const userChart = [
    { name: "Donors", value: stats.total_donors || 0 },
    { name: "Patients", value: stats.total_patients || 0 },
    { name: "Admins", value: Math.max(0, (stats.total_users || 0) - (stats.total_donors || 0) - (stats.total_patients || 0)) },
  ];

  const requestChart = [
    { name: "Completed", value: completed },
    { name: "Approved", value: approved },
    { name: "Pending", value: pending },
  ];

  const groups = {};
  safeUsers.forEach((user) => {
    if (user.blood_group) {
      groups[user.blood_group] = (groups[user.blood_group] || 0) + 1;
    }
  });

  const bloodChart = Object.keys(groups).map((group) => ({
    name: group,
    value: groups[group],
  }));

  // Donation trend data (simulated)
  const trendData = [
    { month: "Jan", donations: 12 },
    { month: "Feb", donations: 19 },
    { month: "Mar", donations: 15 },
    { month: "Apr", donations: 22 },
    { month: "May", donations: 28 },
    { month: "Jun", donations: 25 },
  ];

  const COLORS = ["#dc2626", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

  // ==========================================
  // EXPORT PDF REPORT
  // ==========================================
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(220, 38, 38);
    doc.text("LifeLink Blood Donation System", 14, 18);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("System Report", 14, 28);

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 38);

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
        ["Approved Requests", approved],
      ],
      headStyles: { fillColor: [220, 38, 38] },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [["ID", "Name", "Email", "Blood Group", "Location", "Role", "Availability"]],
      body: safeUsers.map((user) => [
        user.id,
        user.full_name,
        user.email,
        user.blood_group || "-",
        user.location || "-",
        user.role || "-",
        user.availability || "-",
      ]),
      headStyles: { fillColor: [220, 38, 38] },
    });

    doc.save("LifeLink_Report.pdf");
  };

  // ==========================================
  // EXPORT EXCEL REPORT
  // ==========================================
  const exportExcel = () => {
    const workbook = XLSX.utils.book_new();

    const summary = [
      { Statistic: "Total Users", Value: stats.total_users },
      { Statistic: "Total Donors", Value: stats.total_donors },
      { Statistic: "Available Donors", Value: availableDonors },
      { Statistic: "Total Patients", Value: stats.total_patients },
      { Statistic: "Blood Requests", Value: safeRequests.length },
      { Statistic: "Completed Requests", Value: completed },
      { Statistic: "Pending Requests", Value: pending },
      { Statistic: "Approved Requests", Value: approved },
      { Statistic: "Generated", Value: new Date().toLocaleString() },
    ];

    const summarySheet = XLSX.utils.json_to_sheet(summary);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    const usersSheet = XLSX.utils.json_to_sheet(safeUsers);
    XLSX.utils.book_append_sheet(workbook, usersSheet, "Users");

    const requestsSheet = XLSX.utils.json_to_sheet(safeRequests);
    XLSX.utils.book_append_sheet(workbook, requestsSheet, "Blood Requests");

    XLSX.writeFile(workbook, "LifeLink_Report.xlsx");
  };

  // ==========================================
  // PRINT
  // ==========================================
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <BarChart3 className="size-7 text-red-600" />
                System Reports
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Monitor LifeLink Blood Donation System Performance
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={loadData}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
              >
                <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={exportPDF}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition shadow-sm hover:shadow-red-600/20"
              >
                <FileText className="size-3.5" />
                Export PDF
              </button>
              <button
                onClick={exportExcel}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition shadow-sm hover:shadow-green-600/20"
              >
                <FileSpreadsheet className="size-3.5" />
                Export Excel
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
              >
                <Printer className="size-3.5" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-right text-xs text-muted-foreground mb-6">
          Last Updated: {lastUpdated}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl border border-border shadow-sm p-12 text-center">
            <RefreshCw className="size-8 text-muted-foreground animate-spin mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Loading reports...</p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <Users className="size-5" />, label: "Total Users", value: stats.total_users || 0, color: "blue" },
                { icon: <Droplets className="size-5" />, label: "Total Donors", value: stats.total_donors || 0, color: "red" },
                { icon: <Heart className="size-5" />, label: "Available Donors", value: availableDonors || 0, color: "green" },
                { icon: <UserCog className="size-5" />, label: "Total Patients", value: stats.total_patients || 0, color: "purple" },
                { icon: <FileText className="size-5" />, label: "Blood Requests", value: safeRequests.length || 0, color: "orange" },
                { icon: <CheckCircle className="size-5" />, label: "Completed", value: completed || 0, color: "emerald" },
                { icon: <Clock className="size-5" />, label: "Approved", value: approved || 0, color: "blue" },
                { icon: <AlertCircle className="size-5" />, label: "Pending", value: pending || 0, color: "yellow" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-border shadow-sm p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <div className={`size-10 rounded-lg bg-${stat.color}-100 text-${stat.color}-600 flex items-center justify-center`}>
                      {stat.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* User Distribution - Pie Chart */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <PieChartIcon className="size-5 text-red-600" />
                  <h2 className="text-lg font-semibold text-foreground">User Distribution</h2>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userChart}
                      dataKey="value"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {userChart.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Blood Request Status - Bar Chart */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Activity className="size-5 text-red-600" />
                  <h2 className="text-lg font-semibold text-foreground">Blood Request Status</h2>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={requestChart}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Blood Group Distribution */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Droplets className="size-5 text-red-600" />
                  <h2 className="text-lg font-semibold text-foreground">Blood Group Distribution</h2>
                </div>
                {bloodChart.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={bloodChart}>
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#dc2626" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    <p>No blood group data available</p>
                  </div>
                )}
              </div>

              {/* Donation Trends */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="size-5 text-red-600" />
                  <h2 className="text-lg font-semibold text-foreground">Donation Trends</h2>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="donations" stroke="#dc2626" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity Summary */}
            <div className="bg-white rounded-xl border border-border shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <Calendar className="size-5 text-red-600" />
                <h2 className="text-lg font-semibold text-foreground">Recent Activity Summary</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{safeRequests.length}</p>
                  <p className="text-sm text-muted-foreground">Total Blood Requests</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{completed}</p>
                  <p className="text-sm text-muted-foreground">Completed Donations</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{safeUsers.length}</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 bg-white rounded-xl border border-border shadow-sm p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Heart className="size-4 text-red-600" />
                <p className="text-sm">LifeLink Blood Donation Management System</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Report generated on {lastUpdated}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                © {new Date().getFullYear()} LifeLink. All rights reserved.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Reports;