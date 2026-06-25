import { useEffect, useState } from "react";


function AdminDashboard() {


  const [stats, setStats] = useState({
    total_users: 0,
    total_donors: 0,
    total_patients: 0
  });


  const [requests, setRequests] = useState([]);



  useEffect(() => {


    fetch("http://127.0.0.1:5000/api/auth/stats")

      .then(res => res.json())

      .then(data => {

        setStats(data);

      });



    fetch("http://127.0.0.1:5000/api/blood-requests/")

      .then(res => res.json())

      .then(data => {

        setRequests(data);

      });



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

        Admin Dashboard 👨‍💼

      </h1>



      <div className="grid md:grid-cols-3 gap-6">


        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500">

          <h2 className="text-gray-500">
            Total Users 👥
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.total_users}
          </p>

        </div>





        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500">

          <h2 className="text-gray-500">
            Total Donors 🩸
          </h2>

          <p className="text-4xl font-bold mt-3 text-green-600">
            {stats.total_donors}
          </p>

        </div>





        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-purple-500">

          <h2 className="text-gray-500">
            Total Patients 🏥
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.total_patients}
          </p>

        </div>





        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-500">

          <h2 className="text-gray-500">
            Blood Requests 🩸
          </h2>

          <p className="text-4xl font-bold mt-3 text-red-600">
            {requests.length}
          </p>

        </div>





        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500">

          <h2 className="text-gray-500">
            Completed Requests ✅
          </h2>

          <p className="text-4xl font-bold mt-3 text-green-600">
            {completedRequests}
          </p>

        </div>





        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-500">

          <h2 className="text-gray-500">
            Pending Requests ⏳
          </h2>

          <p className="text-4xl font-bold mt-3 text-yellow-600">
            {pendingRequests}
          </p>

        </div>


      </div>





      <div className="mt-8 bg-white shadow-lg rounded-xl p-8">


        <h2 className="text-2xl font-bold mb-5">

          System Status ⚙️

        </h2>



        <div className="space-y-3">


          <p className="text-green-600 font-semibold">

            🟢 System Active

          </p>



          <p>

            ✅ Database Connected

          </p>



          <p>

            ✅ Flask API Running

          </p>



          <p>

            ✅ React Frontend Connected

          </p>


        </div>


      </div>




    </div>

  );

}


export default AdminDashboard;