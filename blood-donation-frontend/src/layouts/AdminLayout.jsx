import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, Droplets, Heart, 
  FileText, BarChart3, MessageSquare, LogOut,
  Menu, X, ChevronRight, Settings, Bell,
  Shield, UserCog, Activity, ClipboardCheck,
  TrendingUp, Calendar, Award, Home
} from "lucide-react";

function AdminLayout() {
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
    { path: "/admin/dashboard", icon: <LayoutDashboard className="size-4" />, label: "Dashboard" },
    { path: "/admin/users", icon: <Users className="size-4" />, label: "Manage Users" },
    { path: "/admin/donors", icon: <Heart className="size-4" />, label: "Manage Donors" },
    { path: "/admin/requests", icon: <Droplets className="size-4" />, label: "Blood Requests" },
    { path: "/admin/donations", icon: <ClipboardCheck className="size-4" />, label: "Manage Donations" },
    { path: "/admin/reports", icon: <BarChart3 className="size-4" />, label: "Reports" },
    { path: "/admin/chat", icon: <MessageSquare className="size-4" />, label: "Chat" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-border fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
            <Heart className="size-4" />
          </div>
          <span className="font-bold text-sm text-foreground">LifeLink Admin</span>
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
              <div className="size-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
                <Heart className="size-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">LifeLink</h1>
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="size-3" />
              <span>Administrator Access</span>
            </div>
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
                    ? "bg-red-50 text-red-600"
                    : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                }`}
              >
                <span className={isActive(item.path) ? "text-red-600" : "text-muted-foreground"}>
                  {item.icon}
                </span>
                {item.label}
                {isActive(item.path) && (
                  <ChevronRight className="size-4 ml-auto text-red-600" />
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
            <p className="text-xs text-muted-foreground">Manage your LifeLink admin panel</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition relative">
              <Bell className="size-4 text-muted-foreground" />
              <span className="absolute top-1 right-1 size-2 rounded-full bg-red-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <UserCog className="size-4" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">Online</p>
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

export default AdminLayout;