import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Users, MapPin, Droplet, Heart,
  CheckCircle, XCircle, RefreshCw, Filter,
  Download, Printer, Eye, User, Phone,
  Mail, Activity, Award, Shield, Clock,
  ChevronDown, ArrowLeft, ArrowRight, FileText,
  AlertCircle, UserPlus, Hospital, Info
} from "lucide-react";

function FindDonors() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [view, setView] = useState("table");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view donors.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/api/auth/donors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please log in again.");
        } else if (response.status === 403) {
          setError("You don't have permission to view donors. Please contact support.");
        } else {
          setError(data.message || "Failed to load donors.");
        }
        setDonors([]);
        return;
      }

      if (Array.isArray(data)) {
        setDonors(data);
      } else {
        setDonors([]);
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Unable to connect to the server. Please try again.");
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonors = donors.filter((donor) => {
    const blood = donor.blood_group || "";
    const location = donor.location || "";
    const name = donor.full_name || "";
    const status = donor.availability || "";

    const matchesSearch =
      blood.toLowerCase().includes(search.toLowerCase()) ||
      location.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "available" && status.toLowerCase() === "available") ||
      (filterStatus === "unavailable" && status.toLowerCase() !== "available");

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDonors = filteredDonors.slice(startIndex, startIndex + itemsPerPage);

  const availableCount = donors.filter(d => d.availability?.toLowerCase() === "available").length;
  const unavailableCount = donors.filter(d => d.availability?.toLowerCase() !== "available").length;

  const getAvailabilityBadge = (availability) => {
    const isAvailable = availability?.toLowerCase() === "available";
    return {
      bg: isAvailable ? "bg-green-100" : "bg-red-100",
      text: isAvailable ? "text-green-700" : "text-red-700",
      border: isAvailable ? "border-green-200" : "border-red-200",
      icon: isAvailable ? <CheckCircle className="size-3.5" /> : <XCircle className="size-3.5" />,
      label: isAvailable ? "Available" : "Unavailable",
      dot: isAvailable ? "bg-green-600" : "bg-red-600"
    };
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Blood Group", "Location", "Availability"];
    const data = filteredDonors.map(donor => [
      donor.id,
      donor.full_name || "-",
      donor.email || "-",
      donor.phone || "-",
      donor.blood_group || "-",
      donor.location || "-",
      donor.availability || "Available"
    ]);

    let csvContent = headers.join(",") + "\n";
    data.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donors_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin text-red-600 mx-auto" size={40} />
          <p className="text-sm text-muted-foreground mt-4">Loading donors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                <Users className="size-6 md:size-7 text-red-600" />
                Find Donors
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                {user?.full_name ? `Welcome back, ${user.full_name}` : 'Find compatible blood donors'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1.5 md:py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
              >
                <Download className="size-3 md:size-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1.5 md:py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
              >
                <Printer className="size-3 md:size-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={fetchDonors}
                className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1.5 md:py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
              >
                <RefreshCw className={`size-3 md:size-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 md:p-6 mb-6 md:mb-8 text-white"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="size-12 md:size-16 rounded-full bg-white/20 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
                  {user.full_name?.charAt(0) || "P"}
                </div>
                <div>
                  <h2 className="text-lg md:text-2xl font-bold">{user.full_name}</h2>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1">
                    <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 rounded-full bg-white/20 text-white text-xs md:text-sm">
                      <Droplet className="size-3 md:size-3.5" />
                      {user.blood_group || "N/A"}
                    </span>
                    <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 rounded-full bg-white/20 text-white text-xs md:text-sm">
                      <User className="size-3 md:size-3.5" />
                      {user.role || "Patient"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="text-center">
                  <p className="text-xl md:text-3xl font-bold">{donors.length}</p>
                  <p className="text-[10px] md:text-xs text-blue-100/80">Total Donors</p>
                </div>
                <div className="w-px h-8 md:h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-xl md:text-3xl font-bold text-green-300">{availableCount}</p>
                  <p className="text-[10px] md:text-xs text-blue-100/80">Available</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 md:p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="size-4 md:size-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-700 text-sm md:text-base">Error</h3>
                <p className="text-xs md:text-sm text-red-600 mt-0.5">{error}</p>
                {error.includes("permission") && (
                  <button
                    onClick={() => window.location.href = "/login"}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-red-700 hover:underline"
                  >
                    Go to Login <ArrowRight className="size-3 md:size-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          {[
            { icon: <Users className="size-4" />, label: "Total Donors", value: donors.length, color: "blue" },
            { icon: <CheckCircle className="size-4" />, label: "Available", value: availableCount, color: "green" },
            { icon: <XCircle className="size-4" />, label: "Unavailable", value: unavailableCount, color: "red" },
            { icon: <Heart className="size-4" />, label: "Blood Groups", value: new Set(donors.map(d => d.blood_group)).size, color: "purple" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-white rounded-xl border border-border shadow-sm p-3 md:p-4 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] md:text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground mt-0.5 md:mt-1">{stat.value}</p>
                </div>
                <div className={`size-8 md:size-10 rounded-lg bg-${stat.color}-100 text-${stat.color}-600 flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Card - Blood Group Matching */}
        {user?.blood_group && (
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 md:p-4 mb-4 md:mb-6">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-blue-100 p-1.5 md:p-2 text-blue-600">
                <Info className="size-4 md:size-5" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-semibold text-blue-800">Your Blood Group: {user.blood_group}</h4>
                <p className="text-xs md:text-sm text-blue-600 mt-0.5">
                  {donors.filter(d => d.blood_group === user.blood_group && d.availability?.toLowerCase() === "available").length} donors with matching blood group are available.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 md:size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, blood group or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 md:pl-9 pr-3 md:pr-4 py-1.5 md:py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
              />
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative flex-1 sm:flex-none">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 md:size-4 text-muted-foreground" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full sm:w-auto pl-8 md:pl-9 pr-6 md:pr-8 py-1.5 md:py-2 rounded-lg border border-border bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                >
                  <option value="all">All Donors</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
                <ChevronDown className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 size-3.5 md:size-4 text-muted-foreground pointer-events-none" />
              </div>
              <div className="flex rounded-lg border border-border overflow-hidden flex-shrink-0">
                <button
                  onClick={() => setView("table")}
                  className={`px-2.5 md:px-3 py-1.5 md:py-2 transition ${
                    view === "table"
                      ? "bg-red-600 text-white"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FileText className="size-3.5 md:size-4" />
                </button>
                <button
                  onClick={() => setView("card")}
                  className={`px-2.5 md:px-3 py-1.5 md:py-2 transition ${
                    view === "card"
                      ? "bg-red-600 text-white"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Activity className="size-3.5 md:size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table View */}
        {view === "table" ? (
          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-border">
                  <tr>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">Blood Group</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedDonors.length > 0 ? (
                    paginatedDonors.map((donor, index) => {
                      const status = getAvailabilityBadge(donor.availability);
                      return (
                        <motion.tr
                          key={donor.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.03 }}
                          className="hover:bg-slate-50 transition"
                        >
                          <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-muted-foreground">#{donor.id}</td>
                          <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-foreground">{donor.full_name || "-"}</td>
                          <td className="px-3 md:px-4 py-2 md:py-3">
                            <span className="inline-block px-2 md:px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[10px] md:text-xs">
                              {donor.blood_group || "-"}
                            </span>
                          </td>
                          <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-muted-foreground">{donor.location || "-"}</td>
                          <td className="px-3 md:px-4 py-2 md:py-3">
                            <span className={`inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}>
                              <span className={`size-1 md:size-1.5 rounded-full ${status.dot}`} />
                              {status.label}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 md:py-12 text-center text-xs md:text-sm text-muted-foreground">
                        <Users className="size-10 md:size-12 mx-auto mb-2 md:mb-3 text-muted-foreground opacity-50" />
                        No donors found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Card View */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {paginatedDonors.length > 0 ? (
              paginatedDonors.map((donor, index) => {
                const status = getAvailabilityBadge(donor.availability);
                return (
                  <motion.div
                    key={donor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl border border-border shadow-sm p-4 md:p-6 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="size-8 md:size-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                          <User className="size-4 md:size-5" />
                        </div>
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-foreground">{donor.full_name || "Donor"}</h3>
                          <span className={`inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}>
                            <span className={`size-1 md:size-1.5 rounded-full ${status.dot}`} />
                            {status.label}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs md:text-sm font-medium text-muted-foreground">#{donor.id}</span>
                    </div>

                    <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Droplet className="size-3 md:size-3.5 text-red-600" />
                        <span className="font-bold text-red-600">{donor.blood_group || "-"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="size-3 md:size-3.5" />
                        {donor.location || "-"}
                      </div>
                      {donor.email && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="size-3 md:size-3.5" />
                          {donor.email}
                        </div>
                      )}
                      {donor.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="size-3 md:size-3.5" />
                          {donor.phone}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full bg-white rounded-xl border border-border shadow-sm p-8 md:p-12 text-center">
                <Users className="size-10 md:size-12 mx-auto mb-2 md:mb-3 text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground">No donors found matching your criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredDonors.length > itemsPerPage && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 mt-4 md:mt-6">
            <p className="text-xs md:text-sm text-muted-foreground order-2 sm:order-1">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDonors.length)} of {filteredDonors.length} donors
            </p>
            <div className="flex items-center gap-1.5 md:gap-2 order-1 sm:order-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 md:p-2 rounded-lg border border-border hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ArrowLeft className="size-3.5 md:size-4" />
              </button>
              <span className="text-xs md:text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 md:p-2 rounded-lg border border-border hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ArrowRight className="size-3.5 md:size-4" />
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 md:mt-8 bg-white rounded-xl border border-border shadow-sm p-4 md:p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Heart className="size-3.5 md:size-4 text-red-600" />
            <p className="text-xs md:text-sm">LifeLink Blood Donation System</p>
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-1.5 md:mt-2">
            © {new Date().getFullYear()} LifeLink. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FindDonors;