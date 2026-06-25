function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-bold mb-3">
            🩸 Blood Donation System
          </h2>

          <p className="text-gray-400">
            Connecting donors with patients and saving lives through
            faster blood donation support.
          </p>
        </div>


        <div>
          <h2 className="text-xl font-bold mb-3">
            Quick Links
          </h2>

          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Become a Donor</li>
            <li>Request Blood</li>
            <li>Contact</li>
          </ul>
        </div>


        <div>
          <h2 className="text-xl font-bold mb-3">
            Emergency Contact
          </h2>

          <p className="text-gray-400">
            Available for urgent blood requests.
          </p>

          <p className="mt-3 font-semibold text-red-400">
            📞 +254 729667133
          </p>
        </div>

      </div>


      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        © 2026 Blood Donation System. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;