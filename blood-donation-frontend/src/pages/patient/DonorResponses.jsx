import { useEffect, useState } from "react";


function DonorResponses() {


  const [requests, setRequests] = useState([]);

  const [responses, setResponses] = useState({});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");




  useEffect(() => {

    fetchRequests();

  }, []);





  // ======================================
  // LOAD PATIENT REQUESTS
  // ======================================

  const fetchRequests = async () => {


    const token = localStorage.getItem("token");


    try {


      const response = await fetch(

        "http://127.0.0.1:5000/api/blood-requests/",

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );



      const data = await response.json();



      if(response.ok && Array.isArray(data)){


        setRequests(data);



        data.forEach((request)=>{

          fetchResponses(
            request.id,
            token
          );

        });


      }
      else{

        setRequests([]);

      }



    }

    catch(err){

      console.error(err);

      setError(
        "Failed loading requests"
      );

    }

    finally{

      setLoading(false);

    }


  };







  // ======================================
  // LOAD DONOR RESPONSES
  // ======================================


  const fetchResponses = async (

    requestId,

    token

  ) => {


    try {


      const response = await fetch(

        `http://127.0.0.1:5000/api/blood-requests/${requestId}/responses`,

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );



      const data = await response.json();



      if(response.ok){


        setResponses(prev => ({

          ...prev,

          [requestId]: data

        }));


      }



    }

    catch(err){

      console.error(err);

    }


  };







  if(loading){


    return (

      <div className="p-10 text-center text-gray-600">

        Loading donor responses...

      </div>

    );

  }






  return (

    <div>



      <h1 className="text-3xl font-bold text-gray-800 mb-8">

        Donor Responses 🩸

      </h1>





      {error && (

        <div className="bg-red-100 text-red-700 p-4 rounded mb-5">

          {error}

        </div>

      )}







      {

      requests.length === 0 ?


      (

        <div className="bg-white shadow rounded-xl p-8 text-center">

          No blood requests found.

        </div>

      )


      :


      requests.map((request)=>(



        <div

        key={request.id}

        className="bg-white shadow-lg rounded-xl p-6 mb-6"

        >



          <div className="flex justify-between items-center mb-5">


            <h2 className="text-xl font-bold">

              Request #{request.id}

            </h2>



            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">

              {request.status}

            </span>


          </div>





          <div className="grid md:grid-cols-4 gap-4 mb-6">


            <div>

              <p className="text-gray-500">

                Blood Group

              </p>

              <p className="font-bold text-red-600">

                {request.blood_group}

              </p>

            </div>





            <div>

              <p className="text-gray-500">

                Units

              </p>

              <p className="font-bold">

                {request.units_needed}

              </p>

            </div>





            <div>

              <p className="text-gray-500">

                Hospital

              </p>

              <p className="font-bold">

                {request.hospital}

              </p>

            </div>





            <div>

              <p className="text-gray-500">

                Location

              </p>

              <p className="font-bold">

                {request.location}

              </p>

            </div>



          </div>








          <h3 className="text-lg font-bold mb-4">

            Donor Responses

          </h3>





          {

          responses[request.id] &&

          responses[request.id].length > 0 ?


          responses[request.id].map((response)=>(



            <div

            key={response.id}

            className="border rounded-lg p-4 mb-3"

            >



              <div className="flex justify-between">


                <h4 className="font-bold">

                  {response.donor_name}

                </h4>





                <span

                className={

                  response.response === "Accepted"

                  ?

                  "text-green-600 font-bold"

                  :

                  "text-red-600 font-bold"

                }

                >

                  {response.response}

                </span>


              </div>







              <p className="mt-2">

                <b>Feedback:</b>{" "}

                {response.feedback || "No feedback"}

              </p>





              <p className="text-sm text-gray-500 mt-2">

                {response.created_at}

              </p>



            </div>



          ))



          :


          (

            <div className="bg-gray-50 p-4 rounded text-gray-500">

              No donors have responded yet.

            </div>

          )


          }



        </div>



      ))

      }




    </div>

  );

}



export default DonorResponses;