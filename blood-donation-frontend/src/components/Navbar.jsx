import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <nav className="sticky top-0 z-50 bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-red-100 transition"
        >
          🩸 LifeLink Bloood Donation System
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {isHome ? (
            <>
              <a href="#home" className="hover:text-red-200 transition">
                Home
              </a>

              <a href="#about" className="hover:text-red-200 transition">
                About
              </a>

              <a
                href="#how-it-works"
                className="hover:text-red-200 transition"
              >
                How It Works
              </a>

              <a href="#hospitals" className="hover:text-red-200 transition">
                Hospitals
              </a>

              <a href="#faq" className="hover:text-red-200 transition">
                FAQ
              </a>

              <a href="#contact" className="hover:text-red-200 transition">
                Contact
              </a>
            </>
          ) : (
            <Link to="/" className="hover:text-red-200 transition">
              Home
            </Link>
          )}

          <Link
            to="/login"
            className="hover:text-red-200 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-red-700 px-6 py-5 space-y-4">
          {isHome ? (
            <>
              <a
                href="#home"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                About
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                How It Works
              </a>

              <a
                href="#hospitals"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                Hospitals
              </a>

              <a
                href="#faq"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                FAQ
              </a>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                Contact
              </a>
            </>
          ) : (
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block"
            >
              Home
            </Link>
          )}

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="block bg-white text-red-600 px-4 py-2 rounded-lg text-center font-semibold"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;