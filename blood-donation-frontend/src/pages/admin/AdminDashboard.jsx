import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users, UserPlus, Droplets, Hospital, Activity,
  CheckCircle, Clock, AlertCircle, TrendingUp,
  Calendar, Bell, Shield, Settings, LogOut,
  BarChart3, PieChart, Database, Server,
  UserCog, Heart, MapPin, Phone, Mail,
  ChevronRight, Plus, Search, Filter,
  Download, RefreshCw, Eye, Edit, Trash2,
  User, Printer, FileText, FileDown
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const dashboardRef = useRef(null);
  const [stats, setStats] = useState({
    total_users: 0,
    total_donors: 0,
    total_patients: 0,
  });

  const [requests, setRequests] = useState([]);
  const [availableDonors, setAvailableDonors] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Load statistics
      const statsResponse = await fetch(
        "http://127.0.0.1:5000/api/auth/stats",
        { headers }
      );

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Load blood requests
      const requestsResponse = await fetch(
        "http://127.0.0.1:5000/api/blood-requests/",
        { headers }
      );

      if (requestsResponse.ok) {
        const requestsData = await requestsResponse.json();
        setRequests(Array.isArray(requestsData) ? requestsData : []);
      } else {
        setRequests([]);
      }

      // Load donors
      const donorsResponse = await fetch(
        "http://127.0.0.1:5000/api/auth/donors",
        { headers }
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

      // Simulate recent activity
      const activities = [
        { id: 1, user: "John Doe", action: "registered as donor", time: "5 min ago", type: "donor" },
        { id: 2, user: "Jane Smith", action: "requested blood (O+)", time: "15 min ago", type: "request" },
        { id: 3, user: "Mike Johnson", action: "completed donation", time: "1 hour ago", type: "donation" },
        { id: 4, user: "Sarah Williams", action: "updated profile", time: "2 hours ago", type: "profile" },
      ];
      setRecentActivity(activities);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const safeRequests = Array.isArray(requests) ? requests : [];

  const completedRequests = safeRequests.filter(
    (req) => req.status === "Completed"
  ).length;

  const pendingRequests = safeRequests.filter(
    (req) => req.status === "Pending"
  ).length;

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // PDF export functionality
  const handleExportPDF = () => {
    window.print();
  };

  // Export as CSV
  const handleExportCSV = () => {
    const headers = ["Metric", "Value"];
    const data = [
      ["Total Users", stats.total_users],
      ["Total Donors", stats.total_donors],
      ["Total Patients", stats.total_patients],
      ["Available Donors", availableDonors],
      ["Blood Requests", safeRequests.length],
      ["Pending Requests", pendingRequests],
      ["Completed Requests", completedRequests],
    ];

    let csvContent = headers.join(",") + "\n";
    data.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lifelink_dashboard_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const statCards = [
    { icon: <Users className="size-6" />, label: "Total Users", value: stats.total_users, color: "blue", border: "border-blue-600" },
    { icon: <Droplets className="size-6" />, label: "Total Donors", value: stats.total_donors, color: "red", border: "border-red-600" },
    { icon: <UserCog className="size-6" />, label: "Total Patients", value: stats.total_patients, color: "purple", border: "border-purple-600" },
    { icon: <Activity className="size-6" />, label: "Available Donors", value: availableDonors, color: "green", border: "border-green-600" },
    { icon: <Droplets className="size-6" />, label: "Blood Requests", value: safeRequests.length, color: "orange", border: "border-orange-600" },
    { icon: <Clock className="size-6" />, label: "Pending Requests", value: pendingRequests, color: "yellow", border: "border-yellow-500" },
    { icon: <CheckCircle className="size-6" />, label: "Completed Requests", value: completedRequests, color: "emerald", border: "border-emerald-600" },
  ];

  return (
    <div ref={dashboardRef} className="min-h-screen bg-slate-50">
      {/* Print Styles - Hide sidebar and URL info */}
      <style>{`
        @media print {
          /* Hide sidebar if present */
          aside, nav, .sidebar, .side-nav, [class*="sidebar"], [class*="side-bar"] {
            display: none !important;
          }
          
          /* Hide header/navigation */
          header:not(.print-header), .navbar, .top-nav, [class*="navbar"], [class*="top-nav"] {
            display: none !important;
          }
          
          /* Hide URL and browser info */
          @page {
            margin: 1.5cm;
          }
          
          /* Hide footer with URL info */
          .no-print, .print-hide {
            display: none !important;
          }
          
          /* Show only the main content */
          main, .main-content, .dashboard-content {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Ensure content fills the page */
          body, .min-h-screen {
            background: white !important;
          }
          
          /* Print-specific header */
          .print-header {
            display: block !important;
          }
          
          /* Card styles for print */
          .print-card {
            break-inside: avoid;
            border: 1px solid #e5e7eb !important;
            box-shadow: none !important;
          }
          
          /* Stats grid for print */
          .print-grid-4 {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 1rem !important;
          }
          
          .print-grid-3 {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1rem !important;
          }
          
          .print-grid-2 {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
        }
        
        @media screen {
          .print-header {
            display: none !important;
          }
          .print-only {
            display: none !important;
          }
        }
      `}</style>

      {/* Hidden print header - only shows when printing */}
      <div className="print-header hidden print:block print:mb-6">
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl bg-red-600 text-white flex items-center justify-center">
              <Heart className="size-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LifeLink</h1>
              <p className="text-sm text-gray-600">Admin Dashboard</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>Generated: {new Date().toLocaleDateString()}</p>
            <p>{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Header - Hidden when printing */}
      <header className="bg-white border-b border-border sticky top-0 z-30 print:!hidden">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="size-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
                <Heart className="size-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">LifeLink</h1>
                <p className="text-[10px] text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Export Dropdown */}
            <div className="relative group">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition">
                <FileDown className="size-3.5" />
                Export
                <ChevronRight className="size-3.5 rotate-90" />
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg border border-border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-slate-50 transition rounded-t-lg"
                >
                  <FileText className="size-4" />
                  Export as PDF
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-slate-50 transition rounded-b-lg"
                >
                  <Download className="size-4" />
                  Export as CSV
                </button>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
            >
              <Printer className="size-3.5" />
              Print
            </button>

            <button
              onClick={fetchData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
            >
              <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="size-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 print:px-4 print:py-4">
        {/* Welcome Section */}
        <div className="mb-8 print:mb-4">
          <div className="flex items-center justify-between print:block">
            <div>
              <h1 className="text-2xl font-bold text-foreground print:text-xl">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-0.5 print:text-gray-600 print:text-xs print:hidden">
                Welcome back, Administrator • Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
              <p className="hidden print:block text-xs text-gray-500">
                Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-3 print:hidden">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                <span className="size-1.5 rounded-full bg-green-600 animate-pulse" />
                System Active
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 print:grid-cols-4 print:gap-3 print:mb-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition p-5 border-l-4 print:shadow-none print:p-3 print:border-l-4 print:border print:break-inside-avoid"
              style={{ borderLeftColor: `var(--${stat.color}-500)` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground print:text-gray-600 print:text-[10px]">{stat.label}</p>
                  <h2 className="text-2xl font-bold text-foreground mt-1 print:text-xl">{stat.value}</h2>
                </div>
                <div className={`size-10 rounded-lg bg-${stat.color}-100 text-${stat.color}-600 flex items-center justify-center print:hidden`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6 print:grid-cols-3 print:gap-4">
          {/* Left Column - Blood Requests */}
          <div className="lg:col-span-2 print:col-span-2">
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden print:shadow-none print:border print:break-inside-avoid">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between print:px-4 print:py-2">
                <div className="flex items-center gap-2">
                  <Droplets className="size-5 text-red-600 print:text-gray-600" />
                  <h2 className="text-base font-semibold text-foreground print:text-sm">Recent Blood Requests</h2>
                </div>
                <Link
                  to="/admin/requests"
                  className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 print:hidden"
                >
                  View All
                  <ChevronRight className="size-3.5" />
                </Link>
                <span className="hidden print:block text-xs text-gray-500">{safeRequests.length} total</span>
              </div>
              <div className="p-4 print:p-3">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Activity className="size-6 text-muted-foreground animate-spin" />
                  </div>
                ) : safeRequests.length > 0 ? (
                  <div className="space-y-3 print:space-y-2">
                    {safeRequests.slice(0, 5).map((req, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition print:bg-white print:p-2 print:border print:border-gray-100 print:rounded">
                        <div className="flex items-center gap-3">
                          <div className={`size-3 rounded-full ${
                            req.status === "Completed" ? "bg-green-600" :
                            req.status === "Pending" ? "bg-yellow-500" :
                            "bg-red-600"
                          } print:hidden`} />
                          <div className="print:flex print:gap-2">
                            <p className="text-sm font-medium text-foreground print:text-xs">{req.patient_name || "Patient"}</p>
                            <p className="text-xs text-muted-foreground print:text-gray-600 print:text-[10px]">
                              Blood Group: {req.blood_group || "N/A"} • {req.location || "Unknown"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            req.status === "Completed" ? "bg-green-100 text-green-700 print:bg-gray-100 print:text-gray-700" :
                            req.status === "Pending" ? "bg-yellow-100 text-yellow-700 print:bg-gray-100 print:text-gray-700" :
                            "bg-red-100 text-red-700 print:bg-gray-100 print:text-gray-700"
                          }`}>
                            {req.status || "Pending"}
                          </span>
                          <button className="p-1 text-muted-foreground hover:text-foreground transition print:hidden">
                            <Eye className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Droplets className="size-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-sm text-muted-foreground">No blood requests yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden mt-6 print:shadow-none print:border print:mt-4 print:break-inside-avoid">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between print:px-4 print:py-2">
                <div className="flex items-center gap-2">
                  <Bell className="size-5 text-muted-foreground print:text-gray-600" />
                  <h2 className="text-base font-semibold text-foreground print:text-sm">Recent Activity</h2>
                </div>
                <span className="hidden print:block text-xs text-gray-500">Last 24 hours</span>
              </div>
              <div className="p-4 print:p-3">
                {recentActivity.length > 0 ? (
                  <div className="space-y-3 print:space-y-2">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 text-sm print:gap-2 print:border-b print:border-gray-100 print:pb-2 last:print:border-0">
                        <div className={`size-8 rounded-full flex items-center justify-center ${
                          activity.type === "donor" ? "bg-red-100 text-red-600" :
                          activity.type === "request" ? "bg-orange-100 text-orange-600" :
                          activity.type === "donation" ? "bg-green-100 text-green-600" :
                          "bg-blue-100 text-blue-600"
                        } print:hidden`}>
                          {activity.type === "donor" ? <Heart className="size-3.5" /> :
                           activity.type === "request" ? <Droplets className="size-3.5" /> :
                           activity.type === "donation" ? <CheckCircle className="size-3.5" /> :
                           <User className="size-3.5" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground print:text-xs">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground print:text-gray-600 print:text-[10px]">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - System Status & Quick Actions */}
          <div className="space-y-6 print:space-y-4">
            {/* System Status */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden print:shadow-none print:border print:break-inside-avoid">
              <div className="px-6 py-4 border-b border-border print:px-4 print:py-2">
                <div className="flex items-center gap-2">
                  <Server className="size-5 text-muted-foreground print:text-gray-600" />
                  <h2 className="text-base font-semibold text-foreground print:text-sm">System Status</h2>
                </div>
              </div>
              <div className="p-4 space-y-3 print:p-3 print:space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground print:text-gray-600 print:text-xs">API Server</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 print:text-gray-700">
                    <span className="size-1.5 rounded-full bg-green-600 print:hidden" />
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground print:text-gray-600 print:text-xs">Database</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 print:text-gray-700">
                    <span className="size-1.5 rounded-full bg-green-600 print:hidden" />
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground print:text-gray-600 print:text-xs">Frontend</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 print:text-gray-700">
                    <span className="size-1.5 rounded-full bg-green-600 print:hidden" />
                    Running
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3 print:pt-2">
                  <span className="text-sm text-muted-foreground print:text-gray-600 print:text-xs">Total Users</span>
                  <span className="text-sm font-medium text-foreground print:text-xs">{stats.total_users}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions - Hidden when printing */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden print:hidden">
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Shield className="size-5 text-muted-foreground" />
                  <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <Link
                  to="/admin/users"
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-slate-50 transition text-sm text-foreground"
                >
                  <Users className="size-4 text-muted-foreground" />
                  Manage Users
                  <ChevronRight className="size-3.5 ml-auto text-muted-foreground" />
                </Link>
                <Link
                  to="/admin/requests"
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-slate-50 transition text-sm text-foreground"
                >
                  <Droplets className="size-4 text-muted-foreground" />
                  View Blood Requests
                  <ChevronRight className="size-3.5 ml-auto text-muted-foreground" />
                </Link>
                <Link
                  to="/admin/donors"
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-slate-50 transition text-sm text-foreground"
                >
                  <Heart className="size-4 text-muted-foreground" />
                  View Donors
                  <ChevronRight className="size-3.5 ml-auto text-muted-foreground" />
                </Link>
                <Link
                  to="/admin/hospitals"
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-slate-50 transition text-sm text-foreground"
                >
                  <Hospital className="size-4 text-muted-foreground" />
                  Manage Hospitals
                  <ChevronRight className="size-3.5 ml-auto text-muted-foreground" />
                </Link>
                <Link
                  to="/admin/settings"
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-slate-50 transition text-sm text-foreground"
                >
                  <Settings className="size-4 text-muted-foreground" />
                  System Settings
                  <ChevronRight className="size-3.5 ml-auto text-muted-foreground" />
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-5 text-white print:bg-red-600 print:p-3 print:break-inside-avoid">
              <div className="flex items-center gap-2 mb-3 print:mb-2">
                <TrendingUp className="size-5 print:size-4" />
                <h3 className="text-sm font-semibold print:text-xs">Donation Impact</h3>
              </div>
              <p className="text-2xl font-bold print:text-xl">{completedRequests}</p>
              <p className="text-xs text-red-100/80 print:text-gray-200">Lives saved through donations</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-red-100/80 print:text-gray-200">
                <Heart className="size-3.5" />
                Every donation saves up to 3 lives
              </div>
            </div>
          </div>
        </div>

        {/* Print Footer */}
        <div className="hidden print:block text-center text-xs text-gray-500 mt-8 border-t border-gray-200 pt-4">
          <p>LifeLink Admin Dashboard - Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
          <p>© {new Date().getFullYear()} LifeLink. All rights reserved.</p>
          <p className="mt-1">This report is confidential and intended for authorized personnel only.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;