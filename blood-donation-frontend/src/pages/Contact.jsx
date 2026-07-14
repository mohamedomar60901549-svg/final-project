import { useState } from "react";

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
    <div className="bg-gray-50">

      {/* ================= HERO SECTION ================= */}

      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">

        <div className="absolute inset-0 bg-black/40"></div>

        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1800')",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">

          <span className="inline-block px-5 py-2 bg-white/20 rounded-full text-sm font-semibold backdrop-blur">
            Contact LifeLink
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold">
            We're Here To Help
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-200 leading-9">
            Whether you are a donor, patient, hospital or healthcare
            professional, our team is ready to assist you with blood donation,
            emergency requests, account support and general inquiries.
          </p>

        </div>

      </section>

      {/* ================= CONTACT SECTION ================= */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/* LEFT SIDE */}

          <div>

            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Contact Information
            </span>

            <h2 className="mt-6 text-4xl font-bold text-gray-900">
              Let's Talk
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-9">
              LifeLink is committed to improving emergency blood donation and
              healthcare services across Kenya. Feel free to contact us for
              assistance, partnerships, technical support or any project
              inquiries.
            </p>

            <div className="mt-10 space-y-6">

              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-5">

                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center text-3xl">
                  📍
                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-900">
                    Office Location
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Garissa, Kenya
                  </p>

                </div>

              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-5">

                <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center text-3xl">
                  📧
                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-900">
                    Project Email
                  </h3>

                  <a
                    href="mailto:lifelink.bloodsystem@gmail.com"
                    className="mt-2 block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    lifelink.bloodsystem@gmail.com
                  </a>

                  <p className="mt-2 text-gray-500 text-sm">
                    Send us your questions, partnership requests or technical
                    support inquiries.
                  </p>

                </div>

              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-5">

                <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center text-3xl">
                  📞
                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-900">
                    Phone & WhatsApp
                  </h3>

                  <a
                    href="tel:+254729667133"
                    className="mt-2 block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    +254 729 667 133
                  </a>

                  <p className="mt-2 text-gray-500 text-sm">
                    Available Monday - Friday
                    <br />
                    8:00 AM - 5:00 PM (EAT)
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h2 className="text-3xl font-bold text-gray-900">
              Send Us a Message
            </h2>

            <p className="mt-4 text-gray-600">
              Complete the form below and choose whether to send it through
              Email or SMS.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >

                            <div>

                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />

              </div>

              <div>

                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />

              </div>

              <div>

                <label className="block text-gray-700 font-medium mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Message subject"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />

              </div>

              <div>

                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>

                <textarea
                  rows="6"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                ></textarea>

              </div>

              <div>

                <label className="block text-gray-700 font-medium mb-2">
                  Send Via
                </label>

                <select
                  value={sendMethod}
                  onChange={(e) => setSendMethod(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="email">
                    📧 Email
                  </option>

                  <option value="sms">
                    💬 SMS
                  </option>

                </select>

              </div>

              <button
                type="submit"
                disabled={!formComplete}
                className={`w-full py-4 rounded-xl font-semibold transition ${
                  formComplete
                    ? "bg-blue-700 hover:bg-blue-800 text-white"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                {sendMethod === "email"
                  ? "📧 Send via Email"
                  : "💬 Send via SMS"}
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="bg-slate-900 text-white py-20">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold">
            Together We Can Save More Lives
          </h2>

          <p className="mt-6 text-lg text-slate-300 leading-8">
            Every blood donation has the power to save lives. Join LifeLink
            today and become part of Kenya's growing network of voluntary blood
            donors, hospitals and healthcare professionals.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">

            <a
              href="mailto:lifelink.bloodsystem@gmail.com"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition"
            >
              Email Us
            </a>

            <a
              href="tel:+254729667133"
              className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-slate-900 transition"
            >
              Call Now
            </a>

          </div>

        </div>

      </section>

    </div>
  );

}