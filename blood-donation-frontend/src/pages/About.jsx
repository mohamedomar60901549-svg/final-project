import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart, Users, Hospital, Shield, Target, Globe, 
  Lock, Clock, Award, Bell, EyeOff,
  Droplets, Activity, UserCog, User, UserPlus,
  ArrowRight, Sparkles, Quote, MapPin, CheckCircle,
  Stethoscope, Microscope, HeartHandshake
} from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 soft-grid-bg opacity-60" aria-hidden />
        <div className="absolute inset-x-0 -top-32 -z-10 h-[420px] bg-gradient-to-b from-red-600/20 to-transparent" aria-hidden />
        <div className="container-page grid gap-12 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground mx-auto"
          >
            <span className="size-1.5 rounded-full bg-red-600" /> Life-Saving Platform
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-5xl md:text-6xl font-extrabold text-foreground"
          >
            About LifeLink
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            LifeLink is a modern blood donation management platform designed
            to connect blood donors, patients, hospitals, and healthcare
            professionals through one secure and reliable system.
          </motion.p>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="mt-4 text-4xl font-bold text-foreground">
                Connecting Communities Through Blood Donation
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  LifeLink was created to simplify the process of blood donation
                  by bringing together donors, patients, hospitals and medical
                  professionals on one easy-to-use platform.
                </p>
                <p>
                  During emergencies, every second matters. Our system helps
                  hospitals locate suitable donors quickly while allowing donors
                  to respond to blood requests efficiently and securely.
                </p>
                <p>
                  Through innovation and technology, LifeLink aims to increase
                  voluntary blood donations and improve access to life-saving
                  blood across communities.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: <Droplets className="size-8" />, title: "Blood Donation", desc: "Encouraging safe and voluntary blood donation." },
                { icon: <Hospital className="size-8" />, title: "Hospitals", desc: "Supporting healthcare facilities with rapid donor matching." },
                { icon: <Users className="size-8" />, title: "Community", desc: "Building stronger communities through lifesaving donations." },
                { icon: <Heart className="size-8" />, title: "Save Lives", desc: "Every donation can save up to three lives." },
              ].map((item) => (
                <div 
                  key={item.title}
                  className="group rounded-2xl border border-border bg-card p-8 text-center hover:shadow-xl transition hover:-translate-y-1"
                >
                  <div className="mb-4 inline-flex size-14 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= THREE ROLES ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Roles
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Three Roles, One Mission
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              LifeLink brings together three key roles to create a seamless blood donation ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: <User className="size-7" />, 
                title: "Patient", 
                desc: "The person in need of blood. Patients are connected to hospitals that can find compatible donors and coordinate life-saving transfusions.",
                action: "Requests blood"
              },
              { 
                icon: <UserPlus className="size-7" />, 
                title: "Donor", 
                desc: "The life-saver. Donors register, maintain their profiles, and respond to urgent blood requests from hospitals in their area.",
                action: "Donates blood"
              },
              { 
                icon: <UserCog className="size-7" />, 
                title: "Administrator", 
                desc: "The steward of the platform. Admins manage hospitals, approve donors, monitor activity, and ensure the system runs smoothly.",
                action: "Manages the platform"
              },
            ].map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                  {role.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground">{role.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{role.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-red-600 font-medium">
                  <span>{role.action}</span>
                  <ArrowRight className="size-4" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connection Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 rounded-3xl border border-border bg-card p-10 shadow-soft"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              {/* Patient */}
              <div className="flex flex-col items-center">
                <div className="size-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <User className="size-10" />
                </div>
                <span className="mt-3 font-semibold text-foreground">Patient</span>
                <span className="text-sm text-muted-foreground">Requests blood</span>
              </div>

              {/* Arrows */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ArrowRight className="size-6" />
                  <span className="text-sm font-medium">matches with</span>
                  <ArrowRight className="size-6" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">via hospital</div>
              </div>

              {/* Donor */}
              <div className="flex flex-col items-center">
                <div className="size-20 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <UserPlus className="size-10" />
                </div>
                <span className="mt-3 font-semibold text-foreground">Donor</span>
                <span className="text-sm text-muted-foreground">Donates blood</span>
              </div>

              {/* Admin connection */}
              <div className="hidden md:block text-muted-foreground text-2xl">|</div>
              
              <div className="flex flex-col items-center">
                <div className="size-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <UserCog className="size-10" />
                </div>
                <span className="mt-3 font-semibold text-foreground">Administrator</span>
                <span className="text-sm text-muted-foreground">Oversees everything</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-6 py-2 text-sm text-muted-foreground">
                <Shield className="size-4 text-red-600" />
                <span>Admin oversees the ecosystem — never interferes with donor-patient matching</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                icon: <Target className="size-8" />, 
                title: "Our Mission", 
                desc: "To create an efficient, secure and reliable blood donation management system that connects donors, patients and hospitals while ensuring timely access to safe blood during emergencies."
              },
              { 
                icon: <Globe className="size-8" />, 
                title: "Our Vision", 
                desc: "To become the leading digital platform for blood donation, promoting voluntary donations and ensuring that no life is lost because blood is unavailable."
              },
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-10 shadow-soft hover:shadow-xl transition"
              >
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  {item.icon}
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {item.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRINCIPLES ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              What guides us
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything we do is guided by these principles.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="size-6" />, title: "Integrity", desc: "We maintain honesty, transparency and trust." },
              { icon: <Clock className="size-6" />, title: "Efficiency", desc: "Quick response during emergencies." },
              { icon: <Users className="size-6" />, title: "Collaboration", desc: "Working together with hospitals and donors." },
              { icon: <Heart className="size-6" />, title: "Compassion", desc: "Every life matters and deserves another chance." },
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-8 text-center hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Platform Overview
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              How LifeLink Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: <UserPlus className="size-8" />, 
                title: "Donors", 
                desc: "Register as a donor, update your profile, and respond to blood requests from hospitals in your area."
              },
              { 
                icon: <Hospital className="size-8" />, 
                title: "Hospitals", 
                desc: "Post urgent blood requests, find compatible donors quickly, and manage the donation process seamlessly."
              },
              { 
                icon: <Heart className="size-8" />, 
                title: "Patients", 
                desc: "Receive timely blood transfusions through our efficient matching system that connects hospitals with donors."
              },
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-xl transition text-center"
              >
                <div className="mb-4 inline-flex size-16 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRIVACY & SECURITY ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Data & Privacy
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              What We Protect
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-border bg-card p-10 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-green-100 p-3 text-green-600">
                  <Shield className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Protected</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Lock className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>All donor and patient information is encrypted and secure</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Only authorized hospitals can access donor information</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Data is never shared with third parties without consent</span>
                </li>
                <li className="flex items-start gap-3">
                  <EyeOff className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Complete transparency about how your data is used</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-border bg-card p-10 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <Bell className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Notifications</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Bell className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Urgent blood requests sent to matching donors immediately</span>
                </li>
                <li className="flex items-start gap-3">
                  <Bell className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Real-time updates on donation appointments</span>
                </li>
                <li className="flex items-start gap-3">
                  <Bell className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Reminders for upcoming donation sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Bell className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Quiet notifications - you control your alert preferences</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= REPORTING ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Insights
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Insight Without Intrusion
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border bg-card p-10 shadow-soft"
          >
            <div className="grid md:grid-cols-[1.2fr_1fr] md:items-center gap-8">
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  Administrators can review the health of the blood donation program — 
                  donor registration trends, hospital activity, response times, and 
                  donation volumes — as anonymized aggregates. Individual donor 
                  information and medical data remain private.
                </p>
                <div className="mt-6 flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-muted-foreground border border-border">
                  <EyeOff className="size-4 text-red-600" /> 
                  Aggregate only. Never a peek into individual donor data.
                </div>
              </div>
              <div className="rounded-2xl bg-red-50 p-8 text-center">
                <Activity className="mx-auto size-12 text-red-600" />
                <div className="mt-3 text-sm text-muted-foreground">Trends & totals, not personal data</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
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
              Join LifeLink Today
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Together we can build a stronger community by making blood
              donation easier, safer and faster.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-red-600/30"
              >
                <Sparkles className="size-4" />
                Register Now
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

export default About;