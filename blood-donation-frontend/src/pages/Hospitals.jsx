import { Link } from "react-router-dom";

export default function Hospitals() {

  const hospitals = [
    {
      name: "Garissa County Referral Hospital",
      location: "Garissa County",
      type: "County Referral Hospital",
      image: "🏥",
      description:
        "A major referral hospital serving North Eastern Kenya with emergency care, surgery, maternity services, blood transfusion and specialist healthcare."
    },
    {
      name: "Kenyatta National Hospital",
      location: "Nairobi",
      type: "National Referral Hospital",
      image: "🏥",
      description:
        "Kenya's largest referral hospital offering advanced medical treatment and comprehensive blood transfusion services."
    },
    {
      name: "Moi Teaching & Referral Hospital",
      location: "Uasin Gishu",
      type: "Teaching Hospital",
      image: "🏥",
      description:
        "A leading teaching and referral hospital providing specialist healthcare and emergency medical services."
    },
    {
      name: "Aga Khan University Hospital",
      location: "Nairobi",
      type: "Private Teaching Hospital",
      image: "🏥",
      description:
        "World-class healthcare with advanced laboratory, surgical and blood banking services."
    },
    {
      name: "The Nairobi Hospital",
      location: "Nairobi",
      type: "Private Hospital",
      image: "🏥",
      description:
        "Provides quality healthcare with modern emergency and critical care facilities."
    },
    {
      name: "Coast General Teaching & Referral Hospital",
      location: "Mombasa",
      type: "County Referral Hospital",
      image: "🏥",
      description:
        "Serving Kenya's coastal region through emergency care, surgery and blood donation support."
    }
  ];

  const services = [
    {
      icon: "🩸",
      title: "Blood Donation",
      description:
        "Safe blood collection, screening and storage using modern medical standards."
    },
    {
      icon: "🚑",
      title: "Emergency Response",
      description:
        "Rapid response to emergency blood requests and critical patient care."
    },
    {
      icon: "🧪",
      title: "Blood Testing",
      description:
        "Modern laboratories ensure every donated blood unit is safe for transfusion."
    },
    {
      icon: "👨‍⚕️",
      title: "Specialist Doctors",
      description:
        "Qualified healthcare professionals available across multiple specialties."
    },
    {
      icon: "🏥",
      title: "Hospital Network",
      description:
        "LifeLink connects hospitals for faster donor matching and patient support."
    },
    {
      icon: "❤️",
      title: "Patient Care",
      description:
        "Improving survival through timely access to compatible blood donations."
    }
  ];

  return (
    <div className="bg-slate-50">

      {/* ================= HERO ================= */}

      <section className="relative min-h-[650px] flex items-center overflow-hidden">

        {/* Background */}

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/garissa-hospital.jpg')",
          }}
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-slate-900/70"></div>

        {/* Hero Content */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">

          <div className="max-w-3xl">

            <span className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold">
              🏥 Healthcare Partners
            </span>

            <h1 className="mt-8 text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Partner Hospitals
              <br />
              Across Kenya
            </h1>

            <p className="mt-8 text-xl text-slate-200 leading-9">
              LifeLink works closely with referral hospitals, county
              hospitals and healthcare institutions to improve emergency
              blood availability, strengthen donor networks and save lives
              throughout Kenya.
            </p>

            <div className="flex flex-wrap gap-5 mt-12">

              <Link
                to="/register"
                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition"
              >
                Become a Donor
              </Link>

              <Link
                to="/contact"
                className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-slate-900 transition"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>

      </section>

              {/* ================= PARTNER HOSPITALS ================= */}

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Our Healthcare Partners
            </span>

            <h2 className="mt-5 text-4xl font-bold text-gray-900">
              Trusted Hospitals Across Kenya
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600">
              LifeLink collaborates with leading public and private hospitals
              to improve emergency blood availability, patient care and donor
              coordination.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {hospitals.map((hospital) => (

              <div
                key={hospital.name}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300"
              >

                <div className="h-44 bg-gradient-to-r from-slate-700 to-blue-700 flex items-center justify-center text-7xl">
                  🏥
                </div>

                <div className="p-8">

                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {hospital.type}
                  </span>

                  <h3 className="mt-5 text-2xl font-bold text-gray-900">
                    {hospital.name}
                  </h3>

                  <p className="mt-2 text-blue-700 font-medium">
                    📍 {hospital.location}
                  </p>

                  <p className="mt-5 text-gray-600 leading-8">
                    {hospital.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* ================= GARISSA HOSPITAL ================= */}

      <section className="relative py-28 overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1800')",
          }}
        />

        <div className="absolute inset-0 bg-slate-900/75" />

        <div className="relative max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-sm font-semibold">
              Featured Hospital
            </span>

            <h2 className="mt-6 text-5xl font-bold text-white">
              Garissa County Referral Hospital
            </h2>

            <p className="mt-8 text-lg text-slate-200 leading-9">
              Located in North Eastern Kenya, Garissa County Referral Hospital
              serves thousands of patients every year and plays a critical role
              in emergency healthcare, maternity services, surgery, trauma
              response and blood transfusion services.
            </p>

            <p className="mt-6 text-lg text-slate-200 leading-9">
              Through LifeLink, hospitals like Garissa County Referral Hospital
              can quickly identify compatible blood donors, reduce emergency
              response time and improve patient survival.
            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-16">

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/20">
              <h3 className="text-4xl font-bold text-white">24/7</h3>
              <p className="mt-2 text-slate-200">
                Emergency Care
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/20">
              <h3 className="text-4xl font-bold text-white">6+</h3>
              <p className="mt-2 text-slate-200">
                Counties Served
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/20">
              <h3 className="text-4xl font-bold text-white">600+</h3>
              <p className="mt-2 text-slate-200">
                Blood Units Storage
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/20">
              <h3 className="text-4xl font-bold text-white">40K+</h3>
              <p className="mt-2 text-slate-200">
                Units Tested Yearly
              </p>
            </div>

          </div>

        </div>

      </section>

          {/* ================= HOSPITAL SERVICES ================= */}

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Healthcare Excellence
            </span>

            <h2 className="mt-5 text-4xl font-bold text-gray-900">
              Services Supported by LifeLink
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600">
              Our hospital network delivers comprehensive healthcare while
              LifeLink ensures patients receive compatible blood quickly during
              emergencies.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                icon: "🩸",
                title: "Blood Transfusion",
                text: "Rapid blood matching and safe transfusion services."
              },
              {
                icon: "🚑",
                title: "Emergency Care",
                text: "Immediate response for accident and trauma patients."
              },
              {
                icon: "🏥",
                title: "Specialist Treatment",
                text: "Advanced medical care supported by experienced specialists."
              },
              {
                icon: "🧪",
                title: "Laboratory Services",
                text: "Modern laboratory testing and blood screening."
              },
              {
                icon: "👩‍⚕️",
                title: "Maternal Care",
                text: "Supporting mothers during childbirth with safe blood availability."
              },
              {
                icon: "❤️",
                title: "Critical Care",
                text: "Intensive care support for patients requiring urgent treatment."
              }
            ].map((service) => (

              <div
                key={service.title}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition"
              >

                <div className="text-5xl">
                  {service.icon}
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-8">
                  {service.text}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* ================= WHY LIFELINK ================= */}

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Why Hospitals Choose LifeLink
              </span>

              <h2 className="mt-6 text-4xl font-bold text-gray-900">
                Faster Emergency Response Through Technology
              </h2>

              <p className="mt-8 text-lg text-gray-600 leading-9">
                LifeLink provides hospitals with an intelligent platform that
                connects verified blood donors, healthcare professionals and
                patients through one secure system.
              </p>

              <div className="space-y-6 mt-10">

                <div className="flex gap-4">
                  <div className="text-green-600 text-2xl">✔</div>
                  <div>
                    <h3 className="font-bold text-lg">
                      Instant Donor Matching
                    </h3>
                    <p className="text-gray-600">
                      Find compatible donors within seconds.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-green-600 text-2xl">✔</div>
                  <div>
                    <h3 className="font-bold text-lg">
                      Secure Patient Records
                    </h3>
                    <p className="text-gray-600">
                      Protected information with secure authentication.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-green-600 text-2xl">✔</div>
                  <div>
                    <h3 className="font-bold text-lg">
                      Real-Time Communication
                    </h3>
                    <p className="text-gray-600">
                      Hospitals, donors and patients stay connected instantly.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            <div className="bg-slate-100 rounded-3xl p-10">

              <h3 className="text-3xl font-bold text-gray-900">
                LifeLink Impact
              </h3>

              <div className="space-y-8 mt-10">

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Emergency Response</span>
                    <span>95%</span>
                  </div>

                  <div className="h-3 bg-gray-300 rounded-full">
                    <div className="h-3 w-[95%] bg-blue-600 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Blood Availability</span>
                    <span>92%</span>
                  </div>

                  <div className="h-3 bg-gray-300 rounded-full">
                    <div className="h-3 w-[92%] bg-green-600 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Hospital Satisfaction</span>
                    <span>98%</span>
                  </div>

                  <div className="h-3 bg-gray-300 rounded-full">
                    <div className="h-3 w-[98%] bg-slate-700 rounded-full"></div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="py-24 bg-slate-900 text-white">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold">
            Together We Save Lives
          </h2>

          <p className="mt-6 text-xl text-slate-300">
            Join our growing network of hospitals, healthcare professionals,
            blood donors and volunteers working together to improve emergency
            healthcare across Kenya.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">

            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition">
              Partner With LifeLink
            </button>

            <button className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-slate-900 transition">
              Contact Our Team
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}