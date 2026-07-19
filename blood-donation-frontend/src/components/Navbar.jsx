import { useState } from "react";
import { Link } from "react-router-dom";


function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);



  const closeMenu = () => {

    setMenuOpen(false);

  };



  return (

    <nav className="sticky top-0 z-50 bg-red-600 text-white shadow-lg">


      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">



        {/* LOGO */}

        <Link

          to="/"

          onClick={closeMenu}

          className="text-2xl font-bold tracking-wide hover:text-red-100 transition"

        >

          🩸 LifeLink Blood Donation System

        </Link>






        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center space-x-8">


          <Link
            to="/"
            className="hover:text-red-200 transition"
          >
            Home
          </Link>



          <Link
            to="/about"
            className="hover:text-red-200 transition"
          >
            About
          </Link>



          <Link
            to="/how-it-works"
            className="hover:text-red-200 transition"
          >
            How It Works
          </Link>



          <Link
            to="/hospitals"
            className="hover:text-red-200 transition"
          >
            Hospitals
          </Link>



          <Link
            to="/faq"
            className="hover:text-red-200 transition"
          >
            FAQ
          </Link>



          <Link
            to="/contact"
            className="hover:text-red-200 transition"
          >
            Contact
          </Link>





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







        {/* MOBILE BUTTON */}

        <button

          className="md:hidden text-3xl"

          onClick={() => setMenuOpen(!menuOpen)}

        >

          {menuOpen ? "✕" : "☰"}


        </button>



      </div>








      {/* MOBILE MENU */}

      {menuOpen && (


        <div className="md:hidden bg-red-600 px-6 py-5 space-y-4">



          <Link
            to="/"
            onClick={closeMenu}
            className="block"
          >
            Home
          </Link>



          <Link
            to="/about"
            onClick={closeMenu}
            className="block"
          >
            About
          </Link>




          <Link
            to="/how-it-works"
            onClick={closeMenu}
            className="block"
          >
            How It Works
          </Link>




          <Link
            to="/hospitals"
            onClick={closeMenu}
            className="block"
          >
            Hospitals
          </Link>




          <Link
            to="/faq"
            onClick={closeMenu}
            className="block"
          >
            FAQ
          </Link>




          <Link
            to="/contact"
            onClick={closeMenu}
            className="block"
          >
            Contact
          </Link>





          <Link
            to="/login"
            onClick={closeMenu}
            className="block"
          >
            Login
          </Link>





          <Link

            to="/register"

            onClick={closeMenu}

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