import { useEffect, useState } from "react";

function DonorProfile() {

  const [user, setUser] = useState(null);
  const [availability, setAvailability] = useState("available");
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      const userData = JSON.parse(storedUser);

      setUser(userData);

      setAvailability(
        userData.availability || "available"
      );

    }

  }, []);



  const updateAvailability = async () => {

    try {

      setLoading(true);


      const token = localStorage.getItem("token");


      const newStatus =
        availability === "available"
          ? "not_available"
          : "available";


      const response = await fetch(
        "http://localhost:5000/api/auth/availability",
        {
          method: "PUT",

          headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

          },

          body: JSON.stringify({

            availability: newStatus

          })

        }
      );


      const data = await response.json();



      if (response.ok) {


        setAvailability(
          data.availability
        );



        const updatedUser = {

          ...user,

          availability:
          data.availability

        };



        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );


        setUser(updatedUser);


      } else {

        console.log(data.message);

      }



    } catch (error) {

      console.log(
        "Availability update error:",
        error
      );


    } finally {

      setLoading(false);

    }

  };



  if (!user) {

    return (

      <h2>
        Loading...
      </h2>

    );

  }



  return (

    <div>


      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Profile 👤
      </h1>



      <div className="bg-white shadow rounded-lg p-8 max-w-2xl">


        <div className="space-y-4">


          <div>
            <h2 className="text-gray-500">
              Full Name
            </h2>

            <p className="text-xl font-semibold">
              {user.full_name}
            </p>
          </div>



          <div>
            <h2 className="text-gray-500">
              Email
            </h2>

            <p className="text-xl font-semibold">
              {user.email}
            </p>
          </div>



          <div>
            <h2 className="text-gray-500">
              Blood Group
            </h2>

            <p className="text-xl font-bold text-red-600">
              {user.blood_group}
            </p>
          </div>



          <div>
            <h2 className="text-gray-500">
              Location
            </h2>

            <p className="text-xl font-semibold">
              {user.location}
            </p>
          </div>



          <div>
            <h2 className="text-gray-500">
              Role
            </h2>

            <p className="text-xl font-semibold">
              {user.role}
            </p>
          </div>




          <div>

            <h2 className="text-gray-500">
              Availability
            </h2>


            <p
              className={
                availability === "available"
                ?
                "text-xl font-bold text-green-600"
                :
                "text-xl font-bold text-red-600"
              }
            >

              {
                availability === "available"
                ?
                "Available 🟢"
                :
                "Not Available 🔴"
              }

            </p>


          </div>


        </div>



        <button

          onClick={updateAvailability}

          disabled={loading}

          className="mt-8 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"

        >

          {
            loading
            ?
            "Updating..."
            :
            availability === "available"
            ?
            "Go Offline"
            :
            "Become Available"
          }


        </button>



      </div>


    </div>

  );

}


export default DonorProfile;