import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying your email...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/auth/verify-email/${token}`
        );

        const data = await response.json().catch(() => null);

        if (!isMounted) return;

        if (response.ok) {
          setMessage(data?.message || "Email verified successfully!");
          setLoading(false);

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setMessage(data?.message || "Verification failed.");
          setLoading(false);
        }
      } catch (error) {
        if (!isMounted) return;
        setMessage("Network error. Please try again.");
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage("Invalid verification link.");
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          LifeLink
        </h1>

        <p className="text-center text-lg">
          {message}
        </p>

        {loading && (
          <p className="text-center text-sm text-gray-500 mt-2">
            Please wait...
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;