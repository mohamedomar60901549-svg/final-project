import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, MapPin, Droplets, Heart,
  Shield, Edit, Save, X, RefreshCw, CheckCircle,
  AlertCircle, Clock, Calendar, Award, TrendingUp,
  Activity, UserCog, FileText, Printer, Download
} from "lucide-react";

function DonorProfile() {
  const [user, setUser] = useState(null);
  const [availability, setAvailability] = useState("Available");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setAvailability(userData.availability || "Available");
      setEditForm({
        full_name: userData.full_name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        location: userData.location || "",
      });
    }
  }, []);

  const updateAvailability = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const newStatus =
        availability === "Available"
          ? "Unavailable"
          : "Available";

      const response = await fetch(
        "http://localhost:5000/api/auth/availability",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            availability: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAvailability(data.availability);

        const updatedUser = {
          ...user,
          availability: data.availability,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

        alert("Availability updated successfully.");
      } else {
        alert(data.message);
        console.log(data);
      }
    } catch (error) {
      console.error("Availability update error:", error);
      alert("Failed to update availability.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditForm({
      full_name: user?.full_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
    });
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const updatedUser = {
          ...user,
          ...editForm,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setEditing(false);
        alert("Profile updated successfully.");
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="size-8 text-muted-foreground animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Stats
  const stats = [
    { icon: <Droplets className="size-4" />, label: "Blood Group", value: user.blood_group || "Not set" },
    { icon: <MapPin className="size-4" />, label: "Location", value: user.location || "Not set" },
    { icon: <UserCog className="size-4" />, label: "Role", value: user.role || "Not set" },
    { icon: <Activity className="size-4" />, label: "Status", value: availability || "Available" },
  ];

  const isAvailable = availability === "Available";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <User className="size-7 text-red-600" />
                My Profile
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage your donor profile and availability
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {!editing && (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                >
                  <Edit className="size-3.5" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-border shadow-sm overflow-hidden"
        >
          {/* Profile Header with Gradient */}
          <div className={`bg-gradient-to-r ${isAvailable ? 'from-green-600 to-green-700' : 'from-red-600 to-red-700'} px-6 py-8 text-white`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="size-20 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold">
                  {user.full_name?.charAt(0) || "D"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.full_name}</h2>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-sm">
                      <Droplets className="size-3.5" />
                      {user.blood_group || "N/A"}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-sm ${
                      isAvailable 
                        ? 'bg-green-400/30 text-white' 
                        : 'bg-red-400/30 text-white'
                    }`}>
                      <span className={`size-1.5 rounded-full ${isAvailable ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                      {isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.blood_group || "N/A"}</p>
                  <p className="text-xs text-white/80">Blood Group</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.location || "N/A"}</p>
                  <p className="text-xs text-white/80">Location</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {editing ? (
              /* Edit Mode */
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Edit className="size-4 text-red-600" />
                  Edit Profile
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      <User className="inline size-3.5 mr-1" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={editForm.full_name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      <Mail className="inline size-3.5 mr-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      <Phone className="inline size-3.5 mr-1" />
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      <MapPin className="inline size-3.5 mr-1" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    onClick={handleSaveEdit}
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm hover:shadow-red-600/20"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="size-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="size-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="inline-flex items-center gap-2 border border-border bg-background hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium text-foreground transition"
                  >
                    <X className="size-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="bg-slate-50 rounded-lg p-4 text-center border border-border">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        {stat.icon}
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                      </div>
                      <p className={`text-lg font-bold ${
                        stat.label === "Status" 
                          ? isAvailable ? 'text-green-600' : 'text-red-600'
                          : 'text-foreground'
                      }`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Profile Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-border">
                      <p className="text-xs text-muted-foreground">Full Name</p>
                      <p className="text-base font-semibold text-foreground">{user.full_name || "Not set"}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-border">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-base font-semibold text-foreground">{user.email || "Not set"}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-border">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-base font-semibold text-foreground">{user.phone || "Not set"}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-border">
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-base font-semibold text-foreground">{user.location || "Not set"}</p>
                    </div>
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Availability Status</h3>
                      <p className="text-xs text-muted-foreground">
                        {isAvailable 
                          ? "You are currently available to donate blood" 
                          : "You are currently unavailable to donate blood"}
                      </p>
                    </div>
                    <button
                      onClick={updateAvailability}
                      disabled={loading}
                      className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white transition shadow-sm ${
                        isAvailable
                          ? 'bg-red-600 hover:bg-red-700 hover:shadow-red-600/20'
                          : 'bg-green-600 hover:bg-green-700 hover:shadow-green-600/20'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="size-4 animate-spin" />
                          Updating...
                        </>
                      ) : isAvailable ? (
                        <>
                          <X className="size-4" />
                          Go Offline
                        </>
                      ) : (
                        <>
                          <CheckCircle className="size-4" />
                          Become Available
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Quick Tips */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="size-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Donation Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Stay hydrated before donation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Eat iron-rich foods</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Get good sleep the night before</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Award className="size-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Your Impact</h3>
            </div>
            <ul className="space-y-2 text-sm text-green-700">
              <li className="flex items-start gap-2">
                <Heart className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Every donation saves up to 3 lives</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Donation takes only 10-15 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>You can donate every 3 months</span>
              </li>
            </ul>
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
      </div>
    </div>
  );
}

export default DonorProfile;