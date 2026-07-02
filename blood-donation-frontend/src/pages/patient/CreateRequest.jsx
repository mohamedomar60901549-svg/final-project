import { useState } from "react";

function CreateRequest() {
  const [formData, setFormData] = useState({
    patient_name: "",
    blood_group: "",
    units_needed: "",
    hospital: "",
    location: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("❌ Please log in first.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/blood-requests/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            patient_name: formData.patient_name,
            blood_group: formData.blood_group,
            units_needed: Number(formData.units_needed),
            hospital: formData.hospital,
            location: formData.location,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        setFormData({
          patient_name: "",
          blood_group: "",
          units_needed: "",
          hospital: "",
          location: "",
        });
      } else {
        setMessage(data.message || data.msg || "Request failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Request Blood 🩸
      </h1>

      <div className="bg-white shadow rounded-lg p-8 max-w-2xl">
        {message && (
          <div
            className={`mb-4 p-3 rounded text-center font-semibold ${
              message.toLowerCase().includes("success")
                ? "bg-green-100 text-green-700 border border-green-400"
                : "bg-red-100 text-red-700 border border-red-400"
            }`}
          >
            {message}
          </div>
        )}

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
            disabled={loading}
            className={`w-full text-white p-3 rounded ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Creating Request..." : "Create Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRequest;