import { useEffect, useState } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // View Mode
  // "table" or "card"
  const [view, setView] = useState("table");

  const token = localStorage.getItem("token");

  // ==========================================
  // LOAD USERS
  // ==========================================
  const loadUsers = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log("Error loading users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ==========================================
  // DELETE USER
  // ==========================================
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/auth/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // ==========================================
  // UPDATE USER
  // ==========================================
  const updateUser = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/auth/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingUser),
        }
      );

      if (response.ok) {
        setEditingUser(null);
        loadUsers();
      }
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  return (
    <div className="p-6">

      {/* ========================= */}
      {/* PAGE TITLE */}
      {/* ========================= */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Manage Users 👥
        </h1>

        {/* View Switch */}
        <div className="flex gap-3">

          <button
            onClick={() => setView("table")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              view === "table"
                ? "bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            📋 Table View
          </button>

          <button
            onClick={() => setView("card")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              view === "card"
                ? "bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            🃏 Card View
          </button>

        </div>

      </div>

            {/* ===================================== */}
      {/* EDIT USER FORM */}
      {/* ===================================== */}

      {editingUser && (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border">

          <h2 className="text-2xl font-bold mb-6">
            ✏️ Edit User
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Full Name"
              value={editingUser.full_name}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  full_name: e.target.value,
                })
              }
            />

            <input
              type="email"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value,
                })
              }
            />

            <input
              type="text"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Phone Number"
              value={editingUser.phone || ""}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  phone: e.target.value,
                })
              }
            />

            <input
              type="text"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Blood Group"
              value={editingUser.blood_group || ""}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  blood_group: e.target.value,
                })
              }
            />

            <input
              type="text"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Location"
              value={editingUser.location || ""}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  location: e.target.value,
                })
              }
            />

            <select
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  role: e.target.value,
                })
              }
            >
              <option value="donor">Donor</option>
              <option value="patient">Patient</option>
              <option value="admin">Admin</option>
            </select>

          </div>

          <div className="mt-6 flex gap-3">

            <button
              onClick={updateUser}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              💾 Save Changes
            </button>

            <button
              onClick={() => setEditingUser(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* ===================================== */}
      {/* TABLE VIEW */}
      {/* ===================================== */}

      {view === "table" ? (

        <div className="bg-white shadow-lg rounded-xl overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-red-600 text-white">

              <tr>

                <th className="p-4 text-left">ID</th>

                <th className="p-4 text-left">
                  Full Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Blood Group
                </th>

                <th className="p-4 text-left">
                  Location
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

  {users.length > 0 ? (
    users.map((user) => (
      <tr
        key={user.id}
        className="border-b hover:bg-gray-50 transition"
      >
        <td className="p-4">
          {user.id}
        </td>

        <td className="p-4 font-semibold">
          {user.full_name}
        </td>

        <td className="p-4">
          {user.email}
        </td>

        <td className="p-4">
          {user.phone || "-"}
        </td>

        <td className="p-4">
          <span className="font-bold text-red-600">
            {user.blood_group || "-"}
          </span>
        </td>

        <td className="p-4">
          {user.location || "-"}
        </td>

        <td className="p-4">
          <span
            className={`font-bold px-3 py-1 rounded-full text-sm ${
              user.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : user.role === "donor"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {user.role}
          </span>
        </td>

        <td className="p-4">

          <div className="flex justify-center gap-2">

            <button
              onClick={() => setEditingUser(user)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              🗑 Delete
            </button>

          </div>

        </td>

      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="8"
        className="text-center py-10 text-gray-500"
      >
        No users found.
      </td>
    </tr>
  )}

</tbody>


          </table>

        </div>

      ) : (

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {users.length > 0 ? (

            users.map((user) => (

              <div
                key={user.id}
                className="bg-white rounded-xl shadow-lg p-6 border hover:shadow-xl transition"
              >

                <div className="flex justify-between items-center mb-4">

                  <h2 className="text-xl font-bold text-gray-800">
                    {user.full_name}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "donor"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>

                </div>

                <div className="space-y-2 text-gray-700">

                  <p>
                    <strong>ID:</strong> {user.id}
                  </p>

                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {user.phone || "-"}
                  </p>

                  <p>
                    <strong>Blood Group:</strong>{" "}
                    <span className="font-bold text-red-600">
                      {user.blood_group || "-"}
                    </span>
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {user.location || "-"}
                  </p>

                </div>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => setEditingUser(user)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => deleteUser(user.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="col-span-full bg-white rounded-xl shadow-lg p-10 text-center text-gray-500">

              No users found.

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default ManageUsers;