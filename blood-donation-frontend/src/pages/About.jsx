import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-slate-50">

      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-extrabold mb-6">
            About LifeLink
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-8">
            LifeLink is a modern blood donation management platform designed
            to connect blood donors, patients, hospitals, and healthcare
            professionals through one secure and reliable system.
          </p>

        </div>
      </section>

      {/* ================= OUR STORY ================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <span className="text-red-600 font-semibold uppercase tracking-wide">
              Our Story
            </span>

            <h2 className="text-4xl font-bold text-slate-800 mt-4">
              Connecting Communities Through Blood Donation
            </h2>

            <p className="mt-8 text-gray-600 leading-8 text-lg">
              LifeLink was created to simplify the process of blood donation
              by bringing together donors, patients, hospitals and medical
              professionals on one easy-to-use platform.
            </p>

            <p className="mt-6 text-gray-600 leading-8 text-lg">
              During emergencies, every second matters. Our system helps
              hospitals locate suitable donors quickly while allowing donors
              to respond to blood requests efficiently and securely.
            </p>

            <p className="mt-6 text-gray-600 leading-8 text-lg">
              Through innovation and technology, LifeLink aims to increase
              voluntary blood donations and improve access to life-saving
              blood across communities.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-slate-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">

              <div className="text-5xl mb-4">🩸</div>

              <h3 className="font-bold text-xl">
                Blood Donation
              </h3>

              <p className="mt-3 text-gray-600">
                Encouraging safe and voluntary blood donation.
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">

              <div className="text-5xl mb-4">🏥</div>

              <h3 className="font-bold text-xl">
                Hospitals
              </h3>

              <p className="mt-3 text-gray-600">
                Supporting healthcare facilities with rapid donor matching.
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">

              <div className="text-5xl mb-4">🤝</div>

              <h3 className="font-bold text-xl">
                Community
              </h3>

              <p className="mt-3 text-gray-600">
                Building stronger communities through lifesaving donations.
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">

              <div className="text-5xl mb-4">❤️</div>

              <h3 className="font-bold text-xl">
                Save Lives
              </h3>

              <p className="mt-3 text-gray-600">
                Every donation can save up to three lives.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= MISSION & VISION ================= */}

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl shadow-md p-10">

            <div className="text-5xl mb-6">🎯</div>

            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-8">
              To create an efficient, secure and reliable blood donation
              management system that connects donors, patients and hospitals
              while ensuring timely access to safe blood during emergencies.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-10">

            <div className="text-5xl mb-6">🌍</div>

            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              Our Vision
            </h2>

            <p className="text-gray-600 leading-8">
              To become the leading digital platform for blood donation,
              promoting voluntary donations and ensuring that no life is
              lost because blood is unavailable.
            </p>

          </div>

        </div>

      </section>

      {/* ================= VALUES ================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-4xl font-bold text-slate-800">
              Our Core Values
            </h2>

            <p className="text-gray-600 mt-4 text-lg">
              Everything we do is guided by these principles.
            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              {
                icon: "🔒",
                title: "Integrity",
                text: "We maintain honesty, transparency and trust.",
              },
              {
                icon: "⚡",
                title: "Efficiency",
                text: "Quick response during emergencies.",
              },
              {
                icon: "🤝",
                title: "Collaboration",
                text: "Working together with hospitals and donors.",
              },
              {
                icon: "❤️",
                title: "Compassion",
                text: "Every life matters and deserves another chance.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition text-center"
              >
                <div className="text-5xl mb-5">{item.icon}</div>

                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.text}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="bg-slate-900 text-white py-24">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold">
            Join LifeLink Today
          </h2>

          <p className="mt-6 text-slate-300 text-lg">
            Together we can build a stronger community by making blood
            donation easier, safer and faster.
          </p>

          <div className="mt-10 flex justify-center gap-5 flex-wrap">

            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold transition"
            >
              Register Now
            </Link>

            <Link
              to="/login"
              className="border border-gray-400 hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl transition"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default About;