import { useEffect, useState } from "react";

function ManageDonations() {

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {

    const response = await fetch(
      "http://127.0.0.1:5000/api/donations/"
    );

    const data = await response.json();

    setDonations(data);
  };

  const markCompleted = async (id) => {

    await fetch(
      `http://127.0.0.1:5000/api/donations/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "Completed"
        })
      }
    );

    fetchDonations();
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

              <th className="p-3">Donor ID</th>

              <th className="p-3">Hospital</th>

              <th className="p-3">Blood Group</th>

              <th className="p-3">Date</th>

              <th className="p-3">Status</th>

              <th className="p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {donations.map((donation) => (

              <tr
                key={donation.id}
                className="border-b text-center"
              >

                <td className="p-3">{donation.id}</td>

                <td>{donation.donor_id}</td>

                <td>{donation.hospital}</td>

                <td>{donation.blood_group}</td>

                <td>
                  {new Date(
                    donation.donation_date
                  ).toLocaleDateString()}
                </td>

                <td>{donation.status}</td>

                <td>

                  {donation.status !== "Completed" && (

                    <button
                      onClick={() =>
                        markCompleted(donation.id)
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Complete
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageDonations;