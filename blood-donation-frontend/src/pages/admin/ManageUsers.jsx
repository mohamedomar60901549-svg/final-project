import { useEffect, useState } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const token = localStorage.getItem("token");

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
      setUsers(data);
    } catch (error) {
      console.log("Error loading users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

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
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Users 👥
      </h1>

      {editingUser && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            Edit User
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border p-3 rounded"
              value={editingUser.full_name}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  full_name: e.target.value,
                })
              }
              placeholder="Full Name"
            />

            <input
              className="border p-3 rounded"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />

            <input
              className="border p-3 rounded"
              value={editingUser.blood_group || ""}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  blood_group: e.target.value,
                })
              }
              placeholder="Blood Group"
            />

            <input
              className="border p-3 rounded"
              value={editingUser.location || ""}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  location: e.target.value,
                })
              }
              placeholder="Location"
            />
          </div>

          <select
            className="border p-3 rounded mt-4"
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

          <div className="mt-4">
            <button
              onClick={updateUser}
              className="bg-green-600 text-white px-4 py-2 rounded mr-3"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditingUser(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Blood Group</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.full_name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 font-bold text-red-600">
                  {user.blood_group}
                </td>
                <td className="p-4">{user.location}</td>

                <td className="p-4">
                  <span
                    className={
                      user.role === "donor"
                        ? "text-green-600 font-bold"
                        : user.role === "admin"
                        ? "text-purple-600 font-bold"
                        : "text-blue-600 font-bold"
                    }
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;