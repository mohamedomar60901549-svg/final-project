import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Droplet, CheckCircle, Clock, AlertCircle,
  RefreshCw, Search, Filter, ChevronDown,
  ArrowLeft, ArrowRight, User, Hospital,
  Calendar, Activity, Heart, TrendingUp,
  Award, Download, Printer, FileText
} from "lucide-react";

function ManageDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [updating, setUpdating] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    completed: 0,
  });

  const token = localStorage.getItem("token");

  const fetchDonations = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/donations/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        const donationsData = Array.isArray(data) ? data : [];
        setDonations(donationsData);
        
        // Calculate stats
        const pending = donationsData.filter(d => d.status === "Pending").length;
        const approved = donationsData.filter(d => d.status === "Approved").length;
        const completed = donationsData.filter(d => d.status === "Completed").length;
        
        setStats({
          total: donationsData.length,
          pending,
          approved,
          completed,
        });
      } else {
        setError(data.message || "Failed to load donations.");
        setDonations([]);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
      setError("Error fetching donations. Please try again.");
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const updateDonationStatus = async (id, newStatus) => {
    setUpdating(id);
    
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/donations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            status: newStatus
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        fetchDonations();
        // Show success message
        alert(`Donation ${newStatus.toLowerCase()} successfully!`);
      } else {
        alert(data.message || `Failed to ${newStatus.toLowerCase()} donation.`);
      }
    } catch (error) {
      console.error("Error updating donation:", error);
      alert("Error updating donation. Please try again.");
    } finally {
      setUpdating(null);
    }
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

  // Filter donations
  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.id?.toString().includes(search) ||
      donation.donor_name?.toLowerCase().includes(search.toLowerCase()) ||
      donation.blood_group?.toLowerCase().includes(search.toLowerCase()) ||
      donation.hospital?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === "all" || donation.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDonations = filteredDonations.slice(startIndex, startIndex + itemsPerPage);

  // Export CSV
  const exportCSV = () => {
    const headers = ["ID", "Donor Name", "Blood Group", "Hospital", "Date", "Status"];
    const data = filteredDonations.map(d => [
      d.id,
      d.donor_name || "-",
      d.blood_group || "-",
      d.hospital || "-",
      d.donation_date ? new Date(d.donation_date).toLocaleDateString() : "-",
      d.status || "Pending"
    ]);

    let csvContent = headers.join(",") + "\n";
    data.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations_${new Date().toISOString().split('T')[0]}.csv`;
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
          <p className="text-sm text-muted-foreground mt-4">Loading donations...</p>
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
                <Droplet className="size-7 text-red-600" />
                Manage Donations
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {filteredDonations.length} donations found • {donations.length} total
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
                onClick={fetchDonations}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
              >
                <RefreshCw className="size-3.5" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-700">Error</h3>
                <p className="text-sm text-red-600 mt-0.5">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: <Droplet className="size-4" />, label: "Total Donations", value: stats.total, color: "red" },
            { icon: <AlertCircle className="size-4" />, label: "Pending", value: stats.pending, color: "orange" },
            { icon: <Clock className="size-4" />, label: "Approved", value: stats.approved, color: "blue" },
            { icon: <CheckCircle className="size-4" />, label: "Completed", value: stats.completed, color: "green" },
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
                placeholder="Search by donor, blood group, hospital or ID..."
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
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          {donations.length === 0 ? (
            <div className="p-12 text-center">
              <Droplet className="size-12 mx-auto text-muted-foreground opacity-50" />
              <h3 className="text-lg font-bold text-foreground mt-4">No Donations Found</h3>
              <p className="text-sm text-muted-foreground mt-2">
                There are no donations in the system yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Donor</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Blood Group</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hospital</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedDonations.length > 0 ? (
                    paginatedDonations.map((donation, index) => {
                      const status = getStatusBadge(donation.status);
                      const isPending = donation.status === "Pending";
                      const isApproved = donation.status === "Approved";
                      const isCompleted = donation.status === "Completed";
                      
                      return (
                        <motion.tr
                          key={donation.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.03 }}
                          className="hover:bg-slate-50 transition"
                        >
                          <td className="px-4 py-3 text-sm text-muted-foreground">#{donation.id}</td>
                          <td className="px-4 py-3 text-sm font-medium text-foreground">{donation.donor_name || "-"}</td>
                          <td className="px-4 py-3">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-xs">
                              {donation.blood_group || "-"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{donation.hospital || "-"}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {donation.donation_date ? new Date(donation.donation_date).toLocaleDateString() : "-"}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}>
                              {status.icon}
                              {status.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              {isPending && (
                                <button
                                  onClick={() => updateDonationStatus(donation.id, "Approved")}
                                  disabled={updating === donation.id}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                                >
                                  {updating === donation.id ? (
                                    <RefreshCw className="size-3 animate-spin" />
                                  ) : (
                                    "Approve"
                                  )}
                                </button>
                              )}
                              {isApproved && (
                                <button
                                  onClick={() => updateDonationStatus(donation.id, "Completed")}
                                  disabled={updating === donation.id}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-green-600 hover:bg-green-700 transition"
                                >
                                  {updating === donation.id ? (
                                    <RefreshCw className="size-3 animate-spin" />
                                  ) : (
                                    "Complete"
                                  )}
                                </button>
                              )}
                              {isCompleted && (
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
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
                      <td colSpan="7" className="px-4 py-12 text-center text-sm text-muted-foreground">
                        <Search className="size-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                        No donations found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredDonations.length > itemsPerPage && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDonations.length)} of {filteredDonations.length} donations
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

export default ManageDonations;