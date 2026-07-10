import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white p-6 overflow-y-auto">

        <h1 className="text-2xl font-bold mb-8">
          🩸 LifeLink Admin
        </h1>

        <nav className="space-y-4">

          <Link
            to="/admin/dashboard"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Manage Users
          </Link>

          <Link
            to="/admin/donors"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Manage Donors
          </Link>

          <Link
            to="/admin/requests"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Blood Requests
          </Link>

          <Link
            to="/admin/donations"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Manage Donations
          </Link>

          <Link
            to="/admin/reports"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Reports
          </Link>

          <Link
            to="/admin/chat"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            💬 Chat
          </Link>

          <button
            onClick={handleLogout}
            className="mt-10 w-full bg-white text-gray-900 px-4 py-2 rounded hover:bg-gray-200"
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

export default AdminLayout;