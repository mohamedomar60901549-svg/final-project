import { Link } from "react-router-dom";

const stats = [
  {
    icon: "👥",
    value: "500+",
    title: "Registered Donors",
  },
  {
    icon: "🩸",
    value: "120+",
    title: "Blood Requests",
  },
  {
    icon: "❤️",
    value: "350+",
    title: "Lives Saved",
  },
  {
    icon: "🏥",
    value: "25+",
    title: "Partner Hospitals",
  },
];

const services = [
  {
    icon: "🩸",
    title: "Blood Donation",
    description:
      "Register as a donor and help save lives whenever emergency blood is needed.",
  },
  {
    icon: "🚑",
    title: "Emergency Requests",
    description:
      "Patients can submit urgent blood requests and notify compatible donors instantly.",
  },
  {
    icon: "🔍",
    title: "Find Donors",
    description:
      "Search donors by blood group, county, availability, and location.",
  },
  {
    icon: "🏥",
    title: "Hospital Network",
    description:
      "Hospitals coordinate emergency blood supplies through one secure platform.",
  },
  {
    icon: "👨‍⚕️",
    title: "Medical Professionals",
    description:
      "Healthcare workers verify requests and ensure safe blood donation.",
  },
  {
    icon: "📊",
    title: "Donation Records",
    description:
      "Track donation history, requests, reports and donor activity.",
  },
];

const benefits = [
  {
    icon: "❤️",
    title: "Save Lives",
    text: "One blood donation can save up to three lives.",
  },
  {
    icon: "⚡",
    title: "Emergency Support",
    text: "Blood is always needed for surgeries and accidents.",
  },
  {
    icon: "🤝",
    title: "Community Impact",
    text: "Help families and strengthen your local community.",
  },
  {
    icon: "🌍",
    title: "Give Hope",
    text: "Become part of a nationwide lifesaving movement.",
  },
];

function Home() {
  return (
    <div className="bg-gray-50">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-r from-red-800 via-red-700 to-red-600 text-white">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1600')",
          }}
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-block bg-white/20 px-5 py-2 rounded-full backdrop-blur">
              ❤️ Every Drop Counts
            </span>

            <h1 className="text-5xl lg:text-7xl font-black mt-8 leading-tight">
              Donate Blood.
              <br />
              Save Lives.
            </h1>

            <p className="mt-8 text-red-100 text-lg leading-8">
              LifeLink is an intelligent blood donation management platform
              connecting blood donors, hospitals and patients across Kenya.
              Our goal is to ensure that no life is lost because blood cannot
              be found in time.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/register"
                className="bg-white text-red-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
              >
                Become a Donor
              </Link>

              <Link
                to="/register"
                className="border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-red-700 transition"
              >
                Request Blood
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="bg-white rounded-3xl shadow-2xl p-10">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Emergency Blood Dashboard
            </h2>

            <div className="space-y-6">

              {stats.map((item) => (

                <div
                  key={item.title}
                  className="flex justify-between border-b pb-4"
                >
                  <span className="text-gray-600">
                    {item.title}
                  </span>

                  <span className="font-bold text-red-600">
                    {item.value}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

            {/* ================= STATISTICS ================= */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {stats.map((item) => (

              <div
                key={item.title}
                className="bg-red-50 rounded-3xl shadow-md hover:shadow-xl transition p-8 text-center"
              >

                <div className="text-5xl mb-5">
                  {item.icon}
                </div>

                <h2 className="text-4xl font-extrabold text-red-600">
                  {item.value}
                </h2>

                <p className="mt-3 text-gray-600 font-medium">
                  {item.title}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section className="py-24 bg-gray-100">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* IMAGE */}

          <div>

            <img
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1200"
              alt="Blood Donation"
              className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
            />

          </div>

          {/* CONTENT */}

          <div>

            <span className="uppercase tracking-widest text-red-600 font-semibold">
              About LifeLink
            </span>

            <h2 className="text-5xl font-black text-gray-800 mt-5 leading-tight">
              Connecting Blood Donors
              <br />
              With Those In Need
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-600">

              LifeLink is a modern blood donation management platform
              designed to reduce delays in finding compatible blood donors
              during emergencies.

            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">

              The platform connects hospitals, patients, donors and
              healthcare professionals through one secure system that
              improves communication, donor availability and emergency
              response across Kenya.

            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-10">

              <div className="bg-white rounded-2xl shadow-lg p-6">

                <div className="text-4xl mb-4">
                  🚑
                </div>

                <h3 className="font-bold text-xl">
                  Emergency Response
                </h3>

                <p className="text-gray-600 mt-3">
                  Quickly locate compatible blood donors during emergencies.
                </p>

              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">

                <div className="text-4xl mb-4">
                  🔒
                </div>

                <h3 className="font-bold text-xl">
                  Secure Platform
                </h3>

                <p className="text-gray-600 mt-3">
                  Safe user authentication and protected medical records.
                </p>

              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">

                <div className="text-4xl mb-4">
                  🏥
                </div>

                <h3 className="font-bold text-xl">
                  Hospital Network
                </h3>

                <p className="text-gray-600 mt-3">
                  Partner hospitals coordinate emergency blood supplies.
                </p>

              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">

                <div className="text-4xl mb-4">
                  ❤️
                </div>

                <h3 className="font-bold text-xl">
                  Save Lives
                </h3>

                <p className="text-gray-600 mt-3">
                  Every donation has the potential to save up to three lives.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

            {/* ================= SERVICES ================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-block bg-red-100 text-red-700 px-5 py-2 rounded-full font-semibold uppercase tracking-wider">
              Our Services
            </span>

            <h2 className="text-5xl font-black text-gray-800 mt-6">
              Everything You Need
              <br />
              In One Platform
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-8">
              LifeLink brings blood donors, patients, hospitals and healthcare
              professionals together through one secure and intelligent
              platform for faster emergency response.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {services.map((service) => (

              <div
                key={service.title}
                className="group bg-gray-50 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >

                <div className="w-20 h-20 rounded-2xl bg-red-600 text-white flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition">

                  {service.icon}

                </div>

                <h3 className="text-2xl font-bold text-gray-800">

                  {service.title}

                </h3>

                <p className="mt-5 text-gray-600 leading-8">

                  {service.description}

                </p>

                <div className="mt-8">

                  <Link
                    to="/register"
                    className="inline-flex items-center text-red-600 font-bold hover:text-red-800 transition"
                  >
                    Learn More
                    <span className="ml-2">→</span>
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= WHY DONATE ================= */}

      <section className="py-24 bg-gradient-to-br from-red-50 to-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-block bg-red-100 text-red-700 px-5 py-2 rounded-full font-semibold uppercase tracking-wider">
              Why Donate?
            </span>

            <h2 className="text-5xl font-black text-gray-800 mt-6">
              Your Donation Saves Lives
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Every blood donation provides hope for patients undergoing
              surgery, cancer treatment, childbirth complications and
              emergency care.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {benefits.map((item) => (

              <div
                key={item.title}
                className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition"
              >

                <div className="w-20 h-20 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center text-4xl mb-6">

                  {item.icon}

                </div>

                <h3 className="text-2xl font-bold text-gray-800">

                  {item.title}

                </h3>

                <p className="mt-5 text-gray-600 leading-7">

                  {item.text}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

            {/* ================= HOW IT WORKS ================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-block bg-red-100 text-red-700 px-5 py-2 rounded-full font-semibold uppercase tracking-wider">
              How LifeLink Works
            </span>

            <h2 className="text-5xl font-black text-gray-800 mt-6">
              Four Easy Steps
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform makes blood donation and emergency blood requests
              simple, secure and efficient.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                number: "01",
                title: "Create Account",
                icon: "📝",
                text: "Register as a donor, patient or hospital using your personal information.",
              },
              {
                number: "02",
                title: "Verification",
                icon: "✅",
                text: "Complete profile verification and provide your blood group information.",
              },
              {
                number: "03",
                title: "Donate / Request",
                icon: "🩸",
                text: "Donate blood or submit an emergency blood request through LifeLink.",
              },
              {
                number: "04",
                title: "Save Lives",
                icon: "❤️",
                text: "Compatible donors are matched quickly, helping save lives during emergencies.",
              },
            ].map((step) => (

              <div
                key={step.number}
                className="relative bg-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
              >

                <div className="absolute top-6 right-6 text-5xl font-black text-red-100">
                  {step.number}
                </div>

                <div className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center text-4xl mb-6">
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-800">
                  {step.title}
                </h3>

                <p className="mt-5 text-gray-600 leading-8">
                  {step.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= BLOOD COMPATIBILITY ================= */}

      <section className="py-24 bg-red-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-block bg-white text-red-700 px-5 py-2 rounded-full font-semibold uppercase tracking-wider shadow">
              Blood Compatibility
            </span>

            <h2 className="text-5xl font-black text-gray-800 mt-6">
              Know Your Blood Type
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding blood compatibility helps ensure safe blood
              transfusions and effective emergency response.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full bg-white rounded-3xl overflow-hidden shadow-xl">

              <thead className="bg-red-700 text-white">

                <tr>

                  <th className="p-5 text-left">
                    Blood Type
                  </th>

                  <th className="p-5 text-left">
                    Can Receive From
                  </th>

                  <th className="p-5 text-left">
                    Can Donate To
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  ["A+", "A+, A-, O+, O-", "A+, AB+"],
                  ["A-", "A-, O-", "A+, A-, AB+, AB-"],
                  ["B+", "B+, B-, O+, O-", "B+, AB+"],
                  ["B-", "B-, O-", "B+, B-, AB+, AB-"],
                  ["AB+", "All Blood Types", "AB+"],
                  ["AB-", "AB-, A-, B-, O-", "AB+, AB-"],
                  ["O+", "O+, O-", "O+, A+, B+, AB+"],
                  ["O-", "O-", "Everyone"],
                ].map((blood) => (

                  <tr
                    key={blood[0]}
                    className="border-b hover:bg-red-50 transition"
                  >

                    <td className="p-5">

                      <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                        {blood[0]}
                      </span>

                    </td>

                    <td className="p-5 text-gray-700">
                      {blood[1]}
                    </td>

                    <td className="p-5 text-gray-700">
                      {blood[2]}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>

            {/* ================= PARTNER HOSPITALS ================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-block bg-red-100 text-red-700 px-5 py-2 rounded-full font-semibold uppercase tracking-wider">
              Partner Hospitals
            </span>

            <h2 className="text-5xl font-black text-gray-800 mt-6">
              Trusted Healthcare Partners
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              LifeLink works closely with referral hospitals across Kenya to
              improve emergency blood availability and provide faster access
              to lifesaving transfusion services.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                name: "Kenyatta National Hospital",
                location: "Nairobi",
              },
              {
                name: "Moi Teaching & Referral Hospital",
                location: "Eldoret",
              },
              {
                name: "Aga Khan University Hospital",
                location: "Nairobi",
              },
              {
                name: "The Nairobi Hospital",
                location: "Nairobi",
              },
              {
                name: "Coast General Teaching & Referral Hospital",
                location: "Mombasa",
              },
              {
                name: "Garissa County Referral Hospital",
                location: "Garissa",
              },
            ].map((hospital) => (

              <div
                key={hospital.name}
                className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
              >

                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900"
                  alt={hospital.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-8">

                  <div className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    🏥 Partner Hospital
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800">
                    {hospital.name}
                  </h3>

                  <p className="mt-3 text-red-600 font-semibold">
                    📍 {hospital.location}, Kenya
                  </p>

                  <p className="mt-5 text-gray-600 leading-7">
                    Providing emergency blood transfusion services,
                    laboratory testing, donor coordination and critical
                    healthcare support through the LifeLink platform.
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= MEDICAL TEAM ================= */}

      <section className="py-24 bg-gray-100">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-block bg-red-100 text-red-700 px-5 py-2 rounded-full font-semibold uppercase tracking-wider">
              Healthcare Professionals
            </span>

            <h2 className="text-5xl font-black text-gray-800 mt-6">
              Experts Behind Every Donation
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Every successful blood donation is supported by experienced
              healthcare professionals committed to patient safety and
              quality care.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                icon: "👨‍⚕️",
                title: "Doctors",
                description:
                  "Medical officers assess donor eligibility and supervise emergency transfusion procedures.",
              },
              {
                icon: "👩‍⚕️",
                title: "Nurses",
                description:
                  "Professional nurses ensure donors have a safe and comfortable donation experience.",
              },
              {
                icon: "🧪",
                title: "Laboratory Scientists",
                description:
                  "Blood samples undergo screening, testing and compatibility checks before transfusion.",
              },
            ].map((member) => (

              <div
                key={member.title}
                className="bg-white rounded-3xl shadow-lg p-10 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >

                <div className="w-24 h-24 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center text-5xl mb-8">

                  {member.icon}

                </div>

                <h3 className="text-3xl font-bold text-gray-800">
                  {member.title}
                </h3>

                <p className="mt-6 text-gray-600 leading-8">
                  {member.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

            {/* ================= TESTIMONIALS ================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-block bg-red-100 text-red-700 px-5 py-2 rounded-full font-semibold uppercase tracking-wider">
              Testimonials
            </span>

            <h2 className="text-5xl font-black text-gray-800 mt-6">
              Stories That Inspire
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from people whose lives have been transformed through
              blood donation and the LifeLink platform.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                name: "Ahmed Hassan",
                role: "Blood Donor",
                icon: "🩸",
                text: "LifeLink made donating blood simple and organized. Knowing I helped save someone's life is an unforgettable feeling.",
              },
              {
                name: "Fatuma Ali",
                role: "Blood Recipient",
                icon: "❤️",
                text: "When my family urgently needed blood, compatible donors were found quickly through LifeLink. We are forever grateful.",
              },
              {
                name: "Dr. John Mwangi",
                role: "Medical Officer",
                icon: "🏥",
                text: "LifeLink has greatly improved coordination between hospitals and volunteer blood donors during emergencies.",
              },
            ].map((person) => (

              <div
                key={person.name}
                className="bg-gray-50 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition"
              >

                <div className="text-6xl mb-6">
                  {person.icon}
                </div>

                <p className="italic text-gray-600 leading-8">
                  "{person.text}"
                </p>

                <hr className="my-6" />

                <h3 className="text-2xl font-bold text-gray-800">
                  {person.name}
                </h3>

                <p className="text-red-600 font-semibold">
                  {person.role}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= FAQ ================= */}

      <section className="py-24 bg-gray-100">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-block bg-red-100 text-red-700 px-5 py-2 rounded-full font-semibold uppercase tracking-wider">
              Frequently Asked Questions
            </span>

            <h2 className="text-5xl font-black text-gray-800 mt-6">
              Common Questions
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {[
              {
                q: "Who can donate blood?",
                a: "Healthy adults aged 18–65 years who meet medical requirements can donate blood.",
              },
              {
                q: "Is blood donation safe?",
                a: "Yes. Every donation uses sterile, single-use equipment under professional medical supervision.",
              },
              {
                q: "How often can I donate?",
                a: "Most healthy adults can donate whole blood every 3 months, subject to medical advice.",
              },
              {
                q: "How does LifeLink work?",
                a: "LifeLink connects patients, hospitals and donors to quickly locate compatible blood during emergencies.",
              },
            ].map((faq) => (

              <div
                key={faq.q}
                className="bg-white rounded-2xl shadow-lg p-8"
              >

                <h3 className="text-xl font-bold text-gray-800">
                  {faq.q}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {faq.a}
                </p>

              </div>

            ))}

          </div>

          <div className="text-center mt-12">

            <Link
              to="/faq"
              className="inline-flex bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition"
            >
              View All FAQs
            </Link>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="relative overflow-hidden bg-gradient-to-r from-red-800 via-red-700 to-red-600 text-white py-24">

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-5xl font-black">
            Become Someone's Hero Today
          </h2>

          <p className="mt-8 text-xl text-red-100 leading-8 max-w-3xl mx-auto">
            Every blood donation gives hope to patients fighting for their
            lives. Join LifeLink today and become part of Kenya's growing
            community of lifesavers.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              to="/register"
              className="bg-white text-red-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              Become a Donor
            </Link>

            <Link
              to="/login"
              className="border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-red-700 transition"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;