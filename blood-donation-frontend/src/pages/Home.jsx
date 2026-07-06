import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-50">

      {/* ================= HERO SECTION ================= */}

      <section
        id="home"
        className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}

          <div>

            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              ❤️ Every Drop Counts
            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold mt-6 leading-tight">
              Donate Blood,
              <br />
              Save Lives.
            </h1>

            <p className="mt-6 text-lg text-red-100 leading-8">
              LifeLink is a smart blood donation management platform that
              connects donors, patients, hospitals and healthcare
              professionals to ensure blood reaches those who need it
              quickly during emergencies.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to="/register"
                className="bg-white text-red-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition"
              >
                Become a Donor
              </Link>

              <Link
                to="/register"
                className="border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-red-600 transition"
              >
                Request Blood
              </Link>

            </div>

          </div>

          {/* Right Content */}

          <div className="relative">

            <div className="bg-white rounded-3xl shadow-2xl p-8">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Emergency Blood Support
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-600">
                    Registered Donors
                  </span>

                  <span className="font-bold text-red-600">
                    500+
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-600">
                    Partner Hospitals
                  </span>

                  <span className="font-bold text-red-600">
                    25+
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-600">
                    Emergency Requests
                  </span>

                  <span className="font-bold text-red-600">
                    120+
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Lives Saved
                  </span>

                  <span className="font-bold text-green-600">
                    350+
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= STATISTICS ================= */}

      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-red-50 rounded-2xl p-8 text-center shadow">

              <div className="text-5xl mb-4">
                👥
              </div>

              <h2 className="text-4xl font-bold text-red-600">
                500+
              </h2>

              <p className="mt-2 text-gray-600">
                Registered Donors
              </p>

            </div>

            <div className="bg-red-50 rounded-2xl p-8 text-center shadow">

              <div className="text-5xl mb-4">
                🩸
              </div>

              <h2 className="text-4xl font-bold text-red-600">
                120+
              </h2>

              <p className="mt-2 text-gray-600">
                Blood Requests
              </p>

            </div>

            <div className="bg-red-50 rounded-2xl p-8 text-center shadow">

              <div className="text-5xl mb-4">
                ❤️
              </div>

              <h2 className="text-4xl font-bold text-red-600">
                350+
              </h2>

              <p className="mt-2 text-gray-600">
                Lives Saved
              </p>

            </div>

            <div className="bg-red-50 rounded-2xl p-8 text-center shadow">

              <div className="text-5xl mb-4">
                🏥
              </div>

              <h2 className="text-4xl font-bold text-red-600">
                25+
              </h2>

              <p className="mt-2 text-gray-600">
                Partner Hospitals
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="py-24 bg-gray-100"
      >

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

          <div>

            <span className="text-red-600 font-semibold uppercase tracking-wider">
              About LifeLink
            </span>

            <h2 className="text-5xl font-bold text-gray-800 mt-4">
              Connecting Communities Through Blood Donation
            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-8">
              LifeLink is a modern blood donation management system designed
              to connect blood donors, patients, hospitals, and healthcare
              professionals on one secure platform.
            </p>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Whether someone needs emergency blood or wants to become a
              voluntary donor, LifeLink makes the entire process faster,
              easier, and more reliable while promoting a culture of saving
              lives through voluntary blood donation.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <div className="text-5xl mb-4">
                🚑
              </div>

              <h3 className="font-bold text-xl">
                Emergency Response
              </h3>

              <p className="text-gray-600 mt-3">
                Quick matching of blood donors during emergencies.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <div className="text-5xl mb-4">
                🔒
              </div>

              <h3 className="font-bold text-xl">
                Secure Platform
              </h3>

              <p className="text-gray-600 mt-3">
                Protected accounts and verified healthcare information.
              </p>

            </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <div className="text-5xl mb-4">
                🏥
              </div>

              <h3 className="font-bold text-xl">
                Hospital Network
              </h3>

              <p className="text-gray-600 mt-3">
                Partner hospitals work together to improve emergency blood
                availability.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <div className="text-5xl mb-4">
                ❤️
              </div>

              <h3 className="font-bold text-xl">
                Save Lives
              </h3>

              <p className="text-gray-600 mt-3">
                Every blood donation has the potential to save up to three
                lives.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= SERVICES ================= */}

      <section
        id="services"
        className="py-24 bg-white"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-red-600 font-semibold uppercase">
              Our Services
            </span>

            <h2 className="text-5xl font-bold text-gray-800 mt-4">
              Everything You Need in One Platform
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              LifeLink simplifies blood donation by bringing donors,
              patients, hospitals and healthcare professionals together
              through one secure platform.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-gray-50 rounded-2xl shadow hover:shadow-xl transition p-8">

              <div className="text-5xl mb-5">
                🩸
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Blood Donation
              </h3>

              <p className="text-gray-600 leading-7">
                Register as a donor and help patients receive life-saving
                blood whenever emergencies occur.
              </p>

            </div>

            <div className="bg-gray-50 rounded-2xl shadow hover:shadow-xl transition p-8">

              <div className="text-5xl mb-5">
                🚑
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Emergency Requests
              </h3>

              <p className="text-gray-600 leading-7">
                Patients can quickly submit blood requests and notify nearby
                compatible donors.
              </p>

            </div>

            <div className="bg-gray-50 rounded-2xl shadow hover:shadow-xl transition p-8">

              <div className="text-5xl mb-5">
                🔍
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Find Donors
              </h3>

              <p className="text-gray-600 leading-7">
                Search available blood donors by blood group, location and
                availability status.
              </p>

            </div>

            <div className="bg-gray-50 rounded-2xl shadow hover:shadow-xl transition p-8">

              <div className="text-5xl mb-5">
                🏥
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Hospital Support
              </h3>

              <p className="text-gray-600 leading-7">
                Hospitals coordinate with donors and patients to improve
                emergency response times.
              </p>

            </div>

            <div className="bg-gray-50 rounded-2xl shadow hover:shadow-xl transition p-8">

              <div className="text-5xl mb-5">
                👨‍⚕️
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Medical Professionals
              </h3>

              <p className="text-gray-600 leading-7">
                Doctors and healthcare workers verify requests and ensure
                safe blood donation procedures.
              </p>

            </div>

            <div className="bg-gray-50 rounded-2xl shadow hover:shadow-xl transition p-8">

              <div className="text-5xl mb-5">
                📊
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Donation History
              </h3>

              <p className="text-gray-600 leading-7">
                Keep track of donations, requests, reports and donor
                activities in one secure system.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= WHY DONATE ================= */}

      <section className="py-24 bg-red-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-red-600 font-semibold uppercase">
              Why Donate Blood?
            </span>

            <h2 className="text-5xl font-bold text-gray-800 mt-4">
              Your Donation Makes a Difference
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white rounded-2xl shadow p-8 text-center">

              <div className="text-5xl mb-5">❤️</div>

              <h3 className="font-bold text-xl mb-3">
                Save Lives
              </h3>

              <p className="text-gray-600">
                One donation can save up to three lives.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-8 text-center">

              <div className="text-5xl mb-5">⚡</div>

              <h3 className="font-bold text-xl mb-3">
                Emergency Help
              </h3>

              <p className="text-gray-600">
                Blood is needed every day for accidents and surgeries.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-8 text-center">

              <div className="text-5xl mb-5">🤝</div>

              <h3 className="font-bold text-xl mb-3">
                Community Support
              </h3>

              <p className="text-gray-600">
                Strengthen your community by helping people in need.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-8 text-center">

              <div className="text-5xl mb-5">🌍</div>

              <h3 className="font-bold text-xl mb-3">
                Give Hope
              </h3>

              <p className="text-gray-600">
                Every donation offers another person a second chance at life.
              </p>

            </div>

          </div>

        </div>

      </section>
            {/* ================= HOW IT WORKS ================= */}

      <section
        id="how-it-works"
        className="py-24 bg-white"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-red-600 font-semibold uppercase">
              How It Works
            </span>

            <h2 className="text-5xl font-bold text-gray-800 mt-4">
              Donate Blood in Four Simple Steps
            </h2>

            <p className="mt-6 text-lg text-gray-600">
              LifeLink makes blood donation easy, secure and fast.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-gray-50 rounded-2xl shadow-lg p-8 text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center text-4xl mb-6">
                1
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Register
              </h3>

              <p className="text-gray-600">
                Create your LifeLink account as a donor or patient.
              </p>

            </div>

            <div className="bg-gray-50 rounded-2xl shadow-lg p-8 text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center text-4xl mb-6">
                2
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Get Verified
              </h3>

              <p className="text-gray-600">
                Complete your profile with accurate medical information.
              </p>

            </div>

            <div className="bg-gray-50 rounded-2xl shadow-lg p-8 text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center text-4xl mb-6">
                3
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Donate or Request
              </h3>

              <p className="text-gray-600">
                Donors donate blood while patients submit emergency requests.
              </p>

            </div>

            <div className="bg-gray-50 rounded-2xl shadow-lg p-8 text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center text-4xl mb-6">
                4
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Save Lives
              </h3>

              <p className="text-gray-600">
                Every successful donation helps save lives and strengthen communities.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= BLOOD COMPATIBILITY ================= */}

      <section className="py-24 bg-red-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-red-600 font-semibold uppercase">
              Blood Compatibility
            </span>

            <h2 className="text-5xl font-bold text-gray-800 mt-4">
              Know Your Blood Type
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                type: "A+",
                receive: "A+, A-, O+, O-",
                donate: "A+, AB+",
              },
              {
                type: "A-",
                receive: "A-, O-",
                donate: "A-, AB-",
              },
              {
                type: "B+",
                receive: "B+, B-, O+, O-",
                donate: "B+, AB+",
              },
              {
                type: "B-",
                receive: "B-, O-",
                donate: "B-, AB-",
              },
              {
                type: "AB+",
                receive: "All Blood Types",
                donate: "AB+",
              },
              {
                type: "AB-",
                receive: "AB-, A-, B-, O-",
                donate: "AB-, A-, B-, O-",
              },
              {
                type: "O+",
                receive: "O+, O-",
                donate: "O+, A+, B+, AB+",
              },
              {
                type: "O-",
                receive: "O-",
                donate: "Everyone",
              },
            ].map((blood) => (

              <div
                key={blood.type}
                className="bg-white rounded-2xl shadow-lg p-8"
              >

                <div className="text-center">

                  <div className="w-24 h-24 rounded-full bg-red-600 text-white mx-auto flex items-center justify-center text-4xl font-bold mb-6">
                    {blood.type}
                  </div>

                  <h3 className="text-xl font-bold mb-4">
                    Receive From
                  </h3>

                  <p className="text-gray-600">
                    {blood.receive}
                  </p>

                  <hr className="my-6" />

                  <h3 className="text-xl font-bold mb-4">
                    Donate To
                  </h3>

                  <p className="text-gray-600">
                    {blood.donate}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= PARTNER HOSPITALS ================= */}

      <section
        id="hospitals"
        className="py-24 bg-white"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-red-600 font-semibold uppercase">
              Partner Hospitals
            </span>

            <h2 className="text-5xl font-bold text-gray-800 mt-4">
              Supporting Emergency Healthcare
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              "Kenyatta National Hospital",
              "The Nairobi Hospital",
              "Aga Khan University Hospital",
              "Moi Teaching & Referral Hospital",
              "Coast General Teaching & Referral Hospital",
              "Garissa County Referral Hospital",
            ].map((hospital) => (

              <div
                key={hospital}
                className="bg-gray-50 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition"
              >

                <div className="text-5xl mb-5">
                  🏥
                </div>

                <h3 className="text-2xl font-bold">
                  {hospital}
                </h3>

                <p className="mt-4 text-gray-600">
                  Emergency blood services, laboratory support and donor
                  coordination through the LifeLink platform.
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= MEDICAL TEAM ================= */}

      <section className="py-24 bg-gray-100">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-red-600 font-semibold uppercase">
              Medical Professionals
            </span>

            <h2 className="text-5xl font-bold text-gray-800 mt-4">
              Healthcare Experts Behind Every Donation
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <div className="text-6xl mb-6">
                👨‍⚕️
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Doctors
              </h3>

              <p className="text-gray-600">
                Medical professionals verify donor eligibility and oversee
                emergency blood requests.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <div className="text-6xl mb-6">
                👩‍⚕️
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Nurses
              </h3>

              <p className="text-gray-600">
                Experienced nurses ensure every donation is safe and follows
                medical guidelines.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <div className="text-6xl mb-6">
                🧪
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Laboratory Team
              </h3>

              <p className="text-gray-600">
                Blood samples are screened and tested to guarantee quality
                and compatibility before use.
              </p>

            </div>

          </div>

        </div>

      </section>

            {/* ================= TESTIMONIALS ================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-red-600 font-semibold uppercase">
              Testimonials
            </span>

            <h2 className="text-5xl font-bold text-gray-800 mt-4">
              Stories That Inspire
            </h2>

            <p className="mt-6 text-lg text-gray-600">
              Hear from donors and patients whose lives have been impacted
              through blood donation.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-gray-50 rounded-2xl shadow-lg p-8">

              <div className="text-5xl mb-5">🩸</div>

              <p className="italic text-gray-600 leading-7">
                "Donating blood through LifeLink was simple and organized.
                Knowing I helped save someone's life is priceless."
              </p>

              <h3 className="mt-6 text-xl font-bold">
                Ahmed Hassan
              </h3>

              <p className="text-red-600">
                Regular Blood Donor
              </p>

            </div>

            <div className="bg-gray-50 rounded-2xl shadow-lg p-8">

              <div className="text-5xl mb-5">❤️</div>

              <p className="italic text-gray-600 leading-7">
                "My family quickly found compatible blood during an emergency.
                LifeLink truly made the difference."
              </p>

              <h3 className="mt-6 text-xl font-bold">
                Fatuma Ali
              </h3>

              <p className="text-red-600">
                Patient
              </p>

            </div>

            <div className="bg-gray-50 rounded-2xl shadow-lg p-8">

              <div className="text-5xl mb-5">🏥</div>

              <p className="italic text-gray-600 leading-7">
                "The platform helps hospitals coordinate with donors much
                faster than traditional methods."
              </p>

              <h3 className="mt-6 text-xl font-bold">
                Dr. John Mwangi
              </h3>

              <p className="text-red-600">
                Medical Officer
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FAQ ================= */}

      <section
        id="faq"
        className="py-24 bg-gray-100"
      >

        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-red-600 font-semibold uppercase">
              Frequently Asked Questions
            </span>

            <h2 className="text-5xl font-bold text-gray-800 mt-4">
              Everything You Need to Know
            </h2>

          </div>

          <div className="space-y-6">

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-xl">
                Who can donate blood?
              </h3>

              <p className="mt-3 text-gray-600">
                Healthy adults who meet medical requirements can donate blood.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-xl">
                Is donating blood safe?
              </h3>

              <p className="mt-3 text-gray-600">
                Yes. Sterile, single-use equipment is used for every donor.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-xl">
                How often can I donate?
              </h3>

              <p className="mt-3 text-gray-600">
                Most healthy adults can donate whole blood every 8–12 weeks,
                depending on local medical guidelines.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-xl">
                How does LifeLink help?
              </h3>

              <p className="mt-3 text-gray-600">
                LifeLink connects patients, donors and hospitals to speed up
                emergency blood matching and improve response time.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= CALL TO ACTION ================= */}

      <section className="bg-red-700 text-white py-24">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold">
            Become Someone's Hero Today
          </h2>

          <p className="text-xl mt-6 text-red-100">
            Join thousands of volunteers helping save lives through blood
            donation.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              to="/register"
              className="bg-white text-red-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition"
            >
              Register Now
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