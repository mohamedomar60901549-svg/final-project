import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Hospital, MapPin, Phone, Mail, Clock, 
  Heart, Droplets, Users, Shield, Activity,
  ArrowRight, Sparkles, Stethoscope, Microscope,
  HeartHandshake, Ambulance, ClipboardCheck,
  Target, Award, TrendingUp, CheckCircle,
  User, UserPlus, UserCog, AlertCircle
} from "lucide-react";

export default function Hospitals() {
  const hospitals = [
    {
      name: "Garissa County Referral Hospital",
      location: "Garissa County",
      type: "County Referral Hospital",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80",
      description: "A major referral hospital serving North Eastern Kenya with emergency care, surgery, maternity services, blood transfusion and specialist healthcare.",
      stats: { beds: "400+", doctors: "50+", bloodUnits: "600+" }
    },
    {
      name: "Kenyatta National Hospital",
      location: "Nairobi",
      type: "National Referral Hospital",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      description: "Kenya's largest referral hospital offering advanced medical treatment and comprehensive blood transfusion services.",
      stats: { beds: "2000+", doctors: "500+", bloodUnits: "2000+" }
    },
    {
      name: "Moi Teaching & Referral Hospital",
      location: "Uasin Gishu",
      type: "Teaching Hospital",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
      description: "A leading teaching and referral hospital providing specialist healthcare and emergency medical services.",
      stats: { beds: "800+", doctors: "200+", bloodUnits: "1000+" }
    },
    {
      name: "Aga Khan University Hospital",
      location: "Nairobi",
      type: "Private Teaching Hospital",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
      description: "World-class healthcare with advanced laboratory, surgical and blood banking services.",
      stats: { beds: "350+", doctors: "150+", bloodUnits: "500+" }
    },
    {
      name: "The Nairobi Hospital",
      location: "Nairobi",
      type: "Private Hospital",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80",
      description: "Provides quality healthcare with modern emergency and critical care facilities.",
      stats: { beds: "300+", doctors: "120+", bloodUnits: "400+" }
    },
    {
      name: "Coast General Teaching & Referral Hospital",
      location: "Mombasa",
      type: "County Referral Hospital",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      description: "Serving Kenya's coastal region through emergency care, surgery and blood donation support.",
      stats: { beds: "500+", doctors: "80+", bloodUnits: "700+" }
    }
  ];

  const services = [
    { icon: <Droplets className="size-7" />, title: "Blood Donation", desc: "Safe blood collection, screening and storage using modern medical standards." },
    { icon: <Ambulance className="size-7" />, title: "Emergency Response", desc: "Rapid response to emergency blood requests and critical patient care." },
    { icon: <Microscope className="size-7" />, title: "Blood Testing", desc: "Modern laboratories ensure every donated blood unit is safe for transfusion." },
    { icon: <Stethoscope className="size-7" />, title: "Specialist Doctors", desc: "Qualified healthcare professionals available across multiple specialties." },
    { icon: <Hospital className="size-7" />, title: "Hospital Network", desc: "LifeLink connects hospitals for faster donor matching and patient support." },
    { icon: <Heart className="size-7" />, title: "Patient Care", desc: "Improving survival through timely access to compatible blood donations." },
  ];

  const impactStats = [
    { label: "Emergency Response", value: "95%" },
    { label: "Blood Availability", value: "92%" },
    { label: "Hospital Satisfaction", value: "98%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80"
            alt="Hospital"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
        </div>
        <div className="absolute inset-0 -z-10 soft-grid-bg opacity-20" aria-hidden />
        
        <div className="container-page grid gap-12 pt-16 pb-20 md:pt-24 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
              <span className="size-1.5 rounded-full bg-red-500" /> Healthcare Partners
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Partner Hospitals
              <br />
              <span className="text-red-400">Across Kenya</span>
            </h1>
            <p className="mt-6 text-xl text-white/80 leading-relaxed max-w-2xl">
              LifeLink works closely with referral hospitals, county hospitals 
              and healthcare institutions to improve emergency blood availability, 
              strengthen donor networks and save lives throughout Kenya.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-red-600/30"
              >
                <UserPlus className="size-4" />
                Become a Donor
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/60 text-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-full font-semibold transition"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="py-16 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Hospital className="size-8" />, value: "25+", label: "Partner Hospitals" },
              { icon: <Droplets className="size-8" />, value: "10K+", label: "Blood Units Available" },
              { icon: <Users className="size-8" />, value: "500+", label: "Active Donors" },
              { icon: <Heart className="size-8" />, value: "350+", label: "Lives Saved" },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-red-50 p-6 text-center hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-red-600 text-white">
                  {item.icon}
                </div>
                <div className="text-3xl font-extrabold text-red-600">{item.value}</div>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PARTNER HOSPITALS ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Our Healthcare Partners
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Trusted Hospitals Across Kenya
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              LifeLink collaborates with leading public and private hospitals
              to improve emergency blood availability, patient care and donor
              coordination.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital, i) => (
              <motion.div
                key={hospital.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-2xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block rounded-full bg-red-600 text-white text-xs font-semibold px-3 py-1">
                      {hospital.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground">{hospital.name}</h3>
                  <p className="mt-1 text-red-600 font-medium flex items-center gap-1">
                    <MapPin className="size-4" />
                    {hospital.location}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {hospital.description}
                  </p>
                  <div className="mt-4 flex gap-4 text-sm">
                    <div>
                      <span className="font-bold text-foreground">{hospital.stats.beds}</span>
                      <span className="text-muted-foreground ml-1">Beds</span>
                    </div>
                    <div>
                      <span className="font-bold text-foreground">{hospital.stats.doctors}</span>
                      <span className="text-muted-foreground ml-1">Doctors</span>
                    </div>
                    <div>
                      <span className="font-bold text-foreground">{hospital.stats.bloodUnits}</span>
                      <span className="text-muted-foreground ml-1">Blood Units</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED HOSPITAL ================= */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1600&q=80"
            alt="Garissa Hospital"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        <div className="absolute inset-0 -z-10 soft-grid-bg opacity-20" aria-hidden />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block rounded-full bg-red-600/20 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-red-400 uppercase tracking-wider">
              Featured Hospital
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
              Garissa Level 5 Teaching and Referral Hospital
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Located in North Eastern Kenya, Garissa Level 5 Teaching and Referral Hospital
              serves thousands of patients every year and plays a critical role
              in emergency healthcare, maternity services, surgery, trauma
              response and blood transfusion services.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              Through LifeLink, hospitals like Garissa Level 5 Teaching and Referral Hospital
              can quickly identify compatible blood donors, reduce emergency
              response time and improve patient survival.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-4 gap-6 mt-12"
          >
            {[
              { value: "24/7", label: "Emergency Care" },
              { value: "6+", label: "Counties Served" },
              { value: "600+", label: "Blood Units Storage" },
              { value: "40K+", label: "Units Tested Yearly" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
                <div className="text-3xl font-bold text-white">{item.value}</div>
                <p className="mt-1 text-white/70 text-sm">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= HOSPITAL SERVICES ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
              Healthcare Excellence
            </span>
            <h2 className="mt-4 text-4xl font-bold text-foreground">
              Services Supported by LifeLink
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Our hospital network delivers comprehensive healthcare while
              LifeLink ensures patients receive compatible blood quickly during
              emergencies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Service Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 rounded-3xl overflow-hidden shadow-soft"
          >
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80"
              alt="Hospital services"
              className="w-full h-[300px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= WHY LIFELINK ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700 uppercase tracking-wider">
                Why Hospitals Choose LifeLink
              </span>
              <h2 className="mt-4 text-4xl font-bold text-foreground">
                Faster Emergency Response Through Technology
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                LifeLink provides hospitals with an intelligent platform that
                connects verified blood donors, healthcare professionals and
                patients through one secure system.
              </p>
              <div className="space-y-4 mt-8">
                {[
                  { icon: <CheckCircle className="size-5" />, title: "Instant Donor Matching", desc: "Find compatible donors within seconds." },
                  { icon: <CheckCircle className="size-5" />, title: "Secure Patient Records", desc: "Protected information with secure authentication." },
                  { icon: <CheckCircle className="size-5" />, title: "Real-Time Communication", desc: "Hospitals, donors and patients stay connected instantly." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="text-red-600 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
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
              <h3 className="text-3xl font-bold text-foreground">LifeLink Impact</h3>
              <div className="space-y-6 mt-8">
                {impactStats.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-bold text-foreground">{item.value}</span>
                    </div>
                    <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.value }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full rounded-full ${
                          item.value === "98%" ? "bg-red-600" :
                          item.value === "95%" ? "bg-blue-600" :
                          "bg-green-600"
                        }`}
                        style={{ width: item.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= BLOOD DONATION IMAGE ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-soft relative"
          >
            <img
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1600&q=80"
              alt="Blood donation at hospital"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
              <div>
                <h3 className="text-3xl font-bold text-white">Every Donation Counts</h3>
                <p className="text-white/80 mt-2">Join our network of life-saving hospitals</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80"
            alt="Healthcare partnership"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 -z-10 soft-grid-bg opacity-60" aria-hidden />
        <div className="absolute inset-x-0 -bottom-32 -z-10 h-[420px] bg-gradient-to-t from-red-600/20 to-transparent" aria-hidden />
        
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/90 backdrop-blur-sm p-10 shadow-soft"
          >
            <div className="mx-auto mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
              <Heart className="size-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Together We Save Lives
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Join our growing network of hospitals, healthcare professionals,
              blood donors and volunteers working together to improve emergency
              healthcare across Kenya.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold text-white transition shadow-lg hover:shadow-red-600/30"
              >
                <UserPlus className="size-4" />
                Partner With LifeLink
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-border bg-card hover:bg-accent px-8 py-3 rounded-full font-semibold text-foreground transition"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}