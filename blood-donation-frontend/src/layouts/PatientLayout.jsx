import { Link, Outlet, useNavigate } from "react-router-dom";

function PatientLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-red-700 text-white p-6 overflow-y-auto">

        <h1 className="text-2xl font-bold mb-8">
          🏥 LifeLink
        </h1>

        <nav className="space-y-4">

          <Link
            to="/patient/dashboard"
            className="block hover:bg-red-600 p-2 rounded"
          >
            Dashboard
          </Link>

          <Link
            to="/patient/request"
            className="block hover:bg-red-600 p-2 rounded"
          >
            Request Blood
          </Link>

          <Link
            to="/patient/requests"
            className="block hover:bg-red-600 p-2 rounded"
          >
            My Requests
          </Link>

          <Link
            to="/patient/donors"
            className="block hover:bg-red-600 p-2 rounded"
          >
            Find Donors
          </Link>

          <Link
            to="/patient/chat"
            className="block hover:bg-red-600 p-2 rounded"
          >
            💬 Chat
          </Link>

          <button
            onClick={handleLogout}
            className="mt-10 w-full bg-white text-red-700 px-4 py-2 rounded hover:bg-gray-100"
          >
            Logout
          </button>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}

export default PatientLayout;