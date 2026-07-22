import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart, Droplets, Users, Hospital, Shield, 
  Clock, Award, Activity, Bell, BarChart3, 
  UserPlus, User, MapPin, Phone, Mail,
  CheckCircle, ArrowRight, Sparkles, HeartHandshake,
  Calendar, Stethoscope, Microscope, UserCog,
  Quote, AlertCircle, TrendingUp, HandHeart,
  Syringe, Ambulance, ClipboardCheck, Target,
  Droplet, Info
} from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 soft-grid-bg opacity-60" aria-hidden />
        <div className="absolute inset-x-0 -top-32 -z-10 h-[420px] bg-gradient-to-b from-red-600/20 to-transparent" aria-hidden />
        <div className="container-page grid gap-12 pt-16 pb-20 md:grid-cols-2 md:items-center md:pt-24 md:pb-28">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              <span className="size-1.5 rounded-full bg-red-600" /> Every Drop Counts
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-4xl leading-tight md:text-6xl"
            >
              Donate Blood. <br />
              <span className="text-red-600">Save Lives.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-lg text-lg text-muted-foreground"
            >
              LifeLink is an intelligent blood donation management platform connecting 
              blood donors, hospitals and patients across Kenya. Ensuring no life is 
              lost because blood cannot be found in time.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-red-600/30"
              >
                <UserPlus className="size-4" />
                Become a Donor
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 border border-border bg-card hover:bg-accent px-8 py-3 rounded-full font-semibold text-foreground transition"
              >
                <Heart className="size-4" />
                Request Blood
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-8">
                <div className="rounded-xl bg-red-100 p-2.5 text-red-600">
                  <BarChart3 className="size-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Emergency Dashboard</h2>
              </div>
              <div className="space-y-4">
                {[
                  { icon: <Users className="size-5" />, label: "Registered Donors", value: "500+" },
                  { icon: <Droplets className="size-5" />, label: "Blood Requests", value: "120+" },
                  { icon: <Heart className="size-5" />, label: "Lives Saved", value: "350+" },
                  { icon: <Hospital className="size-5" />, label: "Partner Hospitals", value: "25+" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <span className="font-bold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users className="size-8" />, value: "500+", label: "Registered Donors" },
              { icon: <Droplets className="size-8" />, value: "120+", label: "Blood Requests" },
              { icon: <Heart className="size-8" />, value: "350+", label: "Lives Saved" },
              { icon: <Hospital className="size-8" />, value: "25+", label: "Partner Hospitals" },
            ].map((item) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group rounded-2xl bg-red-50 p-8 text-center hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-xl bg-red-600 text-white group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <div className="text-4xl font-extrabold text-red-600">{item.value}</div>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Why It Matters
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Blood shortages shouldn't cost lives.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Patients often face delays finding compatible donors during emergencies. 
              Hospitals lack visibility into available donors. Donors don't know where 
              their blood is needed most. LifeLink brings the whole loop into one calm, 
              organized place.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHO IT'S FOR ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Who It's For
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Built around three roles, one shared goal.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { 
                icon: <User className="size-7" />, 
                title: "Patients", 
                desc: "Submit urgent blood requests and get matched with compatible donors quickly.",
                color: "blue"
              },
              { 
                icon: <UserPlus className="size-7" />, 
                title: "Donors", 
                desc: "Register, maintain your profile, and respond to emergency blood requests.",
                color: "red"
              },
              { 
                icon: <UserCog className="size-7" />, 
                title: "Administrators", 
                desc: "Manage hospitals, approve donors, and monitor system health — never medical data.",
                color: "purple"
              },
            ].map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className={`mb-4 inline-flex size-14 items-center justify-center rounded-xl bg-${role.color}-100 text-${role.color}-600 group-hover:bg-${role.color}-600 group-hover:text-white transition`}>
                  {role.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground">{role.title}</h3>
                <p className="mt-2 text-muted-foreground">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BLOOD COMPATIBILITY ================= */}
      <section className="py-24 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider shadow-soft">
              Blood Compatibility
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">Know Your Blood Type</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Understanding blood compatibility helps ensure safe blood transfusions 
              and effective emergency response.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto rounded-3xl border border-border bg-card shadow-soft"
          >
            <table className="w-full">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="p-5 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <Droplet className="size-4" />
                      Blood Type
                    </div>
                  </th>
                  <th className="p-5 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <Heart className="size-4" />
                      Can Receive From
                    </div>
                  </th>
                  <th className="p-5 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <Users className="size-4" />
                      Can Donate To
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "A+", receive: "A+, A-, O+, O-", donate: "A+, AB+" },
                  { type: "A-", receive: "A-, O-", donate: "A+, A-, AB+, AB-" },
                  { type: "B+", receive: "B+, B-, O+, O-", donate: "B+, AB+" },
                  { type: "B-", receive: "B-, O-", donate: "B+, B-, AB+, AB-" },
                  { type: "AB+", receive: "All Blood Types", donate: "AB+" },
                  { type: "AB-", receive: "AB-, A-, B-, O-", donate: "AB+, AB-" },
                  { type: "O+", receive: "O+, O-", donate: "O+, A+, B+, AB+" },
                  { type: "O-", receive: "O-", donate: "Everyone" },
                ].map((blood, index) => (
                  <motion.tr 
                    key={blood.type}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-border hover:bg-red-50 transition last:border-0"
                  >
                    <td className="p-5">
                      <span className="inline-block rounded-full bg-red-600 px-4 py-1.5 font-bold text-white">
                        {blood.type}
                      </span>
                    </td>
                    <td className="p-5 text-muted-foreground">{blood.receive}</td>
                    <td className="p-5 text-muted-foreground">{blood.donate}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 rounded-2xl bg-white p-6 border border-border shadow-soft"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <Info className="size-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Universal Donor & Recipient</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-bold text-red-600">O-</span> is the universal donor — their blood can be given to anyone. 
                  <span className="font-bold text-red-600"> AB+</span> is the universal recipient — they can receive blood from anyone.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              How LifeLink Works
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              From Request to Lifesaving Donation
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10"
          >
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { icon: <AlertCircle className="size-8" />, step: "01", title: "Request", desc: "Patient submits urgent blood request" },
                { icon: <Users className="size-8" />, step: "02", title: "Match", desc: "System finds compatible donors" },
                { icon: <HeartHandshake className="size-8" />, step: "03", title: "Connect", desc: "Donor responds and coordinates" },
                { icon: <Heart className="size-8" />, step: "04", title: "Save", desc: "Blood transfusion saves lives" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    {item.icon}
                  </div>
                  <div className="text-sm font-semibold text-red-600">{item.step}</div>
                  <h3 className="text-xl font-bold text-foreground mt-1">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Platform
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Everything the system quietly handles for you.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <UserPlus className="size-6" />, title: "Donor Registration", desc: "Simple sign-up with blood type, location, and availability." },
              { icon: <Bell className="size-6" />, title: "Emergency Alerts", desc: "Real-time notifications for urgent blood requests." },
              { icon: <MapPin className="size-6" />, title: "Location Matching", desc: "Find donors and hospitals near you quickly." },
              { icon: <BarChart3 className="size-6" />, title: "Analytics & Reports", desc: "Track donation trends and system health — aggregate only." },
              { icon: <ClipboardCheck className="size-6" />, title: "Donation Records", desc: "Secure history of all donations and requests." },
              { icon: <Shield className="size-6" />, title: "Privacy Protection", desc: "Medical data encrypted — accessible only to authorized roles." },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRIVACY ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
                <Shield className="size-3.5 text-red-600" /> Privacy First
              </div>
              <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                Medical confidentiality is not a feature. It's the foundation.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Patient medical data and donor information are encrypted and protected. 
                Only authorized hospitals can access donor details. Administrators can 
                steward the system's health without ever accessing personal medical records.
              </p>
              <div className="mt-6 flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-3 text-sm text-muted-foreground">
                <Shield className="size-4 text-red-600" />
                Aggregate only. Never a peek into individual medical data.
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="rounded-3xl bg-card border border-border p-10 shadow-soft text-center">
                <Shield className="size-24 text-red-600 mx-auto" />
                <h3 className="mt-4 text-xl font-bold text-foreground">End-to-End Encryption</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  All medical data is protected at every step
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= PARTNER HOSPITALS ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Partners
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Trusted Healthcare Partners
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              LifeLink works closely with referral hospitals across Kenya to improve 
              emergency blood availability.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Kenyatta National Hospital", location: "Nairobi" },
              { name: "Moi Teaching & Referral Hospital", location: "Eldoret" },
              { name: "Aga Khan University Hospital", location: "Nairobi" },
              { name: "The Nairobi Hospital", location: "Nairobi" },
              { name: "Coast General Teaching & Referral Hospital", location: "Mombasa" },
              { name: "Garissa County Referral Hospital", location: "Garissa" },
            ].map((hospital, i) => (
              <motion.div
                key={hospital.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-xl transition"
              >
                <div className="mb-3 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  🏥 Partner Hospital
                </div>
                <h3 className="text-xl font-bold text-foreground">{hospital.name}</h3>
                <p className="mt-2 text-red-600 font-semibold">
                  <MapPin className="inline size-4 mr-1" />
                  {hospital.location}, Kenya
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Providing emergency blood transfusion services, laboratory testing, 
                  donor coordination and critical healthcare support.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY DONATE ================= */}
      <section className="py-24 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Why Donate?
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Your Donation Saves Lives
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Every blood donation provides hope for patients undergoing surgery, 
              cancer treatment, childbirth complications and emergency care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Heart className="size-7" />, title: "Save Lives", text: "One blood donation can save up to three lives." },
              { icon: <Clock className="size-7" />, title: "Emergency Support", text: "Blood is always needed for surgeries and accidents." },
              { icon: <Users className="size-7" />, title: "Community Impact", text: "Help families and strengthen your local community." },
              { icon: <Sparkles className="size-7" />, title: "Give Hope", text: "Become part of a nationwide lifesaving movement." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl bg-white p-8 text-center shadow-soft hover:shadow-xl transition"
              >
                <div className="mx-auto mb-5 inline-flex size-16 items-center justify-center rounded-full bg-red-600 text-white group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">Stories That Inspire</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from people whose lives have been transformed through blood donation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Ahmed Hassan", role: "Blood Donor", icon: <Droplets className="size-7" />, text: "LifeLink made donating blood simple and organized. Knowing I helped save someone's life is an unforgettable feeling." },
              { name: "Fatuma Ali", role: "Blood Recipient", icon: <Heart className="size-7" />, text: "When my family urgently needed blood, compatible donors were found quickly through LifeLink. We are forever grateful." },
              { name: "Dr. John Mwangi", role: "Medical Officer", icon: <Stethoscope className="size-7" />, text: "LifeLink has greatly improved coordination between hospitals and volunteer blood donors during emergencies." },
            ].map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-xl transition"
              >
                <Quote className="size-8 text-red-400 mb-4" />
                <p className="text-muted-foreground leading-relaxed italic">"{person.text}"</p>
                <hr className="my-6 border-border" />
                <div className="flex items-center gap-4">
                  <div className="inline-flex size-12 items-center justify-center rounded-full bg-red-600 text-white">
                    {person.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{person.name}</h4>
                    <p className="text-sm text-red-600 font-medium">{person.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">Common Questions</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { q: "Who can donate blood?", a: "Healthy adults aged 18–65 years who meet medical requirements can donate blood." },
              { q: "Is blood donation safe?", a: "Yes. Every donation uses sterile, single-use equipment under professional medical supervision." },
              { q: "How often can I donate?", a: "Most healthy adults can donate whole blood every 3 months, subject to medical advice." },
              { q: "How does LifeLink work?", a: "LifeLink connects patients, hospitals and donors to quickly locate compatible blood during emergencies." },
            ].map((faq) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-foreground">{faq.q}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/faq" 
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-red-600/30"
            >
              View All FAQs <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 soft-grid-bg opacity-60" aria-hidden />
        <div className="absolute inset-x-0 -bottom-32 -z-10 h-[420px] bg-gradient-to-t from-red-600/20 to-transparent" aria-hidden />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-10 shadow-soft"
          >
            <div className="mx-auto mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
              <Heart className="size-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Become Someone's Hero Today
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every blood donation gives hope to patients fighting for their lives. 
              Join LifeLink today and become part of Kenya's growing community of lifesavers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-red-600/30"
              >
                <UserPlus className="size-4" />
                Become a Donor
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 border border-border bg-card hover:bg-accent px-8 py-3 rounded-full font-semibold text-foreground transition"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;