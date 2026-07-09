import { Link } from "react-router-dom";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Register as a donor, patient, hospital, or administrator by providing your basic personal information.",
      icon: "👤",
    },
    {
      number: "02",
      title: "Complete Your Profile",
      description:
        "Add your blood group, location, contact information, and medical details to help us serve you better.",
      icon: "📝",
    },
    {
      number: "03",
      title: "Donate or Request Blood",
      description:
        "Donors can make themselves available while patients can submit emergency blood requests instantly.",
      icon: "🩸",
    },
    {
      number: "04",
      title: "Save Lives Together",
      description:
        "LifeLink connects donors and patients quickly through hospitals for safe and reliable blood donation.",
      icon: "❤️",
    },
  ];

  const benefits = [
    {
      title: "Fast Emergency Response",
      description:
        "Patients receive assistance quickly through real-time donor matching.",
      icon: "🚑",
    },
    {
      title: "Verified Donors",
      description:
        "Every donor profile is verified before participating in blood donation.",
      icon: "✅",
    },
    {
      title: "Hospital Collaboration",
      description:
        "Hospitals coordinate directly with donors for safe blood collection.",
      icon: "🏥",
    },
    {
      title: "Privacy Protection",
      description:
        "Your personal information is securely protected within the platform.",
      icon: "🔒",
    },
    {
      title: "Location Matching",
      description:
        "Nearby compatible donors are identified automatically during emergencies.",
      icon: "📍",
    },
    {
      title: "Donation Records",
      description:
        "Keep track of all your previous donations and request history.",
      icon: "📊",
    },
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
    {
      question: "Who can donate blood?",
      answer:
        "Healthy adults meeting medical requirements can safely donate blood.",
    },
    {
      question: "Is blood donation safe?",
      answer:
        "Yes. All donations use sterile, single-use equipment following medical standards.",
    },
    {
      question: "How often can I donate?",
      answer:
        "Whole blood donation is generally allowed every 8 to 12 weeks depending on local medical guidelines.",
    },
    {
      question: "How does LifeLink help?",
      answer:
        "LifeLink connects donors, patients, and hospitals for faster emergency blood support.",
    },
  ];

  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}

      <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/75"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center text-white">

          <span className="inline-block bg-blue-600 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
            LifeLink Blood Donation System
          </span>

          <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight">
            How LifeLink Works
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-xl leading-9 text-slate-200">
            LifeLink simplifies blood donation by connecting donors,
            patients, hospitals, and healthcare professionals through one
            secure and intelligent platform designed to save lives faster.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition"
            >
              Register Now
            </Link>

            <Link
              to="/login"
              className="border border-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-semibold transition"
            >
              Login
            </Link>

          </div>

        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

          <div>

            <span className="text-blue-700 font-semibold uppercase tracking-widest">
              Our Process
            </span>

            <h2 className="mt-5 text-5xl font-bold text-slate-800 leading-tight">
              A Modern Blood Donation Experience
            </h2>

            <p className="mt-8 text-lg text-slate-600 leading-8">
              LifeLink makes blood donation simple, transparent, and
              efficient. Whether you are donating blood for the first time
              or requesting emergency blood, our platform guides you through
              every stage with safety and reliability.
            </p>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Every request is coordinated with verified donors and partner
              hospitals to ensure patients receive compatible blood as
              quickly as possible.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl shadow-md p-8 text-center border border-slate-200">
              <div className="text-5xl">🩸</div>
              <h3 className="mt-5 font-bold text-xl text-slate-800">
                Safe Donations
              </h3>
              <p className="mt-3 text-slate-600">
                Every donation follows medical safety standards.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-8 text-center border border-slate-200">
              <div className="text-5xl">🏥</div>
              <h3 className="mt-5 font-bold text-xl text-slate-800">
                Hospital Network
              </h3>
              <p className="mt-3 text-slate-600">
                Partner hospitals coordinate emergency donations.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-8 text-center border border-slate-200">
              <div className="text-5xl">⚡</div>
              <h3 className="mt-5 font-bold text-xl text-slate-800">
                Fast Matching
              </h3>
              <p className="mt-3 text-slate-600">
                Quickly locate compatible nearby donors.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-8 text-center border border-slate-200">
              <div className="text-5xl">❤️</div>
              <h3 className="mt-5 font-bold text-xl text-slate-800">
                Save Lives
              </h3>
              <p className="mt-3 text-slate-600">
                Every donation has the power to save multiple lives.
              </p>
            </div>

          </div>

        </div>

      </section>

              {/* ================= FOUR STEPS ================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-block bg-slate-200 text-slate-700 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest">
              Step by Step
            </span>

            <h2 className="mt-6 text-5xl font-bold text-slate-800">
              Four Simple Steps to Save Lives
            </h2>

            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600 leading-8">
              Our streamlined process ensures that blood donation and emergency
              requests are completed safely, efficiently, and professionally.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {steps.map((step) => (

              <div
                key={step.number}
                className="bg-white border border-slate-200 rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8 text-center"
              >

                <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>

                <div className="text-5xl mt-6">
                  {step.icon}
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-800">
                  {step.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-8">
                  {step.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= DONATION TIMELINE ================= */}

      <section className="py-24 bg-slate-50">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-20">

            <span className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest">
              Donation Journey
            </span>

            <h2 className="mt-6 text-5xl font-bold text-slate-800">
              Your Complete Journey
            </h2>

            <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-8">
              Every donation follows an organized process to ensure donor
              safety, blood quality, and timely delivery to patients.
            </p>

          </div>

          <div className="space-y-10">

            <div className="flex items-start gap-6">

              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl">
                👤
              </div>

              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 flex-1">

                <h3 className="text-2xl font-bold text-slate-800">
                  Account Registration
                </h3>

                <p className="mt-4 text-slate-600 leading-8">
                  Create your secure LifeLink account by providing your
                  personal information, contact details, and selecting your
                  user role.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-6">

              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-2xl">
                ✔
              </div>

              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 flex-1">

                <h3 className="text-2xl font-bold text-slate-800">
                  Medical Verification
                </h3>

                <p className="mt-4 text-slate-600 leading-8">
                  Your medical information is reviewed to determine donation
                  eligibility and ensure compliance with healthcare standards.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-6">

              <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center text-2xl">
                🩸
              </div>

              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 flex-1">

                <h3 className="text-2xl font-bold text-slate-800">
                  Blood Donation or Request
                </h3>

                <p className="mt-4 text-slate-600 leading-8">
                  Donors schedule blood donations while patients submit
                  emergency blood requests through the secure platform.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-6">

              <div className="w-16 h-16 rounded-full bg-violet-600 text-white flex items-center justify-center text-2xl">
                🏥
              </div>

              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 flex-1">

                <h3 className="text-2xl font-bold text-slate-800">
                  Hospital Processing
                </h3>

                <p className="mt-4 text-slate-600 leading-8">
                  Blood is collected, tested, stored safely, and prepared for
                  transfusion according to approved healthcare procedures.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-6">

              <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center text-2xl">
                ❤️
              </div>

              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 flex-1">

                <h3 className="text-2xl font-bold text-slate-800">
                  Life Saved
                </h3>

                <p className="mt-4 text-slate-600 leading-8">
                  Compatible blood reaches the patient safely, helping save
                  lives and strengthening healthcare support within the
                  community.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

              {/* ================= BENEFITS ================= */}

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-semibold">
              Platform Benefits
            </span>

            <h2 className="text-4xl font-bold text-slate-900 mt-6">
              Why Thousands Choose LifeLink
            </h2>

            <p className="text-slate-600 mt-4 max-w-3xl mx-auto">
              Our platform combines technology with healthcare to ensure
              blood reaches patients safely, quickly and efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {benefits.map((item) => (

              <div
                key={item.title}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-red-200 hover:shadow-xl transition"
              >

                <div className="text-5xl mb-5">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-slate-600 mt-4 leading-8">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* ================= FAQ ================= */}

      <section className="py-24 bg-slate-100">
        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-white text-slate-700 font-semibold shadow">
              Frequently Asked Questions
            </span>

            <h2 className="text-4xl font-bold text-slate-900 mt-6">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">

            {faqs.map((faq, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-8"
              >

                <h3 className="text-xl font-bold text-slate-900">
                  {faq.question}
                </h3>

                <p className="text-slate-600 mt-4 leading-8">
                  {faq.answer}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="py-24 bg-slate-900 text-white">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <span className="inline-block px-4 py-2 rounded-full bg-slate-700">
            Join Our Community
          </span>

          <h2 className="text-5xl font-bold mt-6">
            Ready to Become a Life Saver?
          </h2>

          <p className="text-slate-300 text-xl mt-6 max-w-3xl mx-auto leading-9">
            Every donation can save up to three lives. Join thousands of
            compassionate donors and help hospitals respond to emergencies
            faster than ever before.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">

            <Link
              to="/register"
              className="bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition"
            >
              Register Now
            </Link>

            <Link
              to="/login"
              className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-slate-900 transition"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

