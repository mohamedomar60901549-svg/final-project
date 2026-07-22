import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Search, Edit, Trash2, User,
  Mail, Phone, MapPin, Droplets, RefreshCw,
  Download, Printer, X, Save, Check,
  AlertCircle, Users, Filter, ChevronDown,
  ArrowLeft, ArrowRight, Activity, Shield,
  Calendar, Clock, UserPlus, List, Grid
} from "lucide-react";

function ManageDonors() {
  const [donors, setDonors] = useState([]);
  const [editingDonor, setEditingDonor] = useState(null);
  const [search, setSearch] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const token = localStorage.getItem("token");

  // ==========================
  // LOAD DONORS
  // ==========================
  const loadDonors = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/donors",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDonors(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error loading donors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonors();
  }, []);

  // ==========================
  // DELETE DONOR
  // ==========================
  const deleteDonor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this donor? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/auth/donors/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        loadDonors();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // UPDATE DONOR
  // ==========================
  const updateDonor = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/auth/donors/${editingDonor.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingDonor),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Donor updated successfully.");
        setEditingDonor(null);
        loadDonors();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  // ==========================
  // FILTERING & SEARCH
  // ==========================
  const filteredDonors = donors.filter((donor) => {
    const matchesSearch = 
      donor.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      donor.email?.toLowerCase().includes(search.toLowerCase()) ||
      (donor.phone || "").toLowerCase().includes(search.toLowerCase()) ||
      (donor.blood_group || "").toLowerCase().includes(search.toLowerCase()) ||
      (donor.location || "").toLowerCase().includes(search.toLowerCase());
    
    const matchesAvailability = 
      filterAvailability === "all" || 
      (donor.availability || "").toLowerCase() === filterAvailability.toLowerCase();
    
    return matchesSearch && matchesAvailability;
  });

  // ==========================
  // PAGINATION
  // ==========================
  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDonors = filteredDonors.slice(startIndex, startIndex + itemsPerPage);

  // ==========================
  // EXPORT CSV
  // ==========================
  const exportCSV = () => {
    const headers = ["ID", "Full Name", "Email", "Phone", "Blood Group", "Location", "Availability"];
    const data = filteredDonors.map(donor => [
      donor.id,
      donor.full_name,
      donor.email,
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

  // ==========================
  // PRINT
  // ==========================
  const handlePrint = () => {
    window.print();
  };

  const getAvailabilityBadge = (availability) => {
    const status = (availability || "available").toLowerCase();
    if (status === "available") {
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-200",
        dot: "bg-green-600",
        label: "Available"
      };
    } else {
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-200",
        dot: "bg-red-600",
        label: "Unavailable"
      };
    }
  };

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      "A+": "bg-red-100 text-red-700 border-red-200",
      "A-": "bg-red-50 text-red-600 border-red-100",
      "B+": "bg-blue-100 text-blue-700 border-blue-200",
      "B-": "bg-blue-50 text-blue-600 border-blue-100",
      "AB+": "bg-purple-100 text-purple-700 border-purple-200",
      "AB-": "bg-purple-50 text-purple-600 border-purple-100",
      "O+": "bg-green-100 text-green-700 border-green-200",
      "O-": "bg-green-50 text-green-600 border-green-100",
    };
    return colors[bloodGroup] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Heart className="size-7 text-red-600" />
                Manage Donors
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {filteredDonors.length} donors found • {donors.length} total
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
                onClick={loadDonors}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
              >
                <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search donors by name, email, phone, blood group or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <select
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value)}
                  className="pl-9 pr-8 py-2 rounded-lg border border-border bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                >
                  <option value="all">All Donors</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
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

        {/* Edit Donor Form */}
        <AnimatePresence>
          {editingDonor && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl border border-border shadow-sm p-6 mb-6 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Edit className="size-5 text-red-600" />
                  Edit Donor
                </h2>
                <button
                  onClick={() => setEditingDonor(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 transition"
                >
                  <X className="size-5 text-muted-foreground" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    <User className="inline size-3.5 mr-1" />
                    Full Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    value={editingDonor.full_name}
                    onChange={(e) =>
                      setEditingDonor({
                        ...editingDonor,
                        full_name: e.target.value,
                      })
                    }
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    <Mail className="inline size-3.5 mr-1" />
                    Email
                  </label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    value={editingDonor.email}
                    onChange={(e) =>
                      setEditingDonor({
                        ...editingDonor,
                        email: e.target.value,
                      })
                    }
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    <Phone className="inline size-3.5 mr-1" />
                    Phone
                  </label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    value={editingDonor.phone || ""}
                    onChange={(e) =>
                      setEditingDonor({
                        ...editingDonor,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Phone Number"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    <Droplets className="inline size-3.5 mr-1" />
                    Blood Group
                  </label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    value={editingDonor.blood_group || ""}
                    onChange={(e) =>
                      setEditingDonor({
                        ...editingDonor,
                        blood_group: e.target.value,
                      })
                    }
                    placeholder="Blood Group"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    <MapPin className="inline size-3.5 mr-1" />
                    Location
                  </label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    value={editingDonor.location || ""}
                    onChange={(e) =>
                      setEditingDonor({
                        ...editingDonor,
                        location: e.target.value,
                      })
                    }
                    placeholder="Location"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    <Activity className="inline size-3.5 mr-1" />
                    Availability
                  </label>
                  <select
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    value={editingDonor.availability || "Available"}
                    onChange={(e) =>
                      setEditingDonor({
                        ...editingDonor,
                        availability: e.target.value,
                      })
                    }
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={updateDonor}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition shadow-sm hover:shadow-red-600/20"
                >
                  <Save className="size-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingDonor(null)}
                  className="inline-flex items-center gap-2 border border-border bg-background hover:bg-slate-50 px-6 py-2 rounded-lg text-sm font-medium text-foreground transition"
                >
                  <X className="size-4" />
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl border border-border shadow-sm p-12 text-center">
            <RefreshCw className="size-8 text-muted-foreground animate-spin mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Loading donors...</p>
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
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Blood Group</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Availability</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paginatedDonors.length > 0 ? (
                        paginatedDonors.map((donor) => {
                          const availability = getAvailabilityBadge(donor.availability);
                          const bloodColor = getBloodGroupColor(donor.blood_group);
                          return (
                            <motion.tr
                              key={donor.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="hover:bg-slate-50 transition"
                            >
                              <td className="px-4 py-3 text-sm text-muted-foreground">{donor.id}</td>
                              <td className="px-4 py-3 text-sm font-medium text-foreground">{donor.full_name}</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">{donor.email}</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">{donor.phone || "-"}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${bloodColor}`}>
                                  {donor.blood_group || "-"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">{donor.location || "-"}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${availability.bg} ${availability.text} ${availability.border}`}>
                                  <span className={`size-1.5 rounded-full ${availability.dot}`} />
                                  {availability.label}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => setEditingDonor({
                                      ...donor,
                                      availability: donor.availability === "Available" ? "Available" : "Available"
                                    })}
                                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                                  >
                                    <Edit className="size-4" />
                                  </button>
                                  <button
                                    onClick={() => deleteDonor(donor.id)}
                                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                                  >
                                    <Trash2 className="size-4" />
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="8" className="px-4 py-12 text-center text-sm text-muted-foreground">
                            <Heart className="size-12 mx-auto mb-3 opacity-50" />
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
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedDonors.length > 0 ? (
                  paginatedDonors.map((donor) => {
                    const availability = getAvailabilityBadge(donor.availability);
                    const bloodColor = getBloodGroupColor(donor.blood_group);
                    return (
                      <motion.div
                        key={donor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                              <Heart className="size-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{donor.full_name}</h3>
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${availability.bg} ${availability.text} ${availability.border}`}>
                                <span className={`size-1.5 rounded-full ${availability.dot}`} />
                                {availability.label}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setEditingDonor(donor)}
                              className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                            >
                              <Edit className="size-3.5" />
                            </button>
                            <button
                              onClick={() => deleteDonor(donor.id)}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="size-3.5" />
                            {donor.email}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="size-3.5" />
                            {donor.phone || "-"}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Droplets className="size-3.5" />
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${bloodColor}`}>
                              {donor.blood_group || "-"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="size-3.5" />
                            {donor.location || "-"}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="col-span-full bg-white rounded-xl border border-border shadow-sm p-12 text-center">
                    <Heart className="size-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground">No donors found matching your criteria</p>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {filteredDonors.length > itemsPerPage && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDonors.length)} of {filteredDonors.length} donors
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

export default ManageDonors;