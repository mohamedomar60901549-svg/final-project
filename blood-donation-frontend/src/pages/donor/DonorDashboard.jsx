import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart, Droplets, CheckCircle, Clock, Calendar,
  TrendingUp, Award, Users, Hospital, MapPin,
  Bell, Activity, User, Mail, Phone,
  RefreshCw, ArrowUp, ArrowDown, Plus,
  Download, Printer, FileText
} from "lucide-react";

function DonorDashboard() {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
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
      // Get donations
      const donationRes = await fetch(
        "http://127.0.0.1:5000/api/donations/",
        { headers }
      );
      const donationData = await donationRes.json();
      setDonations(Array.isArray(donationData) ? donationData : []);

      // Get blood requests
      const requestRes = await fetch(
        "http://127.0.0.1:5000/api/blood-requests/",
        { headers }
      );
      const requestData = await requestRes.json();
      setRequests(Array.isArray(requestData) ? requestData : []);

      // Get logged in user
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.log("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const availableRequests = requests.filter(
    req => req.status === "Pending"
  ).length;

  const completedDonations = donations.filter(
    donation => donation.status === "Completed"
  ).length;

  const approvedRequests = requests.filter(
    req => req.status === "Approved"
  ).length;

  const totalDonations = donations.length;

  // Get recent requests (last 5)
  const recentRequests = requests.slice(0, 5);

  // Calculate donation impact
  const livesSaved = completedDonations * 3; // Each donation saves up to 3 lives

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
          icon: <Activity className="size-3.5" />,
          label: "Pending"
        };
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
                <Heart className="size-7 text-red-600" />
                Donor Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Welcome back, {user?.full_name || "Donor"} • {user?.blood_group || "No blood group"}
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
            <p className="text-sm text-muted-foreground">Loading donor data...</p>
          </div>
        ) : (
          <>
            {/* Donor Profile Card */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 mb-8 text-white"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-full bg-white/20 flex items-center justify-center text-white">
                      <User className="size-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{user.full_name}</h2>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-sm">
                          <Droplets className="size-3.5" />
                          {user.blood_group}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-sm">
                          <MapPin className="size-3.5" />
                          {user.location || "Location not set"}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-green-400/30 text-white text-sm">
                          <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
                          Available to Donate
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{totalDonations}</p>
                      <p className="text-xs text-red-100/80">Total Donations</p>
                    </div>
                    <div className="w-px h-12 bg-white/20" />
                    <div className="text-center">
                      <p className="text-3xl font-bold">{livesSaved}</p>
                      <p className="text-xs text-red-100/80">Lives Saved</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <Droplets className="size-5" />, label: "Available Requests", value: availableRequests, color: "red", change: "+3" },
                { icon: <CheckCircle className="size-5" />, label: "Completed Donations", value: completedDonations, color: "green", change: "+2" },
                { icon: <Clock className="size-5" />, label: "Approved Requests", value: approvedRequests, color: "blue", change: "+1" },
                { icon: <Award className="size-5" />, label: "Lives Saved", value: livesSaved, color: "purple", change: "+6" },
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
                      <p className="text-xs font-medium text-green-600 mt-1 flex items-center gap-1">
                        {stat.change}
                        <ArrowUp className="size-3" />
                      </p>
                    </div>
                    <div className={`size-10 rounded-lg bg-${stat.color}-100 text-${stat.color}-600 flex items-center justify-center`}>
                      {stat.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Blood Requests */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="size-5 text-red-600" />
                  <h2 className="text-lg font-semibold text-foreground">Recent Blood Requests</h2>
                </div>
                <span className="text-xs text-muted-foreground">
                  {requests.length} total requests
                </span>
              </div>
              <div className="p-4">
                {recentRequests.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 border-b border-border">
                          <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Patient</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Blood Group</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hospital</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Units</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {recentRequests.map((req, index) => {
                          const status = getStatusBadge(req.status);
                          return (
                            <motion.tr
                              key={req.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="hover:bg-slate-50 transition"
                            >
                              <td className="px-4 py-3 text-sm font-medium text-foreground">{req.patient_name || "-"}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className="inline-block px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-xs">
                                  {req.blood_group || "-"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">{req.hospital || "-"}</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">{req.location || "-"}</td>
                              <td className="px-4 py-3 text-sm text-center font-medium text-foreground">{req.units_needed || 1}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}>
                                  {status.icon}
                                  {status.label}
                                </span>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Droplets className="size-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-sm text-muted-foreground">No blood requests available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions & Impact */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Plus className="size-4 text-red-600" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition text-sm font-medium">
                    <Heart className="size-4" />
                    Respond to Request
                    <span className="ml-auto text-xs bg-red-200 text-red-700 px-2 py-0.5 rounded-full">
                      {availableRequests}
                    </span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-50 text-foreground transition text-sm">
                    <Calendar className="size-4 text-muted-foreground" />
                    Schedule Donation
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-50 text-foreground transition text-sm">
                    <Activity className="size-4 text-muted-foreground" />
                    View Donation History
                  </button>
                </div>
              </div>

              {/* Donation Impact */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6">
                <h3 className="text-sm font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <Award className="size-4" />
                  Your Impact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Total Donations</span>
                    <span className="text-xl font-bold text-green-800">{totalDonations}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Lives Saved</span>
                    <span className="text-xl font-bold text-green-800">{livesSaved}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Completed</span>
                    <span className="text-xl font-bold text-green-800">{completedDonations}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-xs text-green-600">
                    <Heart className="inline size-3.5 mr-1" />
                    Every donation saves up to 3 lives. Thank you for being a hero!
                  </p>
                </div>
              </div>

              {/* Donor Info */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="size-4 text-red-600" />
                  Donor Information
                </h3>
                {user && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Droplets className="size-3.5 text-red-600" />
                      <span className="text-muted-foreground">Blood Group:</span>
                      <span className="font-semibold">{user.blood_group || "Not set"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="size-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{user.location || "Not set"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="size-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{user.email || "Not set"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="size-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{user.phone || "Not set"}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        user.availability?.toLowerCase() === "available" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        <span className={`size-1.5 rounded-full ${
                          user.availability?.toLowerCase() === "available" ? "bg-green-600" : "bg-red-600"
                        }`} />
                        {user.availability || "Available"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

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
          </>
        )}
      </div>
    </div>
  );
}

export default DonorDashboard;