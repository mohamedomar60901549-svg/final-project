import { useEffect, useState } from "react";


function PatientDashboard() {


  const [requests, setRequests] = useState([]);

  const [donors, setDonors] = useState([]);

  const [user, setUser] = useState(null);



  useEffect(() => {


    // Load blood requests

    fetch("http://127.0.0.1:5000/api/blood-requests/")

      .then(res => res.json())

      .then(data => {

        setRequests(data);

      });



    // Load users to count donors

    fetch("http://127.0.0.1:5000/api/auth/users")

      .then(res => res.json())

      .then(data => {


        const donorUsers = data.filter(

          user => user.role === "donor"

        );


        setDonors(donorUsers);


      });



    // Load logged in user

    const storedUser = localStorage.getItem("user");


    if (storedUser) {

      setUser(JSON.parse(storedUser));

    }



  }, []);





  const completedRequests = requests.filter(

    req => req.status === "Completed"

  ).length;



  const pendingRequests = requests.filter(

    req => req.status === "Pending"

  ).length;




  return (

    <div>


      <h1 className="text-3xl font-bold text-gray-800 mb-8">

        Patient Dashboard 🏥

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







      <div className="grid md:grid-cols-4 gap-6">



        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-500">


          <h2 className="text-gray-500">

            My Requests 🩸

          </h2>


          <p className="text-4xl font-bold mt-3 text-red-600">

            {requests.length}

          </p>


        </div>






        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500">


          <h2 className="text-gray-500">

            Completed ✅

          </h2>


          <p className="text-4xl font-bold mt-3 text-green-600">

            {completedRequests}

          </p>


        </div>







        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-500">


          <h2 className="text-gray-500">

            Pending ⏳

          </h2>


          <p className="text-4xl font-bold mt-3 text-yellow-600">

            {pendingRequests}

          </p>


        </div>







        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500">


          <h2 className="text-gray-500">

            Available Donors 🩸

          </h2>


          <p className="text-4xl font-bold mt-3">

            {donors.length}

          </p>


        </div>



      </div>







      <div className="mt-8 bg-white shadow-lg rounded-xl p-6">


        <h2 className="text-2xl font-bold mb-5">

          My Blood Requests

        </h2>




        <table className="w-full">


          <thead className="bg-gray-100">


            <tr>

              <th className="p-3 text-left">
                ID
              </th>


              <th className="p-3 text-left">
                Blood Group
              </th>


              <th className="p-3 text-left">
                Hospital
              </th>


              <th className="p-3 text-left">
                Units
              </th>


              <th className="p-3 text-left">
                Status
              </th>


            </tr>


          </thead>





          <tbody>


          {

            requests.map(req => (


              <tr key={req.id} className="border-b">


                <td className="p-3">

                  {req.id}

                </td>



                <td className="p-3 font-bold text-red-600">

                  {req.blood_group}

                </td>



                <td className="p-3">

                  {req.hospital}

                </td>



                <td className="p-3">

                  {req.units_needed}

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


export default PatientDashboard;