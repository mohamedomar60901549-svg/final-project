import { useEffect, useState } from "react";

import {
  Droplet,
  MapPin,
  Hospital,
  User,
  CheckCircle,
  XCircle,
  MessageSquare,
  Loader2,
} from "lucide-react";


function BloodRequests() {


  const [requests, setRequests] = useState([]);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [feedback, setFeedback] = useState({});

  const [responding, setResponding] = useState(null);



  const token = localStorage.getItem("token");



  const headers = {

    "Content-Type": "application/json",

    Authorization: `Bearer ${token}`

  };





  useEffect(() => {

    const storedUser = localStorage.getItem("user");


    if (storedUser) {

      setUser(JSON.parse(storedUser));

    }


    fetchRequests();


  }, []);






  const fetchRequests = async () => {


    try {


      setLoading(true);


      const response = await fetch(

        "http://127.0.0.1:5000/api/blood-requests/",

        {

          headers

        }

      );



      const data = await response.json();



      if (Array.isArray(data)) {


        setRequests(data);


      } else {


        setRequests([]);


      }



    } catch(error) {


      console.log(
        "Request loading error:",
        error
      );


    } finally {


      setLoading(false);


    }


  };







  const handleResponse = async (
    requestId,
    status
  ) => {


    try {


      setResponding(requestId);



      const response = await fetch(

        `http://127.0.0.1:5000/api/blood-requests/${requestId}/respond`,

        {

          method:"POST",

          headers,

          body: JSON.stringify({

            response: status,

            feedback:
              feedback[requestId] || ""

          })

        }

      );




      const data = await response.json();



      if(response.ok){


        alert(
          status === "Accepted"
          ? "Thank you for accepting this donation request 🩸"
          : "Request declined"
        );


        fetchRequests();


      }
      else {


        alert(
          data.message || "Something went wrong"
        );


      }



    } catch(error){


      console.log(
        "Response error:",
        error
      );


    } finally {


      setResponding(null);


    }


  };








  const matchingRequests = requests.filter(

    request =>

      request.status === "Pending" &&

      request.blood_group === user?.blood_group

  );







  if(loading){


    return (

      <div className="flex justify-center items-center h-64">

        <Loader2
          className="animate-spin text-red-600"
          size={40}
        />

      </div>

    );


  }






  return (

    <div>


      <div className="mb-8">


        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">

          <Droplet className="text-red-600"/>

          Blood Requests

        </h1>



        <p className="text-gray-500 mt-2">

          Requests matching your blood group

        </p>


      </div>







      {
        matchingRequests.length === 0 && (


          <div className="bg-white rounded-xl shadow p-8 text-center">


            <Droplet
              size={45}
              className="mx-auto text-gray-400"
            />


            <h2 className="text-xl font-bold mt-4">

              No Matching Requests

            </h2>


            <p className="text-gray-500 mt-2">

              There are currently no blood requests requiring your blood group.

            </p>


          </div>


        )
      }








      <div className="grid md:grid-cols-2 gap-6">



      {
        matchingRequests.map(request => (



          <div
            key={request.id}
            className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-600"
          >



            <div className="flex justify-between items-start">


              <h2 className="text-xl font-bold text-gray-800">

                Blood Needed

              </h2>



              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">

                {request.status}

              </span>



            </div>






            <div className="mt-5 space-y-3 text-gray-700">


              <p className="flex items-center gap-2">

                <Droplet
                  size={18}
                  className="text-red-600"
                />

                Blood Group:

                <b className="text-red-600">

                  {request.blood_group}

                </b>

              </p>





              <p className="flex items-center gap-2">

                <User size={18}/>

                Patient:

                <b>
                  {request.patient_name}
                </b>

              </p>





              <p className="flex items-center gap-2">

                <Hospital size={18}/>

                Hospital:

                <b>
                  {request.hospital}
                </b>

              </p>





              <p className="flex items-center gap-2">

                <MapPin size={18}/>

                Location:

                <b>
                  {request.location}
                </b>

              </p>



            </div>









            <textarea

              placeholder="Leave feedback (optional)"

              value={
                feedback[request.id] || ""
              }

              onChange={(e)=>

                setFeedback({

                  ...feedback,

                  [request.id]:
                    e.target.value

                })

              }

              className="w-full mt-5 border rounded-lg p-3 focus:ring-2 focus:ring-red-500"

              rows="3"

            />









            <div className="flex gap-3 mt-5">


              <button

                onClick={()=>
                  handleResponse(
                    request.id,
                    "Accepted"
                  )
                }

                disabled={
                  responding === request.id
                }

                className="flex-1 bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"

              >

                <CheckCircle size={18}/>

                I Can Donate

              </button>






              <button

                onClick={()=>
                  handleResponse(
                    request.id,
                    "Declined"
                  )
                }

                disabled={
                  responding === request.id
                }

                className="flex-1 bg-gray-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800"

              >

                <XCircle size={18}/>

                Cannot Donate

              </button>



            </div>




            <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">


              <MessageSquare size={16}/>

              Your response will be saved.

            </div>



          </div>



        ))

      }



      </div>



    </div>

  );


}


export default BloodRequests;