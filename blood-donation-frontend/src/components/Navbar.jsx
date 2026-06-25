import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">

      <Link to="/" className="text-2xl font-bold">
        🩸 Blood Donation System
      </Link>


      <div className="space-x-6">

        <Link to="/">
          Home
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>

      </div>

    </nav>
  );
}


export default Navbar;