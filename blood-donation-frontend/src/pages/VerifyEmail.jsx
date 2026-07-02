import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const hasVerified = useRef(false);

  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (hasVerified.current) return;

    hasVerified.current = true;

    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/auth/verify-email/${token}`
      );

      const data = await response.json();

      setMessage(data.message);

      if (response.ok) {
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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

        <p className="text-center text-lg">{message}</p>
      </div>
    </div>
  );
}

export default VerifyEmail;