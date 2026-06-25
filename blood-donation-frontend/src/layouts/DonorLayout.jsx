import { Link, Outlet, useNavigate } from "react-router-dom";

function DonorLayout() {
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

          <button
            onClick={handleLogout}
            className="mt-10 bg-white text-red-700 px-4 py-2 rounded w-full"
          >
            Logout
          </button>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}

export default DonorLayout;