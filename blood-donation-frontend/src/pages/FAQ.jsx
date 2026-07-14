import { useState } from "react";
import { Link } from "react-router-dom";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: "Donor Eligibility",
      question: "Who can donate blood?",
      answer:
        "Healthy adults aged between 18 and 65 years, weighing at least 50 kg, and meeting the medical requirements can donate blood. Every donor undergoes a health assessment before donating."
    },
    {
      category: "Safety",
      question: "Is blood donation safe?",
      answer:
        "Yes. LifeLink works with licensed healthcare professionals and partner hospitals. Sterile, single-use equipment is used for every donation, making the process safe for both donors and recipients."
    },
    {
      category: "Donation",
      question: "How often can I donate blood?",
      answer:
        "Most healthy adults can donate whole blood every 12 to 16 weeks depending on national medical guidelines and individual health status."
    },
    {
      category: "Registration",
      question: "How do I become a donor?",
      answer:
        "Create a LifeLink account, verify your email, complete your profile with your blood group and location, then update your availability whenever you're ready to donate."
    },
    {
      category: "Emergency Requests",
      question: "How does LifeLink help patients?",
      answer:
        "Patients can submit emergency blood requests that are immediately visible to administrators and compatible donors, helping reduce delays during emergencies."
    },
    {
      category: "Matching",
      question: "How are donors matched?",
      answer:
        "LifeLink matches donors using blood group compatibility, location, availability, and request priority to improve response time."
    },
    {
      category: "Privacy",
      question: "Is my personal information secure?",
      answer:
        "Yes. User information is protected through secure authentication, encrypted communication, and controlled access within the LifeLink platform."
    },
    {
      category: "Hospitals",
      question: "Can hospitals use LifeLink?",
      answer:
        "Yes. Hospitals can manage blood requests, communicate with donors, monitor donations, and coordinate emergency responses through the platform."
    }
  ];

  const contacts = [
    {
      icon: "📞",
      title: "Phone",
      value: "+254 729 667 133"
    },
    {
      icon: "📧",
      title: "Email",
      value: "lifelink.bloodsystem@gmail.com"
    },
    {
      icon: "📍",
      title: "Location",
      value: "Garissa, Kenya"
    },
    {
      icon: "🕒",
      title: "Support",
      value: "24/7 Emergency Assistance"
    }
  ];

  return (
    <div className="bg-gray-50">

      {/* ================= HERO ================= */}

      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1615461066847-6116e61058f4?auto=format&fit=crop&w=1600&q=80')",
          }}
        />

        <div className="absolute inset-0 bg-slate-900/75" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">

          <span className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full font-semibold mb-6">
            Frequently Asked Questions
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Everything You Need To Know
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-8">
            Find answers to common questions about blood donation,
            emergency blood requests, donor registration,
            hospital collaboration, and LifeLink services.
          </p>

        </div>

      </section>

      {/* ================= CONTACT INFO ================= */}

      <section className="py-16 bg-white border-b">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {contacts.map((item) => (

              <div
                key={item.title}
                className="bg-gray-50 rounded-2xl p-6 shadow-sm border hover:shadow-lg transition duration-300"
              >

                <div className="text-4xl mb-4">
                  {item.icon}
                </div>

                <h3 className="font-bold text-lg text-gray-800">
                  {item.title}
                </h3>

                <p className="mt-2 text-gray-600">
                  {item.value}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= FAQ SECTION ================= */}

      <section className="py-24">

        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
              Common Questions
            </span>

            <h2 className="text-4xl font-bold text-gray-900 mt-6">
              Find Your Answer
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through the frequently asked questions below.
              Click any question to reveal its answer.
            </p>

          </div>

          <div className="space-y-5">

            {faqs.map((faq, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
              >

                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? -1 : index)
                  }
                  className="w-full flex justify-between items-center text-left px-6 py-5 hover:bg-gray-50 transition"
                >

                  <div>

                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {faq.category}
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-gray-800">
                      {faq.question}
                    </h3>

                  </div>

                  <div className="text-3xl text-red-600 font-bold">
                    {openIndex === index ? "−" : "+"}
                  </div>

                </button>

                {openIndex === index && (

                  <div className="px-6 pb-6">

                    <div className="border-t pt-5">

                      <p className="text-gray-600 leading-8">
                        {faq.answer}
                      </p>

                    </div>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      </section>

            {/* ================= QUICK FACTS ================= */}

      <section className="py-24 bg-slate-100">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-block bg-white px-4 py-2 rounded-full text-red-600 font-semibold shadow">
              LifeLink Overview
            </span>

            <h2 className="text-4xl font-bold text-gray-900 mt-6">
              Supporting Communities Through Blood Donation
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              LifeLink provides a modern platform that connects blood
              donors, patients, hospitals, and administrators,
              helping save lives through faster communication and
              efficient emergency response.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">

              <div className="text-5xl mb-4">
                👥
              </div>

              <h3 className="text-4xl font-bold text-blue-700">
                500+
              </h3>

              <p className="mt-3 text-gray-600">
                Registered Donors
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">

              <div className="text-5xl mb-4">
                🩸
              </div>

              <h3 className="text-4xl font-bold text-blue-700">
                120+
              </h3>

              <p className="mt-3 text-gray-600">
                Blood Requests
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">

              <div className="text-5xl mb-4">
                🏥
              </div>

              <h3 className="text-4xl font-bold text-blue-700">
                25+
              </h3>

              <p className="mt-3 text-gray-600">
                Partner Hospitals
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">

              <div className="text-5xl mb-4">
                🚑
              </div>

              <h3 className="text-4xl font-bold text-blue-700">
                24/7
              </h3>

              <p className="mt-3 text-gray-600">
                Emergency Support
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= NEED MORE HELP ================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
                Need More Help?
              </span>

              <h2 className="text-4xl font-bold text-gray-900 mt-6">
                Our Support Team Is Ready To Assist You
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-8">
                If you cannot find the answer you're looking for,
                don't worry. Our LifeLink support team is available
                to assist donors, patients, hospitals, healthcare
                professionals, and system administrators.
              </p>

              <div className="mt-10 space-y-6">

                <div className="flex items-start gap-4">

                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                    📞
                  </div>

                  <div>

                    <h3 className="font-bold text-xl text-gray-800">
                      Phone Support
                    </h3>

                    <p className="text-gray-600 mt-2">
                      +254 729 667 133
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-2xl">
                    📧
                  </div>

                  <div>

                    <h3 className="font-bold text-xl text-gray-800">
                      Email Support
                    </h3>

                    <p className="text-gray-600 mt-2">
                      lifelink.bloodsystem@gmail.com
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                    📍
                  </div>

                  <div>

                    <h3 className="font-bold text-xl text-gray-800">
                      Office Location
                    </h3>

                    <p className="text-gray-600 mt-2">
                      Garissa, Kenya
                    </p>

                  </div>

                </div>

              </div>

            </div>

            <div className="bg-slate-800 rounded-3xl p-10 text-white shadow-xl">

              <div className="text-6xl mb-6">
                ❤️
              </div>

              <h2 className="text-3xl font-bold">
                Every Donation Matters
              </h2>

              <p className="mt-6 text-gray-300 leading-8">
                A single blood donation can help save multiple lives.
                By becoming a donor through LifeLink, you become part
                of a growing community dedicated to saving lives every
                single day.
              </p>

              <div className="mt-10 space-y-4">

                <div className="flex items-center gap-3">
                  <span className="text-green-400">✔</span>
                  <span>Verified donor registration</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-400">✔</span>
                  <span>Real-time emergency requests</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-400">✔</span>
                  <span>Hospital collaboration</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-400">✔</span>
                  <span>Secure communication platform</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

            {/* ================= CTA ================= */}

      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-700 text-white py-24">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold mb-6">
            Join the LifeLink Community
          </span>

          <h2 className="text-5xl font-bold leading-tight">
            Together We Can Save More Lives
          </h2>

          <p className="mt-6 text-xl text-gray-200 leading-8 max-w-3xl mx-auto">
            Join LifeLink today and become part of a trusted community
            connecting blood donors, patients, hospitals, and healthcare
            professionals across Kenya.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">

            <Link
              to="/register"
              className="inline-flex items-center justify-center
                         bg-white
                         text-red-700
                         px-8
                         py-4
                         rounded-xl
                         font-bold
                         shadow-lg
                         hover:bg-gray-100
                         hover:shadow-2xl
                         transition-all
                         duration-300"
            >
              Become a Donor
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center
                         border-2
                         border-white
                         text-white
                         px-8
                         py-4
                         rounded-xl
                         font-bold
                         hover:bg-white
                         hover:text-slate-900
                         transition-all
                         duration-300"
            >
              Contact Support
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}