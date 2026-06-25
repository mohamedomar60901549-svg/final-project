import { useState } from "react";

function CreateRequest() {

  const [formData, setFormData] = useState({
    patient_name: "",
    blood_group: "",
    units_needed: "",
    hospital: "",
    location: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/api/blood-requests/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            patient_name: formData.patient_name,
            blood_group: formData.blood_group,
            units_needed: Number(formData.units_needed),
            hospital: formData.hospital,
            location: formData.location
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Blood request created successfully!");

        setFormData({
          patient_name: "",
          blood_group: "",
          units_needed: "",
          hospital: "",
          location: ""
        });

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);
      alert("Server error");

    }

  };

  return (

    <div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Request Blood 🩸
      </h1>

      <div className="bg-white shadow rounded-lg p-8 max-w-2xl">

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="patient_name"
            placeholder="Patient Name"
            value={formData.patient_name}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            required
          />

          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            required
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <input
            type="number"
            name="units_needed"
            placeholder="Units Needed"
            value={formData.units_needed}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            required
          />

          <input
            type="text"
            name="hospital"
            placeholder="Hospital"
            value={formData.hospital}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
          >
            Create Request
          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateRequest;