import { useEffect, useState } from "react";

function ManageDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/donations/"
      );

      const data = await response.json();

      setDonations(data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const markCompleted = async (id) => {
    try {
      await fetch(
        `http://127.0.0.1:5000/api/donations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Completed",
          }),
        }
      );

      fetchDonations();
    } catch (error) {
      console.error("Error updating donation:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Manage Donations 🩸
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Donor Name</th>
              <th className="p-3">Hospital</th>
              <th className="p-3">Blood Group</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {donations.length > 0 ? (
              donations.map((donation) => (
                <tr
                  key={donation.id}
                  className="border-b text-center hover:bg-gray-50"
                >
                  <td className="p-3">{donation.id}</td>

                  <td className="p-3 font-semibold">
                    {donation.donor_name}
                  </td>

                  <td className="p-3">
                    {donation.hospital}
                  </td>

                  <td className="p-3 font-bold text-red-600">
                    {donation.blood_group}
                  </td>

                  <td className="p-3">
                    {new Date(
                      donation.donation_date
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {donation.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {donation.status !== "Completed" ? (
                      <button
                        onClick={() =>
                          markCompleted(donation.id)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                      >
                        Complete
                      </button>
                    ) : (
                      <span className="text-gray-500">
                        Done
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="p-6 text-center text-gray-500"
                >
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageDonations;