import { useEffect, useState } from "react";

function DonorProfile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (

    <div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Profile 👤
      </h1>

      <div className="bg-white shadow rounded-lg p-8 max-w-2xl">

        <div className="space-y-4">

          <div>
            <h2 className="text-gray-500">
              Full Name
            </h2>

            <p className="text-xl font-semibold">
              {user.full_name}
            </p>
          </div>

          <div>
            <h2 className="text-gray-500">
              Email
            </h2>

            <p className="text-xl font-semibold">
              {user.email}
            </p>
          </div>

          <div>
            <h2 className="text-gray-500">
              Blood Group
            </h2>

            <p className="text-xl font-bold text-red-600">
              {user.blood_group}
            </p>
          </div>

          <div>
            <h2 className="text-gray-500">
              Location
            </h2>

            <p className="text-xl font-semibold">
              {user.location}
            </p>
          </div>

          <div>
            <h2 className="text-gray-500">
              Role
            </h2>

            <p className="text-xl font-semibold">
              {user.role}
            </p>
          </div>

          <div>
            <h2 className="text-gray-500">
              Availability
            </h2>

            <p className="text-xl font-bold text-green-600">
              Available
            </p>
          </div>

        </div>

        <button
          className="mt-8 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
        >
          Edit Profile
        </button>

      </div>

    </div>

  );

}

export default DonorProfile;