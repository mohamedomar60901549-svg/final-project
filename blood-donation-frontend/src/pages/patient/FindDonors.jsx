import { useEffect, useState } from "react";

function FindDonors() {

  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5000/api/auth/donors", {

      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },

    })
      .then(async (response) => {

        const data = await response.json();

        if (!response.ok) {
          console.log("Backend Error:", data);
          return [];
        }

        return data;
      })
      .then((data) => {

        if (Array.isArray(data)) {
          setDonors(data);
        }

      })
      .catch((error) => {

        console.log("Error:", error);

      });

  }, []);

  const filteredDonors = donors.filter((donor) => {

    const blood = donor.blood_group || "";
    const location = donor.location || "";
    const name = donor.full_name || "";

    return (

      blood.toLowerCase().includes(search.toLowerCase()) ||

      location.toLowerCase().includes(search.toLowerCase()) ||

      name.toLowerCase().includes(search.toLowerCase())

    );

  });

  return (

    <div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Find Donors 🩸
      </h1>

      <input
        type="text"
        placeholder="Search by blood group, location or name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 border p-3 rounded mb-6"
      />

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-red-600 text-white">

            <tr>

              <th className="p-4 text-left">ID</th>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Blood Group</th>

              <th className="p-4 text-left">Location</th>

              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {filteredDonors.length > 0 ? (

              filteredDonors.map((donor) => (

                <tr key={donor.id} className="border-b">

                  <td className="p-4">{donor.id}</td>

                  <td className="p-4 font-semibold">
                    {donor.full_name}
                  </td>

                  <td className="p-4 font-bold text-red-600">
                    {donor.blood_group}
                  </td>

                  <td className="p-4">
                    {donor.location}
                  </td>

                  <td className="p-4">

                    {donor.availability === "available" ? (

                      <span className="text-green-600 font-bold">
                        Available 🟢
                      </span>

                    ) : (

                      <span className="text-red-600 font-bold">
                        Not Available 🔴
                      </span>

                    )}

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="text-center p-6 text-gray-500"
                >
                  No donors found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default FindDonors;