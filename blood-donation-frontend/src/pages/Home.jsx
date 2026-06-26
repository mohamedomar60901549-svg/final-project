import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-24">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h1 className="text-6xl font-bold mb-6">
            Donate Blood, Save Lives
          </h1>

          <p className="text-xl mb-8">
            Connecting blood donors with patients during emergencies.
          </p>

          <div className="flex justify-center gap-4">

            <Link
              to="/register"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Become a Donor
            </Link>

            <Link
              to="/request-blood"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-red-600 transition"
            >
              Request Blood
            </Link>

          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-4xl font-bold text-red-600">500+</h2>
            <p>Registered Donors</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-4xl font-bold text-red-600">120+</h2>
            <p>Blood Requests</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-4xl font-bold text-red-600">350+</h2>
            <p>Lives Saved</p>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">
                1. Register
              </h3>

              <p>
                Create an account as a donor or patient.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">
                2. Request Blood
              </h3>

              <p>
                Patients submit emergency blood requests.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">
                3. Save Lives
              </h3>

              <p>
                Donors respond and help patients quickly.
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;