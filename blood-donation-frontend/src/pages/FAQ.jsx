import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Phone, Mail, MapPin, Clock, 
  Heart, Droplets, Users, Hospital, Shield,
  ArrowRight, Sparkles, UserPlus, CheckCircle,
  AlertCircle, HelpCircle, MessageCircle,
  Award, TrendingUp, Calendar, Activity
} from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: "Donor Eligibility",
      question: "Who can donate blood?",
      answer: "Healthy adults aged between 18 and 65 years, weighing at least 50 kg, and meeting the medical requirements can donate blood. Every donor undergoes a health assessment before donating."
    },
    {
      category: "Safety",
      question: "Is blood donation safe?",
      answer: "Yes. LifeLink works with licensed healthcare professionals and partner hospitals. Sterile, single-use equipment is used for every donation, making the process safe for both donors and recipients."
    },
    {
      category: "Donation",
      question: "How often can I donate blood?",
      answer: "Most healthy adults can donate whole blood every 12 to 16 weeks depending on national medical guidelines and individual health status."
    },
    {
      category: "Registration",
      question: "How do I become a donor?",
      answer: "Create a LifeLink account, verify your email, complete your profile with your blood group and location, then update your availability whenever you're ready to donate."
    },
    {
      category: "Emergency Requests",
      question: "How does LifeLink help patients?",
      answer: "Patients can submit emergency blood requests that are immediately visible to administrators and compatible donors, helping reduce delays during emergencies."
    },
    {
      category: "Matching",
      question: "How are donors matched?",
      answer: "LifeLink matches donors using blood group compatibility, location, availability, and request priority to improve response time."
    },
    {
      category: "Privacy",
      question: "Is my personal information secure?",
      answer: "Yes. User information is protected through secure authentication, encrypted communication, and controlled access within the LifeLink platform."
    },
    {
      category: "Hospitals",
      question: "Can hospitals use LifeLink?",
      answer: "Yes. Hospitals can manage blood requests, communicate with donors, monitor donations, and coordinate emergency responses through the platform."
    }
  ];

  const contacts = [
    { icon: <Phone className="size-5" />, title: "Phone", value: "+254 729 667 133" },
    { icon: <Mail className="size-5" />, title: "Email", value: "lifelink.bloodsystem@gmail.com" },
    { icon: <MapPin className="size-5" />, title: "Location", value: "Garissa, Kenya" },
    { icon: <Clock className="size-5" />, title: "Support", value: "24/7 Emergency Assistance" },
  ];

  const stats = [
    { icon: <Users className="size-6" />, value: "500+", label: "Registered Donors" },
    { icon: <Droplets className="size-6" />, value: "120+", label: "Blood Requests" },
    { icon: <Hospital className="size-6" />, value: "25+", label: "Partner Hospitals" },
    { icon: <Activity className="size-6" />, value: "24/7", label: "Emergency Support" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 soft-grid-bg opacity-60" aria-hidden />
        <div className="absolute inset-x-0 -top-32 -z-10 h-[420px] bg-gradient-to-b from-red-600/20 to-transparent" aria-hidden />
        <div className="container-page pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground mx-auto"
          >
            <span className="size-1.5 rounded-full bg-red-600" /> Frequently Asked Questions
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-5xl md:text-6xl font-extrabold text-foreground leading-tight"
          >
            Everything You Need To Know
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Find answers to common questions about blood donation,
            emergency blood requests, donor registration,
            hospital collaboration, and LifeLink services.
          </motion.p>
        </div>
      </section>

      {/* ================= CONTACT INFO ================= */}
      <section className="py-16 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contacts.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Find Your Answer
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through the frequently asked questions below.
              Click any question to reveal its answer.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden hover:shadow-md transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex justify-between items-center text-left px-6 py-5 hover:bg-slate-50 transition"
                >
                  <div className="flex-1 pr-4">
                    <span className="inline-block rounded-full bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1">
                      {faq.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-muted-foreground"
                  >
                    <ChevronDown className="size-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="border-t border-border pt-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUICK FACTS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              LifeLink Overview
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Supporting Communities Through Blood Donation
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              LifeLink provides a modern platform that connects blood
              donors, patients, hospitals, and administrators,
              helping save lives through faster communication and
              efficient emergency response.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-slate-50 p-8 text-center hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                  {item.icon}
                </div>
                <div className="text-3xl font-extrabold text-red-600">{item.value}</div>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEED MORE HELP ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
                Need More Help?
              </span>
              <h2 className="mt-4 text-4xl font-bold text-foreground">
                Our Support Team Is Ready To Assist You
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                If you cannot find the answer you're looking for,
                don't worry. Our LifeLink support team is available
                to assist donors, patients, hospitals, healthcare
                professionals, and system administrators.
              </p>
              <div className="mt-10 space-y-4">
                {[
                  { icon: <Phone className="size-5" />, title: "Phone Support", value: "+254 729 667 133" },
                  { icon: <Mail className="size-5" />, title: "Email Support", value: "lifelink.bloodsystem@gmail.com" },
                  { icon: <MapPin className="size-5" />, title: "Office Location", value: "Garissa, Kenya" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="inline-flex size-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-border bg-card p-10 shadow-soft"
            >
              <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
                <Heart className="size-7" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Every Donation Matters
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A single blood donation can help save multiple lives.
                By becoming a donor through LifeLink, you become part
                of a growing community dedicated to saving lives every
                single day.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "Verified donor registration",
                  "Real-time emergency requests",
                  "Hospital collaboration",
                  "Secure communication platform",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="size-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 soft-grid-bg opacity-60" aria-hidden />
        <div className="absolute inset-x-0 -bottom-32 -z-10 h-[420px] bg-gradient-to-t from-red-600/20 to-transparent" aria-hidden />
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-10 shadow-soft"
          >
            <div className="mx-auto mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
              <Sparkles className="size-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Together We Can Save More Lives
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Join LifeLink today and become part of a trusted community
              connecting blood donors, patients, hospitals, and healthcare
              professionals across Kenya.
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
                to="/contact"
                className="inline-flex items-center gap-2 border border-border bg-card hover:bg-accent px-8 py-3 rounded-full font-semibold text-foreground transition"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}