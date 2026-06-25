import { useState } from "react";

function DonateBlood() {
  const [hospital, setHospital] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [weight, setWeight] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !hospital ||
      !bloodGroup ||
      !weight ||
      !lastDonationDate
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (bloodGroup === "Don't Know") {
      alert(
        "Please get a blood group test before donating."
      );
      return;
    }

    if (Number(weight) < 50) {
      alert(
        "You must weigh at least 50kg to donate blood."
      );
      return;
    }

    const today = new Date();
    const lastDate = new Date(lastDonationDate);

    const difference =
      today.getTime() - lastDate.getTime();

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (days < 90) {
      alert(
        `You donated ${days} days ago. Wait ${
          90 - days
        } more days before donating again.`
      );
      return;
    }

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await fetch(
        "http://127.0.0.1:5000/api/donations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            donor_id: user.id,
            hospital: hospital,
            blood_group: bloodGroup,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Donation recorded successfully!");

        setHospital("");
        setBloodGroup("");
        setWeight("");
        setLastDonationDate("");
      } else {
        alert(
          data.message ||
            "Failed to record donation."
        );
      }
    } catch (error) {
      console.log(error);
      alert("Backend server error.");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">
        Donate Blood 🩸
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">

        <form onSubmit={handleSubmit}>

          <label className="block mb-2 font-semibold">
            Hospital Name
          </label>

          <input
            type="text"
            value={hospital}
            onChange={(e) =>
              setHospital(e.target.value)
            }
            placeholder="Enter Hospital Name"
            className="w-full border p-3 rounded mb-4"
          />

          <label className="block mb-2 font-semibold">
            Blood Group
          </label>

          <select
            value={bloodGroup}
            onChange={(e) =>
              setBloodGroup(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          >
            <option value="">
              Select Blood Group
            </option>

            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
            <option>Don't Know</option>
          </select>

          {bloodGroup === "Don't Know" && (
            <div className="bg-yellow-100 border border-yellow-400 p-4 rounded mb-4">
              Please visit a hospital for blood
              group testing before donating.
            </div>
          )}

          <label className="block mb-2 font-semibold">
            Weight (kg)
          </label>

          <input
            type="number"
            value={weight}
            onChange={(e) =>
              setWeight(e.target.value)
            }
            placeholder="Enter your weight"
            className="w-full border p-3 rounded mb-4"
          />

          <label className="block mb-2 font-semibold">
            Last Donation Date
          </label>

          <input
            type="date"
            value={lastDonationDate}
            onChange={(e) =>
              setLastDonationDate(e.target.value)
            }
            className="w-full border p-3 rounded mb-6"
          />

          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
          >
            Donate Blood
          </button>

        </form>

      </div>
    </div>
  );
}

export default DonateBlood;