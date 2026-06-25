import { useEffect, useState } from "react";

function ManageDonors() {

  const [donors, setDonors] = useState([]);

  useEffect(() => {

    fetch(
      "http://127.0.0.1:5000/api/auth/donors"
    )
      .then((res) => res.json())
      .then((data) => {

        setDonors(data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  return (

    <div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Donors 🩸
      </h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-red-600 text-white">

            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Blood Group
              </th>

              <th className="p-4 text-left">
                Location
              </th>

            </tr>

          </thead>

          <tbody>

            {donors.length > 0 ? (

              donors.map((donor) => (

                <tr
                  key={donor.id}
                  className="border-b"
                >

                  <td className="p-4">
                    {donor.id}
                  </td>

                  <td className="p-4">
                    {donor.full_name}
                  </td>

                  <td className="p-4">
                    {donor.email}
                  </td>

                  <td className="p-4 font-bold text-red-600">
                    {donor.blood_group}
                  </td>

                  <td className="p-4">
                    {donor.location}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="p-4 text-center text-gray-500"
                >
                  No donors found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ManageDonors;