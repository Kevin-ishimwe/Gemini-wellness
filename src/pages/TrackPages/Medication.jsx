import React, { useState, useEffect } from "react";
import SideNavRight from "../../components/charts/sideNavRight";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Medications() {
  const [user, setUser] = useState(null);
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    setUser(userData);
    if (userData && userData.medications) {
      setMedications(userData.medications);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedication({ ...newMedication, [name]: value });
  };

  const addMedication = async () => {
    if (!user) return;
    try {
      const response = await fetch(
        `${VITE_BACKEND_URL}/user/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medications: [...medications, newMedication],
          }),
        }
      ).then((res) => res.json());

      const updatedUser = await response;
      setUser(updatedUser.data);
      setMedications(updatedUser.data.medications);
      localStorage.setItem("user_data", JSON.stringify(updatedUser.data));
      alert("Medication added successfully!");
      // Reset form after successful submission
      setNewMedication({
        name: "",
        dosage: "",
        frequency: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Error adding medication:", error);
      alert("Failed to add medication. Please try again.");
    }
  };

  const removeMedication = async (index) => {
    if (!user) return;
    try {
      const updatedMedications = medications.filter((_, i) => i !== index);
      const response = await fetch(
        `${VITE_BACKEND_URL}/user/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medications: updatedMedications,
          }),
        }
      ).then((res) => res.json());

      const updatedUser = await response;
      setUser(updatedUser.data);
      setMedications(updatedUser.data.medications);
      localStorage.setItem("user_data", JSON.stringify(updatedUser.data));
      alert("Medication removed successfully!");
    } catch (error) {
      console.error("Error removing medication:", error);
      alert("Failed to remove medication. Please try again.");
    }
  };

  return (
    <div className="flex w-screen h-screen items-center overflow-y-auto">
      {user && (
        <div className="w-full mx-4 h-screen my-auto py-[2em]">
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Medications List</h2>
            <ul className="space-y-2">
              {medications.map((med, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>
                    {med.name} - {med.dosage} ({med.frequency})
                  </span>
                  <button
                    onClick={() => removeMedication(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Add Medication</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Medication Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newMedication.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="dosage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dosage
                </label>
                <input
                  type="text"
                  id="dosage"
                  name="dosage"
                  value={newMedication.dosage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="frequency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Frequency
                </label>
                <input
                  type="text"
                  id="frequency"
                  name="frequency"
                  value={newMedication.frequency}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={newMedication.startDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={newMedication.endDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="button"
                onClick={addMedication}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Medication
              </button>
            </form>
          </div>
        </div>
      )}
      <SideNavRight
        title={"Medication Management Report"}
        prompt_data={user?.medications}
      />
    </div>
  );
}

export default Medications;
