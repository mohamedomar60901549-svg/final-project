import { Link, Outlet, useNavigate } from "react-router-dom";

function PatientLayout() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-red-700 text-white p-6">

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

          {/* 💬 Chat */}
          <Link
            to="/patient/chat"
            className="block hover:bg-red-600 p-2 rounded"
          >
            💬 Chat
          </Link>

          <button
            onClick={handleLogout}
            className="mt-10 bg-white text-red-700 px-4 py-2 rounded hover:bg-gray-100 w-full"
          >
            Logout
          </button>

        </nav>

      </aside>

      {/* Page Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>

  );

}

export default PatientLayout;