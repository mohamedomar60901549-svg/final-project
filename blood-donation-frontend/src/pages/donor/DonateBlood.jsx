import { useState } from "react";
import { motion } from "framer-motion";
import {
  Droplets, Hospital, Heart, Weight, Calendar,
  AlertCircle, CheckCircle, X, RefreshCw,
  Clock, Shield, User, Phone, Mail, MapPin,
  ArrowLeft, ArrowRight, FileText, Award,
  Activity, Thermometer, Stethoscope, Syringe
} from "lucide-react";

function DonateBlood() {
  const [hospital, setHospital] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [weight, setWeight] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!hospital || !bloodGroup || !weight || !lastDonationDate) {
      setError("Please fill in all fields.");
      return;
    }

    if (bloodGroup === "Don't Know") {
      setError("Please get a blood group test before donating.");
      return;
    }

    if (Number(weight) < 50) {
      setError("You must weigh at least 50kg to donate blood.");
      return;
    }

    const today = new Date();
    const lastDate = new Date(lastDonationDate);
    const difference = today.getTime() - lastDate.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (days < 90) {
      setError(
        `You donated ${days} days ago. Wait ${90 - days} more days before donating again.`
      );
      return;
    }

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:5000/api/donations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            donor_id: user.id,
            hospital: hospital,
            blood_group: bloodGroup
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setHospital("");
        setBloodGroup("");
        setWeight("");
        setLastDonationDate("");
        
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        setError(data.message || "Failed to record donation.");
      }
    } catch (error) {
      console.log(error);
      setError("Backend server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = hospital && bloodGroup && weight && lastDonationDate && bloodGroup !== "Don't Know" && Number(weight) >= 50;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <div className="size-12 rounded-xl bg-red-600 text-white flex items-center justify-center">
                  <Droplets className="size-6" />
                </div>
                Donate Blood
              </h1>
              <p className="text-sm text-muted-foreground mt-1.5 ml-16">
                Record your blood donation and help save lives
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                <span className="size-1.5 rounded-full bg-green-600 animate-pulse" />
                System Active
              </span>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-green-200 bg-green-50 p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="size-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-700 text-lg">Donation Recorded Successfully!</h3>
                <p className="text-sm text-green-600 mt-0.5">
                  Thank you for your donation. You've helped save lives today. ❤️
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="size-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-700 text-lg">Error</h3>
                <p className="text-sm text-red-600 mt-0.5">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

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
                  <Syringe className="size-5 text-red-600" />
                  Donation Form
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Please fill in all the details below to record your donation
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Hospital Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Hospital className="inline size-4 mr-2 text-red-600" />
                      Hospital Name
                    </label>
                    <input
                      type="text"
                      value={hospital}
                      onChange={(e) => setHospital(e.target.value)}
                      placeholder="Enter the name of the hospital"
                      className="w-full rounded-xl border border-border bg-background px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    />
                  </div>

                  {/* Blood Group */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Droplets className="inline size-4 mr-2 text-red-600" />
                      Blood Group
                    </label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-5 py-3.5 text-base text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
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
                      <option value="Don't Know">Don't Know</option>
                    </select>
                  </div>

                  {bloodGroup === "Don't Know" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="rounded-lg bg-yellow-50 border border-yellow-200 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-yellow-800">Blood Group Unknown</p>
                          <p className="text-sm text-yellow-700 mt-0.5">
                            Please visit a hospital for blood group testing before donating.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Weight */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Weight className="inline size-4 mr-2 text-red-600" />
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Enter your weight in kilograms"
                      className="w-full rounded-xl border border-border bg-background px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    />
                    {weight && Number(weight) < 50 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-2"
                      >
                        <AlertCircle className="size-4" />
                        Minimum weight required is 50kg
                      </motion.p>
                    )}
                    {weight && Number(weight) >= 50 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-sm text-green-600 flex items-center gap-2"
                      >
                        <CheckCircle className="size-4" />
                        Weight requirement met
                      </motion.p>
                    )}
                  </div>

                  {/* Last Donation Date */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Calendar className="inline size-4 mr-2 text-red-600" />
                      Last Donation Date
                    </label>
                    <input
                      type="date"
                      value={lastDonationDate}
                      onChange={(e) => setLastDonationDate(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-5 py-3.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
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
                          <RefreshCw className="size-5 animate-spin" />
                          Processing Donation...
                        </>
                      ) : (
                        <>
                          <Heart className="size-5" />
                          Donate Blood
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
                <h3 className="text-lg font-bold">Did You Know?</h3>
              </div>
              <ul className="space-y-4 text-sm text-red-100">
                <li className="flex items-start gap-3">
                  <CheckCircle className="size-4 text-red-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">One donation</span>
                    <p className="text-red-200/80">Can save up to 3 lives</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="size-4 text-red-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Only 10-15 minutes</span>
                    <p className="text-red-200/80">Quick and easy procedure</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="size-4 text-red-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">100% Safe</span>
                    <p className="text-red-200/80">Sterile and professional</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="size-4 text-red-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Every 3 months</span>
                    <p className="text-red-200/80">You can donate regularly</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-border shadow-lg p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="size-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Shield className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Requirements</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                  <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Age: 18 - 65 years</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                  <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Weight: At least 50kg</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                  <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Good general health</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                  <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">90 days since last donation</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                  <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Valid identification</span>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Before Donation Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-blue-50 rounded-2xl border border-blue-200 p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="size-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <AlertCircle className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-blue-800">Before Donation</h3>
              </div>
              <ul className="space-y-3 text-sm text-blue-700">
                <li className="flex items-start gap-3 p-3 rounded-lg bg-blue-100/50 hover:bg-blue-100 transition">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Drink plenty of water</span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-blue-100/50 hover:bg-blue-100 transition">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Eat a healthy meal</span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-blue-100/50 hover:bg-blue-100 transition">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Get good sleep</span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-blue-100/50 hover:bg-blue-100 transition">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Bring your ID</span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-blue-100/50 hover:bg-blue-100 transition">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Avoid alcohol 24 hours before</span>
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

export default DonateBlood;