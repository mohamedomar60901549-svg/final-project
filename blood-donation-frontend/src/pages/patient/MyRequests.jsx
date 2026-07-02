import { useEffect, useState } from "react";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in first.");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:5000/api/blood-requests/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok && Array.isArray(data)) {
          setRequests(data);
        } else {
          console.error("API Error:", data);
          setMessage(data.message || data.msg || "Unable to load requests.");
          setRequests([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
        setMessage("Unable to connect to the server.");
        setRequests([]);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Blood Requests 🩸
      </h1>

      {message && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {message}
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Patient</th>
              <th className="p-4 text-left">Blood Group</th>
              <th className="p-4 text-left">Hospital</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Units Needed</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center">
                  No blood requests found.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id} className="border-b">
                  <td className="p-4">{request.id}</td>
                  <td className="p-4">{request.patient_name}</td>
                  <td className="p-4 font-bold text-red-600">
                    {request.blood_group}
                  </td>
                  <td className="p-4">{request.hospital}</td>
                  <td className="p-4">{request.location}</td>
                  <td className="p-4">{request.units_needed}</td>
                  <td className="p-4">
                    <span
                      className={
                        request.status === "Completed"
                          ? "text-green-600 font-bold"
                          : request.status === "Pending"
                          ? "text-yellow-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyRequests;