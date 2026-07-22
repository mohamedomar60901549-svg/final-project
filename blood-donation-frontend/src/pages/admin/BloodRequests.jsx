import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets, Search, Filter, ChevronDown,
  RefreshCw, Download, Printer, CheckCircle,
  Clock, AlertCircle, User, Hospital,
  MapPin, Activity, ArrowLeft, ArrowRight,
  Eye, Edit, Trash2, List, Grid,
  Calendar, Phone, Mail, Heart, TrendingUp
} from "lucide-react";

function BloodRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [view, setView] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:5000/api/blood-requests/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRequests(Array.isArray(data) ? data : []);
      } else {
        console.log(data);
        alert(data.message || "Failed to load blood requests.");
        setRequests([]);
      }
    } catch (error) {
      console.log(error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, currentStatus) => {
    let newStatus = currentStatus;

    if (currentStatus === "Pending") {
      newStatus = "Approved";
    } else if (currentStatus === "Approved") {
      newStatus = "Completed";
    } else {
      return;
    }

    if (!window.confirm(`Change status to ${newStatus}?`)) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:5000/api/blood-requests/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Update failed.");
        return;
      }

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
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

  // Export CSV
  const exportCSV = () => {
    const headers = ["ID", "Patient Name", "Blood Group", "Hospital", "Location", "Units", "Status", "Date"];
    const data = filteredRequests.map(req => [
      req.id,
      req.patient_name || "-",
      req.blood_group || "-",
      req.hospital || "-",
      req.location || "-",
      req.units_needed || 1,
      req.status || "Pending",
      req.created_at ? new Date(req.created_at).toLocaleDateString() : "-"
    ]);

    let csvContent = headers.join(",") + "\n";
    data.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blood_requests_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

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

  const getStatusButton = (status) => {
    switch (status) {
      case "Pending":
        return { label: "Approve", color: "bg-blue-600 hover:bg-blue-700", nextStatus: "Approved" };
      case "Approved":
        return { label: "Complete", color: "bg-green-600 hover:bg-green-700", nextStatus: "Completed" };
      case "Completed":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Droplets className="size-7 text-red-600" />
                Blood Requests
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
                onClick={fetchRequests}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
              >
                <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: <Droplets className="size-5" />, label: "Total Requests", value: totalRequests, color: "blue" },
            { icon: <AlertCircle className="size-5" />, label: "Pending", value: pendingRequests, color: "orange" },
            { icon: <Clock className="size-5" />, label: "Approved", value: approvedRequests, color: "blue" },
            { icon: <CheckCircle className="size-5" />, label: "Completed", value: completedRequests, color: "green" },
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
                placeholder="Search by patient name, blood group, hospital, location or ID..."
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
                  <List className="size-4" />
                </button>
                <button
                  onClick={() => setView("card")}
                  className={`px-3 py-2 transition ${
                    view === "card"
                      ? "bg-red-600 text-white"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl border border-border shadow-sm p-12 text-center">
            <RefreshCw className="size-8 text-muted-foreground animate-spin mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Loading blood requests...</p>
          </div>
        ) : (
          <>
            {/* Table View */}
            {view === "table" ? (
              <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
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
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paginatedRequests.length > 0 ? (
                        paginatedRequests.map((req) => {
                          const status = getStatusBadge(req.status);
                          const statusButton = getStatusButton(req.status);
                          return (
                            <motion.tr
                              key={req.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="hover:bg-slate-50 transition"
                            >
                              <td className="px-4 py-3 text-sm text-muted-foreground">#{req.id}</td>
                              <td className="px-4 py-3 text-sm font-medium text-foreground">{req.patient_name || "-"}</td>
                              <td className="px-4 py-3">
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
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
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-center">
                                  {statusButton ? (
                                    <button
                                      onClick={() => updateStatus(req.id, req.status)}
                                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white ${statusButton.color} transition shadow-sm`}
                                    >
                                      <Activity className="size-3" />
                                      {statusButton.label}
                                    </button>
                                  ) : (
                                    <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                      <CheckCircle className="size-3.5" />
                                      Done
                                    </span>
                                  )}
                                </div>
                              </td>
                            </motion.tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="8" className="px-4 py-12 text-center text-sm text-muted-foreground">
                            <Droplets className="size-12 mx-auto mb-3 opacity-50" />
                            No blood requests found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Card View */
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedRequests.length > 0 ? (
                  paginatedRequests.map((req) => {
                    const status = getStatusBadge(req.status);
                    const statusButton = getStatusButton(req.status);
                    return (
                      <motion.div
                        key={req.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                              <Droplets className="size-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{req.patient_name || "Unknown Patient"}</h3>
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}>
                                {status.icon}
                                {status.label}
                              </span>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">#{req.id}</span>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Heart className="size-3.5" />
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
                              <span className="text-muted-foreground">at</span>
                              {new Date(req.created_at).toLocaleTimeString()}
                            </div>
                          )}
                        </div>

                        {statusButton && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <button
                              onClick={() => updateStatus(req.id, req.status)}
                              className={`w-full inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white ${statusButton.color} transition shadow-sm`}
                            >
                              <Activity className="size-3.5" />
                              {statusButton.label}
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="col-span-full bg-white rounded-xl border border-border shadow-sm p-12 text-center">
                    <Droplets className="size-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground">No blood requests found matching your criteria</p>
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
          </>
        )}
      </div>
    </div>
  );
}

export default BloodRequests;