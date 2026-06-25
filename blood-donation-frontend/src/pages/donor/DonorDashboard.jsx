import { useEffect, useState } from "react";


function DonorDashboard() {


  const [donations, setDonations] = useState([]);

  const [requests, setRequests] = useState([]);

  const [user, setUser] = useState(null);



  useEffect(() => {


    // Get donations

    fetch("http://127.0.0.1:5000/api/donations/")

      .then(res => res.json())

      .then(data => {

        setDonations(data);

      });



    // Get blood requests

    fetch("http://127.0.0.1:5000/api/blood-requests/")

      .then(res => res.json())

      .then(data => {

        setRequests(data);

      });



    // Get logged in user

    const storedUser = localStorage.getItem("user");


    if (storedUser) {

      setUser(JSON.parse(storedUser));

    }



  }, []);





  const availableRequests = requests.filter(

    req => req.status === "Pending"

  ).length;



  const completedDonations = donations.filter(

    donation => donation.status === "Completed"

  ).length;




  return (

    <div>



      <h1 className="text-3xl font-bold text-gray-800 mb-8">

        Donor Dashboard 🩸

      </h1>




      {
        user && (

          <div className="bg-white shadow-lg rounded-xl p-6 mb-6">


            <h2 className="text-xl font-bold mb-3">

              Welcome, {user.full_name} 👋

            </h2>


            <p>
              Blood Group: <b>{user.blood_group}</b>
            </p>


            <p>
              Location: <b>{user.location}</b>
            </p>


          </div>

        )
      }






      <div className="grid md:grid-cols-3 gap-6">



        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-500">


          <h2 className="text-gray-500">

            Available Requests 🩸

          </h2>


          <p className="text-4xl font-bold text-red-600 mt-3">

            {availableRequests}

          </p>


        </div>






        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500">


          <h2 className="text-gray-500">

            Completed Donations ✅

          </h2>


          <p className="text-4xl font-bold text-green-600 mt-3">

            {completedDonations}

          </p>


        </div>







        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500">


          <h2 className="text-gray-500">

            Total Donations

          </h2>


          <p className="text-4xl font-bold mt-3">

            {donations.length}

          </p>


        </div>



      </div>







      <div className="mt-8 bg-white shadow-lg rounded-xl p-6">


        <h2 className="text-2xl font-bold mb-5">

          Recent Blood Requests 🩸

        </h2>



        <table className="w-full">


          <thead className="bg-gray-100">


            <tr>

              <th className="p-3 text-left">
                Patient
              </th>


              <th className="p-3 text-left">
                Blood Group
              </th>


              <th className="p-3 text-left">
                Hospital
              </th>


              <th className="p-3 text-left">
                Status
              </th>


            </tr>


          </thead>




          <tbody>


          {

            requests.slice(0,5).map(req => (


              <tr key={req.id} className="border-b">


                <td className="p-3">

                  {req.patient_name}

                </td>



                <td className="p-3 font-bold text-red-600">

                  {req.blood_group}

                </td>



                <td className="p-3">

                  {req.hospital}

                </td>



                <td className="p-3">

                  {req.status}

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


export default DonorDashboard;