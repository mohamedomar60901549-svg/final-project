import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin, Mail, Phone, MessageCircle, Send,
  User, AtSign, FileText, AlignLeft, ChevronDown,
  Sparkles, Heart, ArrowRight, CheckCircle,
  Clock, Globe, Users, Building
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sendMethod, setSendMethod] = useState("email");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const body = `Name: ${form.name}

Email: ${form.email}

Subject: ${form.subject}

Message:
${form.message}`;

    if (sendMethod === "email") {
      window.location.href =
        `mailto:lifelink.bloodsystem@gmail.com?subject=${encodeURIComponent(
          form.subject
        )}&body=${encodeURIComponent(body)}`;
    } else {
      window.location.href =
        `sms:+254729667133?body=${encodeURIComponent(body)}`;
    }
  };

  const formComplete =
    form.name &&
    form.email &&
    form.subject &&
    form.message;

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
            <span className="size-1.5 rounded-full bg-red-600" /> Contact LifeLink
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-5xl md:text-6xl font-extrabold text-foreground leading-tight"
          >
            We're Here To Help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Whether you are a donor, patient, hospital or healthcare
            professional, our team is ready to assist you with blood donation,
            emergency requests, account support and general inquiries.
          </motion.p>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Contact Information
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Let's Talk
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              LifeLink is committed to improving emergency blood donation and
              healthcare services across Kenya. Feel free to contact us for
              assistance, partnerships, technical support or any project
              inquiries.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: <MapPin className="size-5" />, title: "Office Location", value: "Garissa, Kenya", color: "blue" },
                { icon: <Mail className="size-5" />, title: "Project Email", value: "lifelink.bloodsystem@gmail.com", link: "mailto:lifelink.bloodsystem@gmail.com", color: "green" },
                { icon: <Phone className="size-5" />, title: "Phone & WhatsApp", value: "+254 729 667 133", link: "tel:+254729667133", color: "red" },
              ].map((item) => (
                <div 
                  key={item.title}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-xl transition hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex size-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      {item.link ? (
                        <a 
                          href={item.link}
                          className="mt-1 block text-red-600 hover:text-red-700 transition"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
                      )}
                      {item.title === "Project Email" && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          Send us your questions, partnership requests or technical support inquiries.
                        </p>
                      )}
                      {item.title === "Phone & WhatsApp" && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          Available Monday - Saturday, 7:00 AM - 5:00 PM (EAT).
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border bg-card p-10 shadow-soft"
          >
            <h2 className="text-3xl font-bold text-foreground">
              Send Us a Message
            </h2>
            <p className="mt-2 text-muted-foreground">
              Complete the form below and choose whether to send it through Email or SMS.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <User className="inline size-4 mr-2 text-muted-foreground" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <AtSign className="inline size-4 mr-2 text-muted-foreground" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <FileText className="inline size-4 mr-2 text-muted-foreground" />
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Message subject"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <AlignLeft className="inline size-4 mr-2 text-muted-foreground" />
                  Message
                </label>
                <textarea
                  rows="5"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Send className="inline size-4 mr-2 text-muted-foreground" />
                  Send Via
                </label>
                <select
                  value={sendMethod}
                  onChange={(e) => setSendMethod(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition"
                >
                  <option value="email">📧 Email</option>
                  <option value="sms">💬 SMS</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!formComplete}
                className={`w-full py-4 rounded-xl font-semibold transition ${
                  formComplete
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-600/30"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {sendMethod === "email" ? (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="size-4" />
                    Send via Email
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <MessageCircle className="size-4" />
                    Send via SMS
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ================= QUICK RESPONSE ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Clock className="size-6" />, title: "Quick Response", desc: "We respond to all inquiries within 24 hours." },
              { icon: <Heart className="size-6" />, title: "24/7 Emergency", desc: "Emergency blood requests are handled immediately." },
              { icon: <Users className="size-6" />, title: "Expert Support", desc: "Our team is trained to assist with all blood donation needs." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-slate-50 p-8 text-center hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
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
              Every blood donation has the power to save lives. Join LifeLink
              today and become part of Kenya's growing network of voluntary blood
              donors, hospitals and healthcare professionals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:lifelink.bloodsystem@gmail.com"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-red-600/30"
              >
                <Mail className="size-4" />
                Email Us
              </a>
              <a
                href="tel:+254729667133"
                className="inline-flex items-center gap-2 border border-border bg-card hover:bg-accent px-8 py-3 rounded-full font-semibold text-foreground transition"
              >
                <Phone className="size-4" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}