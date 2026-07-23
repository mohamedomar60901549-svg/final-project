import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  User,
  History,
  Heart,
  ClipboardList,
  MessageCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Home,
  Shield,
  Activity,
  Droplet,
  Calendar,
  Award
} from "lucide-react";

function DonorLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { path: "/donor/dashboard", icon: <LayoutDashboard className="size-4" />, label: "Dashboard" },
    { path: "/donor/profile", icon: <User className="size-4" />, label: "Profile" },
    { path: "/donor/history", icon: <History className="size-4" />, label: "Donation History" },
    { path: "/donor/donate", icon: <Heart className="size-4" />, label: "Donate Blood" },
    { path: "/donor/blood-requests", icon: <ClipboardList className="size-4" />, label: "Blood Requests" },
    { path: "/donor/chat", icon: <MessageCircle className="size-4" />, label: "Chat" },
  ];

  const isActive = (path) => location.pathname === path;

  // Get user info
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-border fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-slate-800 text-white flex items-center justify-center">
            <Heart className="size-4" />
          </div>
          <span className="font-bold text-sm text-foreground">LifeLink Donor</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 transition"
        >
          {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-border z-50 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:z-30 overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-slate-800 text-white flex items-center justify-center">
                <Heart className="size-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">LifeLink</h1>
                <p className="text-xs text-muted-foreground">Donor Portal</p>
              </div>
            </div>
            {/* Donor Info */}
            {user.full_name && (
              <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-border">
                <p className="text-sm font-medium text-foreground">{user.full_name}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Droplet className="size-3" />
                  <span>Blood Group: {user.blood_group || "N/A"}</span>
                  <span className="w-px h-3 bg-border" />
                  <Shield className="size-3" />
                  <span>Donor</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive(item.path)
                    ? "bg-slate-100 text-foreground"
                    : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                }`}
              >
                <span className={isActive(item.path) ? "text-foreground" : "text-muted-foreground"}>
                  {item.icon}
                </span>
                {item.label}
                {isActive(item.path) && (
                  <ChevronRight className="size-4 ml-auto text-muted-foreground" />
                )}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-slate-50 hover:text-foreground transition"
            >
              <Home className="size-4" />
              Back to Website
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`md:ml-72 min-h-screen pt-16 md:pt-0 transition-all duration-300`}>
        {/* Top Bar - Desktop */}
        <div className="hidden md:flex bg-white border-b border-border px-8 py-4 items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {navItems.find(item => isActive(item.path))?.label || "Dashboard"}
            </h2>
            <p className="text-xs text-muted-foreground">Welcome back, {user.full_name || "Donor"}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition relative">
              <Bell className="size-4 text-muted-foreground" />
              <span className="absolute top-1 right-1 size-2 rounded-full bg-red-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-semibold text-sm">
                {user.full_name?.charAt(0) || "D"}
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">{user.full_name || "Donor"}</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-green-600" />
                  Available
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DonorLayout;