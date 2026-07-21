import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  User,
  History,
  Heart,
  ClipboardList,
  MessageCircle,
  LogOut,
} from "lucide-react";

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

      <aside className="fixed top-0 left-0 w-64 h-screen bg-red-700 text-white shadow-xl">

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-10">
            🩸 LifeLink
          </h1>

          <nav className="space-y-2">

            <Link
              to="/donor/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              to="/donor/profile"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition"
            >
              <User size={20} />
              Profile
            </Link>

            <Link
              to="/donor/history"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition"
            >
              <History size={20} />
              Donation History
            </Link>

            <Link
              to="/donor/donate"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition"
            >
              <Heart size={20} />
              Donate Blood
            </Link>

            {/* NEW PAGE */}

            <Link
              to="/donor/blood-requests"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition"
            >
              <ClipboardList size={20} />
              Blood Requests
            </Link>

            <Link
              to="/donor/chat"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition"
            >
              <MessageCircle size={20} />
              Chat
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full mt-10 bg-white text-red-700 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              <LogOut size={18} />
              Logout
            </button>

          </nav>

        </div>

      </aside>

      {/* Main */}

      <main className="ml-64 p-8 min-h-screen">
        <Outlet />
      </main>

    </div>
  );
}

export default DonorLayout;