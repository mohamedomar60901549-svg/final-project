import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserPlus, CheckCircle, Droplets, Heart, Shield,
  Clock, Users, Hospital, MapPin, BarChart3,
  ArrowRight, Sparkles, User, Activity, ClipboardCheck,
  AlertCircle, HeartHandshake, Stethoscope, Target,
  Calendar, Award, TrendingUp, Phone, Mail,
  Droplet, Info, Lock, EyeOff, Image
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Register as a donor, patient, hospital, or administrator by providing your basic personal information.",
      icon: <UserPlus className="size-8" />,
    },
    {
      number: "02",
      title: "Complete Your Profile",
      description: "Add your blood group, location, contact information, and medical details to help us serve you better.",
      icon: <ClipboardCheck className="size-8" />,
    },
    {
      number: "03",
      title: "Donate or Request Blood",
      description: "Donors can make themselves available while patients can submit emergency blood requests instantly.",
      icon: <Droplets className="size-8" />,
    },
    {
      number: "04",
      title: "Save Lives Together",
      description: "LifeLink connects donors and patients quickly through hospitals for safe and reliable blood donation.",
      icon: <Heart className="size-8" />,
    },
  ];

  const benefits = [
    { icon: <AlertCircle className="size-7" />, title: "Fast Emergency Response", desc: "Patients receive assistance quickly through real-time donor matching." },
    { icon: <CheckCircle className="size-7" />, title: "Verified Donors", desc: "Every donor profile is verified before participating in blood donation." },
    { icon: <Hospital className="size-7" />, title: "Hospital Collaboration", desc: "Hospitals coordinate directly with donors for safe blood collection." },
    { icon: <Lock className="size-7" />, title: "Privacy Protection", desc: "Your personal information is securely protected within the platform." },
    { icon: <MapPin className="size-7" />, title: "Location Matching", desc: "Nearby compatible donors are identified automatically during emergencies." },
    { icon: <BarChart3 className="size-7" />, title: "Donation Records", desc: "Keep track of all your previous donations and request history." },
  ];

  const timeline = [
    { icon: <User className="size-7" />, title: "Account Registration", desc: "Create your secure LifeLink account by providing your personal information, contact details, and selecting your user role.", color: "blue" },
    { icon: <CheckCircle className="size-7" />, title: "Medical Verification", desc: "Your medical information is reviewed to determine donation eligibility and ensure compliance with healthcare standards.", color: "green" },
    { icon: <Droplets className="size-7" />, title: "Blood Donation or Request", desc: "Donors schedule blood donations while patients submit emergency blood requests through the secure platform.", color: "amber" },
    { icon: <Hospital className="size-7" />, title: "Hospital Processing", desc: "Blood is collected, tested, stored safely, and prepared for transfusion according to approved healthcare procedures.", color: "purple" },
    { icon: <Heart className="size-7" />, title: "Life Saved", desc: "Compatible blood reaches the patient safely, helping save lives and strengthening healthcare support within the community.", color: "rose" },
  ];

  const requirements = [
    "Be between 18 and 65 years old.",
    "Weigh at least 50 kilograms.",
    "Be in good general health.",
    "Have enough time since your previous donation.",
    "Carry a valid identification document.",
    "Eat a healthy meal before donating blood.",
  ];

  const beforeDonation = [
    "Drink plenty of water.",
    "Sleep well the night before donation.",
    "Eat iron-rich foods.",
    "Avoid alcohol before donating.",
    "Bring your identification.",
    "Inform medical staff about any medications.",
  ];

  const duringDonation = [
    "Medical staff checks your health status.",
    "Your blood pressure and weight are recorded.",
    "A sterile needle is used for donation.",
    "The process takes approximately 10–15 minutes.",
    "Blood is safely stored and tested.",
  ];

  const afterDonation = [
    "Rest for 10–15 minutes.",
    "Drink extra fluids.",
    "Avoid heavy lifting for the day.",
    "Eat healthy meals.",
    "Return if you feel unwell.",
  ];

  const faqs = [
    { question: "Who can donate blood?", answer: "Healthy adults meeting medical requirements can safely donate blood." },
    { question: "Is blood donation safe?", answer: "Yes. All donations use sterile, single-use equipment following medical standards." },
    { question: "How often can I donate?", answer: "Whole blood donation is generally allowed every 8 to 12 weeks depending on local medical guidelines." },
    { question: "How does LifeLink help?", answer: "LifeLink connects donors, patients, and hospitals for faster emergency blood support." },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1600&q=80"
            alt="Blood donation"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 -z-10 soft-grid-bg opacity-60" aria-hidden />
        <div className="absolute inset-x-0 -top-32 -z-10 h-[420px] bg-gradient-to-b from-red-600/20 to-transparent" aria-hidden />
        <div className="container-page grid gap-12 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-muted-foreground mx-auto"
          >
            <span className="size-1.5 rounded-full bg-red-600" /> LifeLink Blood Donation System
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-5xl md:text-6xl font-extrabold text-foreground"
          >
            How LifeLink Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            LifeLink simplifies blood donation by connecting donors, patients, hospitals, 
            and healthcare professionals through one secure and intelligent platform 
            designed to save lives faster.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-red-600/30"
            >
              <UserPlus className="size-4" />
              Register Now
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 border border-border bg-card/80 backdrop-blur-sm hover:bg-accent px-8 py-3 rounded-full font-semibold text-foreground transition"
            >
              Login
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
                Our Process
              </span>
              <h2 className="mt-4 text-4xl font-bold text-foreground">
                A Modern Blood Donation Experience
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                LifeLink makes blood donation simple, transparent, and efficient. 
                Whether you are donating blood for the first time or requesting 
                emergency blood, our platform guides you through every stage with 
                safety and reliability.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Every request is coordinated with verified donors and partner hospitals 
                to ensure patients receive compatible blood as quickly as possible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-soft"
            >
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80"
                alt="Blood donation process"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold">Join the LifeLink Community</h3>
                  <p className="text-white/80">Every donation saves lives</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FOUR STEPS ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Step by Step
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Four Simple Steps to Save Lives
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Our streamlined process ensures that blood donation and emergency
              requests are completed safely, efficiently, and professionally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-xl transition hover:-translate-y-1 text-center"
              >
                <div className="mx-auto mb-4 inline-flex size-16 items-center justify-center rounded-full bg-red-600 text-white text-2xl font-bold">
                  {step.number}
                </div>
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Step Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 rounded-3xl overflow-hidden shadow-soft"
          >
            <img
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1600&q=80"
              alt="Blood donation steps"
              className="w-full h-[300px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= DONATION TIMELINE ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Donation Journey
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Your Complete Journey
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Every donation follows an organized process to ensure donor safety, 
              blood quality, and timely delivery to patients.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-6"
                >
                  <div className={`inline-flex size-16 flex-shrink-0 items-center justify-center rounded-full bg-${item.color}-600 text-white`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-xl transition">
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-soft"
            >
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80"
                alt="Blood donation journey"
                className="w-full h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Platform Benefits
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Why Thousands Choose LifeLink
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform combines technology with healthcare to ensure blood 
              reaches patients safely, quickly and efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Benefits Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 rounded-3xl overflow-hidden shadow-soft"
          >
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80"
              alt="Healthcare benefits"
              className="w-full h-[300px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= REQUIREMENTS & TIPS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Donor Guidelines
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Before, During & After Donation
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl overflow-hidden shadow-soft h-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1579684385126-3aed5c72c7b8?w=1200&q=80"
                  alt="Blood donation guidelines"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Requirements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Shield className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Requirements</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Before */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <Clock className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Before Donation</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {beforeDonation.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* During */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <Activity className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">During Donation</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {duringDonation.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* After Donation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                    <Heart className="size-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-3">After Donation</h3>
                    <ul className="grid md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      {afterDonation.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="size-4 text-rose-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
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

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-foreground">{faq.question}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{faq.answer}</p>
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

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1600&q=80"
            alt="Blood donation community"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 -z-10 soft-grid-bg opacity-60" aria-hidden />
        <div className="absolute inset-x-0 -bottom-32 -z-10 h-[420px] bg-gradient-to-t from-red-600/20 to-transparent" aria-hidden />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl rounded-3xl border border-border bg-card/90 backdrop-blur-sm p-10 shadow-soft"
          >
            <div className="mx-auto mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
              <Heart className="size-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Become a Life Saver?
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every donation can save up to three lives. Join thousands of compassionate 
              donors and help hospitals respond to emergencies faster than ever before.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-red-600/30"
              >
                <UserPlus className="size-4" />
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