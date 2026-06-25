import { useEffect, useState } from "react";

function FindDonors() {

  const [donors, setDonors] = useState([]);

  const [search, setSearch] = useState("");


  useEffect(() => {

    fetch("http://127.0.0.1:5000/api/auth/users")

      .then((response) => response.json())

      .then((data) => {

        const donorList = data.filter(
          (user) => user.role === "donor"
        );

        setDonors(donorList);

      })

      .catch((error) => {

        console.error(
          "Error loading donors:",
          error
        );

      });


  }, []);



  const filteredDonors = donors.filter((donor)=>


    donor.blood_group
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    donor.location
      .toLowerCase()
      .includes(search.toLowerCase())


  );



  return (

    <div>


      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Find Donors 🩸
      </h1>



      <input

        type="text"

        placeholder="Search blood group or location..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        className="w-full md:w-1/2 border p-3 rounded mb-6"

      />



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
                Blood Group
              </th>


              <th className="p-4 text-left">
                Location
              </th>


              <th className="p-4 text-left">
                Status
              </th>


            </tr>


          </thead>




          <tbody>


          {

            filteredDonors.map((donor)=>(


              <tr
                key={donor.id}
                className="border-b"
              >


                <td className="p-4">
                  {donor.id}
                </td>



                <td className="p-4 font-semibold">
                  {donor.full_name}
                </td>



                <td className="p-4 font-bold text-red-600">
                  {donor.blood_group}
                </td>



                <td className="p-4">
                  {donor.location}
                </td>



                <td className="p-4 text-green-600 font-bold">
                  Available
                </td>


              </tr>


            ))

          }


          </tbody>


        </table>


      </div>



    </div>

  );

}


export default FindDonors;