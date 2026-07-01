import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VerifyEmail() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/auth/verify-email/${token}`
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          LifeLink
        </h1>

        <p className="text-center text-lg">
          {message}
        </p>

      </div>

    </div>
  );
}

export default VerifyEmail;