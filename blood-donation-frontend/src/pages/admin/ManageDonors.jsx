import { useEffect, useState } from "react";

function ManageDonors() {
  const [donors, setDonors] = useState([]);
  const [editingDonor, setEditingDonor] = useState(null);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const loadDonors = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/donors",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const data = await response.json();
      setDonors(data);
    } catch (error) {
      console.log("Error loading donors:", error);
    }
  };

  useEffect(() => {
    loadDonors();
  }, []);

  const deleteDonor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this donor?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/auth/donors/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        loadDonors();
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const updateDonor = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/auth/donors/${editingDonor.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingDonor),
        }
      );

      if (response.ok) {
        setEditingDonor(null);
        loadDonors();
      }
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  const filteredDonors = donors.filter((donor) => {
    return (
      donor.full_name.toLowerCase().includes(search.toLowerCase()) ||
      donor.email.toLowerCase().includes(search.toLowerCase()) ||
      (donor.phone || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (donor.blood_group || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (donor.location || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Donors 🩸
      </h1>

      {editingDonor && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            Edit Donor
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              className="border p-3 rounded"
              value={editingDonor.full_name}
              onChange={(e) =>
                setEditingDonor({
                  ...editingDonor,
                  full_name: e.target.value,
                })
              }
              placeholder="Full Name"
            />

            <input
              className="border p-3 rounded"
              value={editingDonor.email}
              onChange={(e) =>
                setEditingDonor({
                  ...editingDonor,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />

            <input
              className="border p-3 rounded"
              value={editingDonor.phone || ""}
              onChange={(e) =>
                setEditingDonor({
                  ...editingDonor,
                  phone: e.target.value,
                })
              }
              placeholder="Phone Number"
            />

            <input
              className="border p-3 rounded"
              value={editingDonor.blood_group || ""}
              onChange={(e) =>
                setEditingDonor({
                  ...editingDonor,
                  blood_group: e.target.value,
                })
              }
              placeholder="Blood Group"
            />

            <input
              className="border p-3 rounded"
              value={editingDonor.location || ""}
              onChange={(e) =>
                setEditingDonor({
                  ...editingDonor,
                  location: e.target.value,
                })
              }
              placeholder="Location"
            />

            <select
              className="border p-3 rounded"
              value={editingDonor.availability}
              onChange={(e) =>
                setEditingDonor({
                  ...editingDonor,
                  availability: e.target.value,
                })
              }
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>

          </div>

          <div className="mt-4">
            <button
              onClick={updateDonor}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-3"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditingDonor(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search donor by name, email, phone, blood group or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Blood Group</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Availability</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
                        {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <tr
                  key={donor.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">{donor.id}</td>

                  <td className="p-4">
                    {donor.full_name}
                  </td>

                  <td className="p-4">
                    {donor.email}
                  </td>

                  <td className="p-4">
                    {donor.phone}
                  </td>

                  <td className="p-4 font-bold text-red-600">
                    {donor.blood_group}
                  </td>

                  <td className="p-4">
                    {donor.location}
                  </td>

                  <td className="p-4">
                    {donor.availability === "available" ? (
                      <span className="text-green-600 font-bold">
                        🟢 Available
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold">
                        🔴 Not Available
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => setEditingDonor(donor)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteDonor(donor.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="p-6 text-center text-gray-500"
                >
                  No donors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageDonors;