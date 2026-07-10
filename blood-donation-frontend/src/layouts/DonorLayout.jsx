import { Link, Outlet, useNavigate } from "react-router-dom";

function DonorLayout() {
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
          🩸 LifeLink
        </h1>

        <nav className="space-y-4">

          <Link
            to="/donor/dashboard"
            className="block hover:bg-red-600 p-2 rounded"
          >
            Dashboard
          </Link>

          <Link
            to="/donor/profile"
            className="block hover:bg-red-600 p-2 rounded"
          >
            Profile
          </Link>

          <Link
            to="/donor/history"
            className="block hover:bg-red-600 p-2 rounded"
          >
            Donation History
          </Link>

          <Link
            to="/donor/donate"
            className="block hover:bg-red-600 p-2 rounded"
          >
            Donate Blood
          </Link>

          <Link
            to="/donor/chat"
            className="block hover:bg-red-600 p-2 rounded"
          >
            💬 Chat
          </Link>

          <button
            onClick={handleLogout}
            className="mt-10 bg-white text-red-700 px-4 py-2 rounded w-full hover:bg-gray-100"
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

export default DonorLayout;