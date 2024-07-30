import React, { useState, useEffect } from "react";
import SideNavRight from "../../components/charts/sideNavRight";
import VitalSignsChart from "../../components/charts/VitalityChart";

function VitalSigns() {
  const [user, setUser] = useState(null);
  const [vitalData, setVitalData] = useState({
    date: "",
    heartRate: 0,
    bloodPressure: {
      systolic: 0,
      diastolic: 0,
    },
    bodyTemperature: 0,
    respiratoryRate: 0,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    setUser(userData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "systolic" || name === "diastolic") {
      setVitalData({
        ...vitalData,
        bloodPressure: { ...vitalData.bloodPressure, [name]: value },
      });
    } else {
      setVitalData({ ...vitalData, [name]: value });
    }
  };

  const updateVitalSigns = async () => {
    if (!user) return;
    try {
      const response = await fetch(
        `http://localhost:2020/user/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vitalSigns: [
              ...user.vitalSigns,
              {
                date: new Date(vitalData.date),
                heartRate: parseFloat(vitalData.heartRate),
                bloodPressure: {
                  systolic: parseFloat(vitalData.bloodPressure.systolic),
                  diastolic: parseFloat(vitalData.bloodPressure.diastolic),
                },
                bodyTemperature: parseFloat(vitalData.bodyTemperature),
                respiratoryRate: parseFloat(vitalData.respiratoryRate),
              },
            ],
          }),
        }
      ).then((res) => res.json());

      const updatedUser = await response;
      setUser(updatedUser.data);
      localStorage.setItem("user_data", JSON.stringify(updatedUser.data));
      alert("Vital signs entry added successfully!");
      // Reset form after successful submission
      setVitalData({
        date: "",
        heartRate: 0,
        bloodPressure: {
          systolic: 0,
          diastolic: 0,
        },
        bodyTemperature: 0,
        respiratoryRate: 0,
      });
    } catch (error) {
      console.error("Error adding vital signs entry:", error);
      alert("Failed to add vital signs entry. Please try again.");
    }
  };

  return (
    <div className="flex w-screen h-screen items-center overflow-y-auto">
      {user && (
        <div className="w-full mx-4 h-screen my-auto py-[2em]">
          <VitalSignsChart vitalSignsData={user.vitalSigns} />
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Add Vital Signs Entry</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={vitalData.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="heartRate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Heart Rate (bpm)
                </label>
                <input
                  type="number"
                  id="heartRate"
                  name="heartRate"
                  value={vitalData.heartRate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Blood Pressure
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="systolic"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Systolic (mmHg)
                    </label>
                    <input
                      type="number"
                      id="systolic"
                      name="systolic"
                      value={vitalData.bloodPressure.systolic}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="diastolic"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Diastolic (mmHg)
                    </label>
                    <input
                      type="number"
                      id="diastolic"
                      name="diastolic"
                      value={vitalData.bloodPressure.diastolic}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="bodyTemperature"
                  className="block text-sm font-medium text-gray-700"
                >
                  Body Temperature (°C)
                </label>
                <input
                  type="number"
                  id="bodyTemperature"
                  name="bodyTemperature"
                  value={vitalData.bodyTemperature}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="respiratoryRate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Respiratory Rate (breaths/min)
                </label>
                <input
                  type="number"
                  id="respiratoryRate"
                  name="respiratoryRate"
                  value={vitalData.respiratoryRate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="button"
                onClick={updateVitalSigns}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Vital Signs Entry
              </button>
            </form>
          </div>
        </div>
      )}
      <SideNavRight
        title={"Vital Signs Report"}
        prompt_data={user?.vitalSigns}
      />
    </div>
  );
}

export default VitalSigns;
