import { useEffect, useState } from "react";


function PatientDashboard() {


  const [requests, setRequests] = useState([]);

  const [donors, setDonors] = useState([]);

  const [responses, setResponses] = useState({});

  const [user, setUser] = useState(null);

  const [error, setError] = useState("");



  useEffect(() => {


    const token = localStorage.getItem("token");



    if (!token) {

      setError("You are not logged in.");

      return;

    }



    const storedUser = localStorage.getItem("user");


    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );

    }



    // ============================
    // LOAD REQUESTS
    // ============================


    fetch(
      "http://127.0.0.1:5000/api/blood-requests/",
      {
        headers: {

          Authorization:
          `Bearer ${token}`

        }

      }
    )

    .then(res => res.json())

    .then(data => {


      if(Array.isArray(data)) {


        setRequests(data);


        data.forEach(req => {


          loadResponses(
            req.id,
            token
          );


        });


      }


    })

    .catch(err => {

      console.error(err);

    });





    // ============================
    // LOAD DONORS
    // ============================


    fetch(
      "http://127.0.0.1:5000/api/auth/users",
      {

        headers: {

          Authorization:
          `Bearer ${token}`

        }

      }
    )

    .then(res => res.json())

    .then(data => {


      if(Array.isArray(data)) {


        setDonors(

          data.filter(
            user =>
            user.role === "donor"
          )

        );


      }


    });



  }, []);





  // ============================
  // LOAD DONOR RESPONSES
  // ============================


  const loadResponses = async (
    requestId,
    token
  ) => {


    try {


      const res = await fetch(

        `http://127.0.0.1:5000/api/blood-requests/${requestId}/responses`,

        {

          headers: {

            Authorization:
            `Bearer ${token}`

          }

        }

      );



      const data = await res.json();



      setResponses(prev => ({

        ...prev,

        [requestId]: data

      }));



    }

    catch(error){

      console.error(
        error
      );

    }


  };






  const completedRequests = requests.filter(

    req =>
    req.status === "Completed"

  ).length;




  const pendingRequests = requests.filter(

    req =>
    req.status === "Pending"

  ).length;





  return (

    <div>



      <h1 className="text-3xl font-bold text-gray-800 mb-8">

        Patient Dashboard 🏥

      </h1>





      {error && (

        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">

          {error}

        </div>

      )}






      {user && (

        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">

          <h2 className="text-xl font-bold mb-3">

            Welcome, {user.full_name} 👋

          </h2>


          <p>
            Blood Group:
            <b> {user.blood_group}</b>
          </p>


          <p>
            Location:
            <b> {user.location}</b>
          </p>


        </div>

      )}







      <div className="grid md:grid-cols-4 gap-6">


        <div className="bg-white shadow rounded-xl p-6 border-l-4 border-red-500">

          <h2>
            My Requests 🩸
          </h2>

          <p className="text-4xl font-bold text-red-600">

            {requests.length}

          </p>

        </div>





        <div className="bg-white shadow rounded-xl p-6 border-l-4 border-green-500">

          <h2>
            Completed ✅
          </h2>

          <p className="text-4xl font-bold text-green-600">

            {completedRequests}

          </p>

        </div>





        <div className="bg-white shadow rounded-xl p-6 border-l-4 border-yellow-500">

          <h2>
            Pending ⏳
          </h2>

          <p className="text-4xl font-bold text-yellow-600">

            {pendingRequests}

          </p>

        </div>





        <div className="bg-white shadow rounded-xl p-6 border-l-4 border-blue-500">

          <h2>
            Available Donors 🩸
          </h2>

          <p className="text-4xl font-bold">

            {donors.length}

          </p>

        </div>


      </div>








      <div className="mt-8 space-y-6">


        {requests.map(req => (


          <div
          key={req.id}
          className="bg-white shadow-lg rounded-xl p-6"
          >



            <h2 className="text-xl font-bold mb-4">

              Blood Request #{req.id}

            </h2>



            <div className="grid md:grid-cols-5 gap-3 text-gray-700">


              <p>
                Blood:
                <b className="text-red-600">
                  {" "}{req.blood_group}
                </b>
              </p>


              <p>
                Hospital:
                <b>
                  {" "}{req.hospital}
                </b>
              </p>


              <p>
                Units:
                <b>
                  {" "}{req.units_needed}
                </b>
              </p>


              <p>
                Status:
                <b>
                  {" "}{req.status}
                </b>
              </p>


            </div>






            <div className="mt-6">


              <h3 className="font-bold text-lg mb-3">

                Donor Responses 🩸

              </h3>




              {

              responses[req.id]?.length > 0 ?



              responses[req.id].map(response => (


                <div
                key={response.id}
                className="border rounded-lg p-4 mb-3"
                >


                  <p>

                    Donor:
                    <b>
                      {" "}{response.donor_name}
                    </b>

                  </p>


                  <p>

                    Response:

                    <b className={
                      response.response === "Accepted"
                      ?
                      "text-green-600 ml-2"
                      :
                      "text-red-600 ml-2"
                    }>

                      {response.response}

                    </b>

                  </p>



                  <p>

                    Feedback:

                    {response.feedback || "No feedback"}

                  </p>



                  <p className="text-sm text-gray-500 mt-2">

                    {response.created_at}

                  </p>


                </div>


              ))


              :


              <p className="text-gray-500">

                No donor responses yet.

              </p>


              }


            </div>




          </div>


        ))}


      </div>



    </div>

  );

}



export default PatientDashboard;