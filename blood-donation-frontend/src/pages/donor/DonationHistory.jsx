import { useEffect, useState } from "react";

function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:5000/api/donations/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDonations(Array.isArray(data) ? data : []);
      } else {
        alert(data.message || "Failed to load donations.");
        setDonations([]);
      }
    } catch (error) {
      console.error(error);
      alert("Backend server error.");
      setDonations([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Donation History 🩸
      </h1>

      <div className="bg-white shadow rounded-lg p-6">
        {loading ? (
          <p>Loading donations...</p>
        ) : donations.length === 0 ? (
          <p>No donations found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Donor ID</th>
                <th className="text-left p-3">Request ID</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-b">
                  <td className="p-3">{donation.id}</td>
                  <td className="p-3">{donation.donor_id}</td>
                  <td className="p-3">
                    {donation.blood_request_id || "-"}
                  </td>
                  <td className="p-3">
                    {new Date(
                      donation.donation_date
                    ).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-yellow-600 font-bold">
                    {donation.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DonationHistory;