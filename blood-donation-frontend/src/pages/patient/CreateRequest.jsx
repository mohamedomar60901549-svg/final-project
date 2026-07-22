import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Droplet, Activity, Hospital, MapPin,
  Send, CheckCircle, AlertCircle, Loader2,
  Heart, Shield, Clock, Award, FileText,
  RefreshCw, ArrowLeft, ArrowRight, Users
} from "lucide-react";

function CreateRequest() {
  const [formData, setFormData] = useState({
    patient_name: "",
    blood_group: "",
    units_needed: "",
    hospital: "",
    location: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setMessageType("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in first to create a blood request.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/blood-requests/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            patient_name: formData.patient_name,
            blood_group: formData.blood_group,
            units_needed: Number(formData.units_needed),
            hospital: formData.hospital,
            location: formData.location,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Blood request created successfully!");
        setMessageType("success");

        setFormData({
          patient_name: "",
          blood_group: "",
          units_needed: "",
          hospital: "",
          location: "",
        });

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 5000);
      } else {
        setMessage(data.message || data.msg || "Request failed. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = 
    formData.patient_name &&
    formData.blood_group &&
    formData.units_needed &&
    formData.hospital &&
    formData.location;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <FileText className="size-7 text-red-600" />
                Create Blood Request
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Submit a new blood request and get help from donors
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                <span className="size-1.5 rounded-full bg-green-600 animate-pulse" />
                System Active
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Card - Takes 3/5 of the space */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-border shadow-lg p-8"
            >
              <div className="mb-6 pb-4 border-b border-border">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Send className="size-5 text-red-600" />
                  Request Details
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Fill in the details below to create a blood request
                </p>
              </div>

              {/* Success Message */}
              {message && messageType === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-green-700">Success!</h3>
                      <p className="text-sm text-green-600 mt-0.5">{message}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {message && messageType === "error" && (
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

              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* Patient Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <User className="inline size-4 mr-2 text-red-600" />
                      Patient Name
                    </label>
                    <input
                      type="text"
                      name="patient_name"
                      placeholder="Enter patient's full name"
                      value={formData.patient_name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-background px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                      required
                    />
                  </div>

                  {/* Blood Group */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Droplet className="inline size-4 mr-2 text-red-600" />
                      Blood Group
                    </label>
                    <select
                      name="blood_group"
                      value={formData.blood_group}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-background px-5 py-3.5 text-base text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  {/* Units Needed */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Activity className="inline size-4 mr-2 text-red-600" />
                      Units Needed
                    </label>
                    <input
                      type="number"
                      name="units_needed"
                      placeholder="Enter number of units needed"
                      value={formData.units_needed}
                      onChange={handleChange}
                      min="1"
                      className="w-full rounded-xl border border-border bg-background px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                      required
                    />
                  </div>

                  {/* Hospital */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Hospital className="inline size-4 mr-2 text-red-600" />
                      Hospital
                    </label>
                    <input
                      type="text"
                      name="hospital"
                      placeholder="Enter hospital name"
                      value={formData.hospital}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-background px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <MapPin className="inline size-4 mr-2 text-red-600" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-background px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-border">
                    <button
                      type="submit"
                      disabled={loading || !isFormValid}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:cursor-not-allowed text-white text-base font-semibold py-4 rounded-xl transition shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          Creating Request...
                        </>
                      ) : (
                        <>
                          <Send className="size-5" />
                          Create Blood Request
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Sidebar - Takes 2/5 of the space */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-7 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Heart className="size-5" />
                </div>
                <h3 className="text-lg font-bold">Emergency Tips</h3>
              </div>
              <ul className="space-y-4 text-sm text-red-100">
                <li className="flex items-start gap-3">
                  <CheckCircle className="size-4 text-red-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Be specific</span>
                    <p className="text-red-200/80">Provide accurate blood group and location</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="size-4 text-red-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Act quickly</span>
                    <p className="text-red-200/80">Requests are time-sensitive</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="size-4 text-red-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Stay updated</span>
                    <p className="text-red-200/80">Check your request status regularly</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Donation Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-border shadow-lg p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="size-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Shield className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Guidelines</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                  <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Requests are verified by hospital staff</span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                  <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Donors will be notified automatically</span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                  <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Keep your contact information updated</span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                  <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Emergency requests get priority</span>
                </li>
              </ul>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-blue-50 rounded-2xl border border-blue-200 p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="size-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Award className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-blue-800">Did You Know?</h3>
              </div>
              <ul className="space-y-3 text-sm text-blue-700">
                <li className="flex items-start gap-3 p-3 rounded-lg bg-blue-100/50 hover:bg-blue-100 transition">
                  <Heart className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>One donation can save up to 3 lives</span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-blue-100/50 hover:bg-blue-100 transition">
                  <Clock className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Blood can be stored for up to 42 days</span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-blue-100/50 hover:bg-blue-100 transition">
                  <Users className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Type O- is the universal donor</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 bg-white rounded-2xl border border-border shadow-lg p-6 text-center">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Heart className="size-4 text-red-600" />
            <p className="text-sm">LifeLink Blood Donation System</p>
            <span className="w-px h-4 bg-border" />
            <p className="text-sm">Saving lives through blood donation</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date().getFullYear()} LifeLink. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateRequest;