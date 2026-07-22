import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Droplet, User, Hospital, MapPin, Calendar,
  CheckCircle, Clock, AlertCircle, RefreshCw,
  FileText, Search, Filter, ChevronDown,
  ArrowLeft, ArrowRight, Activity, Heart,
  Download, Printer, Eye, Edit, Trash2
} from "lucide-react";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [view, setView] = useState("table");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in first.");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:5000/api/blood-requests/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok && Array.isArray(data)) {
          setRequests(data);
        } else {
          console.error("API Error:", data);
          setMessage(data.message || data.msg || "Unable to load requests.");
          setRequests([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
        setMessage("Unable to connect to the server.");
        setRequests([]);
        setLoading(false);
      });
  }, []);

  const refreshData = () => {
    setLoading(true);
    setMessage("");
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in first.");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:5000/api/blood-requests/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok && Array.isArray(data)) {
          setRequests(data);
        } else {
          console.error("API Error:", data);
          setMessage(data.message || data.msg || "Unable to load requests.");
          setRequests([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
        setMessage("Unable to connect to the server.");
        setRequests([]);
        setLoading(false);
      });
  };

  // Filtering & Search
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
      req.blood_group?.toLowerCase().includes(search.toLowerCase()) ||
      req.hospital?.toLowerCase().includes(search.toLowerCase()) ||
      req.location?.toLowerCase().includes(search.toLowerCase()) ||
      req.id?.toString().includes(search);

    const matchesStatus = filterStatus === "all" || req.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === "Pending").length;
  const approvedRequests = requests.filter(r => r.status === "Approved").length;
  const completedRequests = requests.filter(r => r.status === "Completed").length;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          border: "border-green-200",
          icon: <CheckCircle className="size-3.5" />,
          label: "Completed"
        };
      case "Approved":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          border: "border-blue-200",
          icon: <Clock className="size-3.5" />,
          label: "Approved"
        };
      case "Pending":
      default:
        return {
          bg: "bg-orange-100",
          text: "text-orange-700",
          border: "border-orange-200",
          icon: <AlertCircle className="size-3.5" />,
          label: "Pending"
        };
    }
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ["ID", "Patient Name", "Blood Group", "Hospital", "Location", "Units", "Status"];
    const data = filteredRequests.map(req => [
      req.id,
      req.patient_name || "-",
      req.blood_group || "-",
      req.hospital || "-",
      req.location || "-",
      req.units_needed || 1,
      req.status || "Pending"
    ]);

    let csvContent = headers.join(",") + "\n";
    data.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my_requests_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin text-red-600 mx-auto" size={40} />
          <p className="text-sm text-muted-foreground mt-4">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <FileText className="size-7 text-red-600" />
                My Blood Requests
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {filteredRequests.length} requests found • {totalRequests} total
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
              >
                <Download className="size-3.5" />
                Export CSV
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
              >
                <Printer className="size-3.5" />
                Print
              </button>
              <button
                onClick={refreshData}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
              >
                <RefreshCw className="size-3.5" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-700">Error</h3>
                <p className="text-sm text-red-600 mt-0.5">{message}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: <FileText className="size-4" />, label: "Total Requests", value: totalRequests, color: "blue" },
            { icon: <AlertCircle className="size-4" />, label: "Pending", value: pendingRequests, color: "orange" },
            { icon: <Clock className="size-4" />, label: "Approved", value: approvedRequests, color: "blue" },
            { icon: <CheckCircle className="size-4" />, label: "Completed", value: completedRequests, color: "green" },
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

        {/* Filters & Search */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by patient, blood group, hospital or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-9 pr-8 py-2 rounded-lg border border-border bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Completed">Completed</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              </div>
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setView("table")}
                  className={`px-3 py-2 transition ${
                    view === "table"
                      ? "bg-red-600 text-white"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FileText className="size-4" />
                </button>
                <button
                  onClick={() => setView("card")}
                  className={`px-3 py-2 transition ${
                    view === "card"
                      ? "bg-red-600 text-white"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Activity className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table View */}
        {view === "table" ? (
          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            {requests.length === 0 && !loading ? (
              <div className="p-12 text-center">
                <Droplet size={48} className="mx-auto text-muted-foreground opacity-50" />
                <h3 className="text-lg font-bold text-foreground mt-4">No Blood Requests</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  You haven't made any blood requests yet.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-border">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Patient</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Blood Group</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hospital</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Units</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paginatedRequests.length > 0 ? (
                        paginatedRequests.map((req, index) => {
                          const status = getStatusBadge(req.status);
                          return (
                            <motion.tr
                              key={req.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.03 }}
                              className="hover:bg-slate-50 transition"
                            >
                              <td className="px-4 py-3 text-sm text-muted-foreground">#{req.id}</td>
                              <td className="px-4 py-3 text-sm font-medium text-foreground">{req.patient_name || "-"}</td>
                              <td className="px-4 py-3">
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-xs">
                                  {req.blood_group || "-"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">{req.hospital || "-"}</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">{req.location || "-"}</td>
                              <td className="px-4 py-3 text-center text-sm font-medium text-foreground">{req.units_needed || 1}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}>
                                  {status.icon}
                                  {status.label}
                                </span>
                              </td>
                            </motion.tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="7" className="px-4 py-12 text-center text-sm text-muted-foreground">
                            <Search className="size-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                            No requests found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Card View */
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((req, index) => {
                const status = getStatusBadge(req.status);
                return (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                          <Droplet className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{req.patient_name || "Patient"}</h3>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}>
                            {status.icon}
                            {status.label}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">#{req.id}</span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Droplet className="size-3.5 text-red-600" />
                        <span className="font-bold text-red-600">{req.blood_group || "-"}</span>
                        <span className="text-muted-foreground">•</span>
                        <span>{req.units_needed || 1} unit{req.units_needed > 1 ? 's' : ''} needed</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Hospital className="size-3.5" />
                        {req.hospital || "-"}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="size-3.5" />
                        {req.location || "-"}
                      </div>
                      {req.created_at && (
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                          <Calendar className="size-3" />
                          {new Date(req.created_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full bg-white rounded-xl border border-border shadow-sm p-12 text-center">
                <Search className="size-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground">No requests found matching your criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredRequests.length > itemsPerPage && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-border hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ArrowLeft className="size-4" />
              </button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-border hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 bg-white rounded-xl border border-border shadow-sm p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Heart className="size-4 text-red-600" />
            <p className="text-sm">LifeLink Blood Donation System</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date().getFullYear()} LifeLink. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyRequests;