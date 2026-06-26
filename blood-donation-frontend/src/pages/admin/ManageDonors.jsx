import { useEffect, useState } from "react";

function ManageDonors() {

  const [donors, setDonors] = useState([]);

  const [search, setSearch] = useState("");



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




  const filteredDonors = donors.filter((donor) => {


    return (

      donor.full_name
        .toLowerCase()
        .includes(search.toLowerCase())


      ||

      donor.email
        .toLowerCase()
        .includes(search.toLowerCase())


      ||

      donor.blood_group
        .toLowerCase()
        .includes(search.toLowerCase())


      ||

      donor.location
        .toLowerCase()
        .includes(search.toLowerCase())


    );


  });




  return (

    <div>


      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Donors 🩸
      </h1>




      {/* Search */}

      <div className="mb-6">

        <input

          type="text"

          placeholder="Search donor by name, email, blood group or location..."

          value={search}

          onChange={(e) => setSearch(e.target.value)}

          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"

        />

      </div>





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


              <th className="p-4 text-left">
                Availability
              </th>


            </tr>


          </thead>




          <tbody>


            {filteredDonors.length > 0 ? (


              filteredDonors.map((donor) => (


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




                  <td className="p-4">


                    {
                      donor.availability === "available"

                      ?

                      <span className="text-green-600 font-bold">
                        Available 🟢
                      </span>


                      :


                      <span className="text-red-600 font-bold">
                        Not Available 🔴
                      </span>

                    }


                  </td>




                </tr>


              ))


            ) : (


              <tr>


                <td

                  colSpan="6"

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