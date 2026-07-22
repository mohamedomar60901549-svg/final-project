import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Droplet, MapPin, Hospital, User,
  CheckCircle, XCircle, MessageSquare,
  Loader2, Heart, Clock, AlertCircle,
  Shield, Calendar, Phone, Mail,
  RefreshCw, Filter, Search, ArrowUp,
  ArrowDown, Activity, Award, Users
} from "lucide-react";

function BloodRequests() {
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({});
  const [responding, setResponding] = useState(null);
  const [filter, setFilter] = useState("all"); // all, matching, others

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:5000/api/blood-requests/",
        { headers }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setRequests(data);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.log("Request loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (requestId, status) => {
    try {
      setResponding(requestId);

      const response = await fetch(
        `http://127.0.0.1:5000/api/blood-requests/${requestId}/respond`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            response: status,
            feedback: feedback[requestId] || ""
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          status === "Accepted"
            ? "Thank you for accepting this donation request 🩸"
            : "Request declined"
        );
        fetchRequests();
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Response error:", error);
    } finally {
      setResponding(null);
    }
  };

  const matchingRequests = requests.filter(
    request =>
      request.status === "Pending" &&
      request.blood_group === user?.blood_group
  );

  const otherRequests = requests.filter(
    request =>
      request.status === "Pending" &&
      request.blood_group !== user?.blood_group
  );

  const displayedRequests = filter === "matching" ? matchingRequests :
                          filter === "others" ? otherRequests :
                          [...matchingRequests, ...otherRequests];

  const totalPending = requests.filter(r => r.status === "Pending").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-red-600 mx-auto" size={40} />
          <p className="text-sm text-muted-foreground mt-4">Loading blood requests...</p>
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
                Blood Requests
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {user?.blood_group ? `Matching your blood group (${user.blood_group})` : 'All pending requests'}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={fetchRequests}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg transition"
              >
                <RefreshCw className="size-3.5" />
                Refresh
              </button>
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setFilter("matching")}
                  className={`px-3 py-2 text-xs font-medium transition ${
                    filter === "matching"
                      ? "bg-red-600 text-white"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Matching
                </button>
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-2 text-xs font-medium transition ${
                    filter === "all"
                      ? "bg-red-600 text-white"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("others")}
                  className={`px-3 py-2 text-xs font-medium transition ${
                    filter === "others"
                      ? "bg-red-600 text-white"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Others
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Droplet className="size-4" />, label: "Total Pending", value: totalPending, color: "orange" },
            { icon: <Heart className="size-4" />, label: "Matching Your Type", value: matchingRequests.length, color: "red" },
            { icon: <Users className="size-4" />, label: "Other Types", value: otherRequests.length, color: "blue" },
            { icon: <Activity className="size-4" />, label: "Total Requests", value: requests.length, color: "purple" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-border shadow-sm p-4"
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

        {/* No Requests */}
        {displayedRequests.length === 0 && (
          <div className="bg-white rounded-xl border border-border shadow-sm p-12 text-center">
            <Droplet size={48} className="mx-auto text-muted-foreground opacity-50" />
            <h2 className="text-xl font-bold text-foreground mt-4">No Matching Requests</h2>
            <p className="text-sm text-muted-foreground mt-2">
              {filter === "matching" 
                ? "There are currently no blood requests matching your blood group."
                : filter === "others"
                ? "There are no other blood requests available."
                : "There are currently no pending blood requests."}
            </p>
            {user?.blood_group && filter !== "others" && (
              <p className="text-sm text-muted-foreground mt-1">
                Your blood group: <span className="font-bold text-red-600">{user.blood_group}</span>
              </p>
            )}
          </div>
        )}

        {/* Requests Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {displayedRequests.map((request, index) => {
            const isMatching = request.blood_group === user?.blood_group;
            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl border shadow-lg overflow-hidden ${
                  isMatching 
                    ? 'border-t-4 border-t-red-600 border-border' 
                    : 'border-t-4 border-t-blue-400 border-border'
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-xl flex items-center justify-center ${
                        isMatching ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {isMatching ? <Heart className="size-5" /> : <Droplet className="size-5" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">Blood Needed</h3>
                        {isMatching && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                            <CheckCircle className="size-3" />
                            Matching your blood group
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium border border-yellow-200">
                      <Clock className="size-3" />
                      Pending
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                      <Droplet className="size-4 text-red-600" />
                      <span className="text-muted-foreground">Blood Group:</span>
                      <span className="font-bold text-red-600">{request.blood_group}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                      <User className="size-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Patient:</span>
                      <span className="font-medium text-foreground">{request.patient_name}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                      <Hospital className="size-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Hospital:</span>
                      <span className="font-medium text-foreground">{request.hospital}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                      <MapPin className="size-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium text-foreground">{request.location}</span>
                    </div>
                    {request.units_needed && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                        <Activity className="size-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Units Needed:</span>
                        <span className="font-medium text-foreground">{request.units_needed}</span>
                      </div>
                    )}
                  </div>

                  {/* Feedback Textarea */}
                  <div className="mt-5">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      <MessageSquare className="inline size-3.5 mr-1" />
                      Feedback (optional)
                    </label>
                    <textarea
                      placeholder="Leave a message for the hospital..."
                      value={feedback[request.id] || ""}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          [request.id]: e.target.value
                        })
                      }
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition resize-none"
                      rows="2"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => handleResponse(request.id, "Accepted")}
                      disabled={responding === request.id}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-muted disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition shadow-sm hover:shadow-green-600/20 flex items-center justify-center gap-2"
                    >
                      {responding === request.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <CheckCircle className="size-4" />
                      )}
                      I Can Donate
                    </button>
                    <button
                      onClick={() => handleResponse(request.id, "Declined")}
                      disabled={responding === request.id}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
                    >
                      {responding === request.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <XCircle className="size-4" />
                      )}
                      Cannot Donate
                    </button>
                  </div>

                  {/* Info Note */}
                  <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
                    <Shield className="size-3" />
                    Your response will be saved and shared with the hospital.
                  </div>
                </div>
              </motion.div>
            );
          })}
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
      </div>
    </div>
  );
}

export default BloodRequests;