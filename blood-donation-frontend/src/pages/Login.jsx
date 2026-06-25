import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      const response = await fetch(

        "http://127.0.0.1:5000/api/auth/login",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify(formData)

        }

      );



      const data = await response.json();




      if(response.ok){


        localStorage.setItem(

          "token",

          data.token

        );



        localStorage.setItem(

          "user",

          JSON.stringify(data.user)

        );



        alert("Login successful!");




        // Redirect based on user role

        if(data.user.role === "donor"){


          navigate("/donor/dashboard");


        }

        else if(data.user.role === "patient"){


          navigate("/patient/dashboard");


        }

        else if(data.user.role === "admin"){


          navigate("/admin/dashboard");


        }



      }

      else{


        alert(

          data.message || "Invalid login details"

        );


      }



    }

    catch(error){


      console.log(error);

      alert("Backend server is not running");


    }



  };




  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">


      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">



        <h1 className="text-3xl font-bold text-center mb-6 text-red-600">

          Login

        </h1>




        <form onSubmit={handleSubmit}>


          <input

            type="email"

            name="email"

            placeholder="Email Address"

            value={formData.email}

            onChange={handleChange}

            className="w-full border p-3 mb-4 rounded"

            required

          />




          <input

            type="password"

            name="password"

            placeholder="Password"

            value={formData.password}

            onChange={handleChange}

            className="w-full border p-3 mb-4 rounded"

            required

          />





          <button

            type="submit"

            className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"

          >

            Login

          </button>



        </form>





        <p className="text-center mt-4 text-gray-600">


          Don't have an account?


          <span

            className="text-red-600 ml-1 cursor-pointer"

            onClick={() => navigate("/register")}

          >

            Register

          </span>


        </p>



      </div>



    </div>

  );

}



export default Login;