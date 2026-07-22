import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Hospital, User, Droplet, Heart, Clock,
  CheckCircle, AlertCircle, Activity, Users,
  MapPin, Phone, Mail, Calendar, Award,
  RefreshCw, TrendingUp, Shield, MessageSquare,
  UserPlus, FileText, ArrowUp, ArrowDown,
  XCircle
} from "lucide-react";

function PatientDashboard() {
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [responses, setResponses] = useState({});
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load Requests
      const requestsRes = await fetch(
        "http://127.0.0.1:5000/api/blood-requests/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const requestsData = await requestsRes.json();
      if (Array.isArray(requestsData)) {
        setRequests(requestsData);
        // Load responses for each request
        requestsData.forEach(req => {
          loadResponses(req.id);
        });
      }

      // Load Donors - Handle 403 gracefully
      try {
        const donorsRes = await fetch(
          "http://127.0.0.1:5000/api/auth/users",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        if (donorsRes.ok) {
          const donorsData = await donorsRes.json();
          if (Array.isArray(donorsData)) {
            setDonors(donorsData.filter(user => user.role === "donor"));
          }
        } else {
          // If 403, just set donors to empty array
          setDonors([]);
        }
      } catch (donorError) {
        console.log("Donor loading error:", donorError);
        setDonors([]);
      }

      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const loadResponses = async (requestId) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/blood-requests/${requestId}/responses`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = await res.json();
      setResponses(prev => ({
        ...prev,
        [requestId]: data
      }));
    } catch (error) {
      console.error("Error loading responses:", error);
    }
  };

  const completedRequests = requests.filter(req => req.status === "Completed").length;
  const pendingRequests = requests.filter(req => req.status === "Pending").length;
  const approvedRequests = requests.filter(req => req.status === "Approved").length;

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin text-red-600 mx-auto" size={40} />
          <p className="text-sm text-muted-foreground mt-4">Loading dashboard...</p>
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
                <Hospital className="size-7 text-red-600" />
                Patient Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {user?.full_name ? `Welcome back, ${user.full_name}` : 'Manage your blood requests'}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={loadData}
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

        {/* User Profile Card */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mb-8 text-white"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
                  {user.full_name?.charAt(0) || "P"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.full_name}</h2>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-sm">
                      <Droplet className="size-3.5" />
                      {user.blood_group || "N/A"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-sm">
                      <MapPin className="size-3.5" />
                      {user.location || "Location not set"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-green-400/30 text-white text-sm">
                      <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
                      Active
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{requests.length}</p>
                  <p className="text-xs text-blue-100/80">Total Requests</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-2xl font-bold">{completedRequests}</p>
                  <p className="text-xs text-blue-100/80">Completed</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Droplet className="size-5" />, label: "My Requests", value: requests.length, color: "red" },
            { icon: <CheckCircle className="size-5" />, label: "Completed", value: completedRequests, color: "green" },
            { icon: <Clock className="size-5" />, label: "Approved", value: approvedRequests, color: "blue" },
            { icon: <AlertCircle className="size-5" />, label: "Pending", value: pendingRequests, color: "orange" },
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

        {/* Available Donors Stats - Only show if donors data is available */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <Users className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Available Donors</h3>
                <p className="text-sm text-muted-foreground">Donors ready to help</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-red-600">{donors.length}</p>
              <p className="text-xs text-muted-foreground">Active Donors</p>
            </div>
          </div>
        </div>

        {/* Blood Requests List */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="size-5 text-red-600" />
            My Blood Requests
          </h2>

          {requests.length === 0 ? (
            <div className="bg-white rounded-xl border border-border shadow-sm p-12 text-center">
              <Droplet size={48} className="mx-auto text-muted-foreground opacity-50" />
              <h3 className="text-lg font-bold text-foreground mt-4">No Blood Requests</h3>
              <p className="text-sm text-muted-foreground mt-2">
                You haven't made any blood requests yet.
              </p>
            </div>
          ) : (
            requests.map((req, index) => {
              const status = getStatusBadge(req.status);
              const requestResponses = responses[req.id] || [];
              return (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                          <Droplet className="size-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">
                            Blood Request #{req.id}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="inline-flex items-center gap-1">
                              <span className="text-muted-foreground">Blood:</span>
                              <span className="font-bold text-red-600">{req.blood_group}</span>
                            </span>
                            <span className="w-px h-4 bg-border" />
                            <span className="inline-flex items-center gap-1">
                              <span className="text-muted-foreground">Units:</span>
                              <span className="font-medium">{req.units_needed || 1}</span>
                            </span>
                            <span className="w-px h-4 bg-border" />
                            <span className="inline-flex items-center gap-1">
                              <Hospital className="size-3.5 text-muted-foreground" />
                              <span className="font-medium">{req.hospital}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}>
                        {status.icon}
                        {status.label}
                      </span>
                    </div>

                    {/* Donor Responses */}
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <MessageSquare className="size-4 text-muted-foreground" />
                        Donor Responses ({requestResponses.length})
                      </h4>
                      {requestResponses.length > 0 ? (
                        <div className="space-y-2">
                          {requestResponses.map((response) => (
                            <div
                              key={response.id}
                              className={`flex items-center justify-between p-3 rounded-lg border ${
                                response.response === "Accepted"
                                  ? "bg-green-50 border-green-200"
                                  : "bg-red-50 border-red-200"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`size-8 rounded-full flex items-center justify-center ${
                                  response.response === "Accepted"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-600"
                                }`}>
                                  {response.response === "Accepted" ? (
                                    <CheckCircle className="size-4" />
                                  ) : (
                                    <XCircle className="size-4" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground">
                                    {response.donor_name || "Donor"}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {response.feedback || "No feedback provided"}
                                  </p>
                                </div>
                              </div>
                              <span className={`text-xs font-medium ${
                                response.response === "Accepted"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}>
                                {response.response}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 bg-slate-50 rounded-lg border border-border">
                          <Users className="size-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                          <p className="text-sm text-muted-foreground">No donor responses yet</p>
                          <p className="text-xs text-muted-foreground mt-1">Donors will respond to your request soon</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 bg-white rounded-xl border border-border shadow-sm p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Heart className="size-4 text-red-600" />
            <p className="text-sm">LifeLink Blood Donation System</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {lastUpdated}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © {new Date().getFullYear()} LifeLink. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;