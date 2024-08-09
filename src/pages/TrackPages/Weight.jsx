import React, { useState, useEffect } from "react";
import SideNavRight from "../../components/charts/sideNavRight";
import WeightTrackerChart from "../../components/charts/WeightTrackerChart";
const backend_url = import.meta.env.BACKEND_URL;

function WeightManagement() {
  const [user, setUser] = useState(null);
  const [weightData, setWeightData] = useState({
    date: "",
    weight: 0,
    bmi: 0,
    bodyFatPercentage: 0,
    measurements: {
      waist: 0,
      chest: 0,
      hips: 0,
    },
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    setUser(userData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in weightData.measurements) {
      setWeightData({
        ...weightData,
        measurements: { ...weightData.measurements, [name]: value },
      });
    } else {
      setWeightData({ ...weightData, [name]: value });
    }
  };

  const updateWeight = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${backend_url}/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weightManagement: [
            ...user.weightManagement,
            {
              date: new Date(weightData.date),
              weight: parseFloat(weightData.weight),
              bmi: parseFloat(weightData.bmi),
              bodyFatPercentage: parseFloat(weightData.bodyFatPercentage),
              measurements: {
                waist: parseFloat(weightData.measurements.waist),
                chest: parseFloat(weightData.measurements.chest),
                hips: parseFloat(weightData.measurements.hips),
              },
            },
          ],
        }),
      }).then((res) => res.json());

      const updatedUser = await response;
      setUser(updatedUser.data);
      localStorage.setItem("user_data", JSON.stringify(updatedUser.data));
      alert("Weight entry added successfully!");
      // Reset form after successful submission
      setWeightData({
        date: "",
        weight: 0,
        bmi: 0,
        bodyFatPercentage: 0,
        measurements: {
          waist: 0,
          chest: 0,
          hips: 0,
        },
      });
    } catch (error) {
      console.error("Error adding weight entry:", error);
      alert("Failed to add weight entry. Please try again.");
    }
  };

  return (
    <div className="flex w-screen h-screen items-center overflow-y-auto">
      {user && (
        <div className="w-full mx-4 h-screen my-auto py-[2em]">
          <WeightTrackerChart weightData={user.weightManagement} />
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Add Weight Entry</h2>
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
                  value={weightData.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={weightData.weight}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="bmi"
                  className="block text-sm font-medium text-gray-700"
                >
                  BMI
                </label>
                <input
                  type="number"
                  id="bmi"
                  name="bmi"
                  value={weightData.bmi}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="bodyFatPercentage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Body Fat Percentage
                </label>
                <input
                  type="number"
                  id="bodyFatPercentage"
                  name="bodyFatPercentage"
                  value={weightData.bodyFatPercentage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Measurements
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="waist"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Waist (cm)
                    </label>
                    <input
                      type="number"
                      id="waist"
                      name="waist"
                      value={weightData.measurements.waist}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="chest"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Chest (cm)
                    </label>
                    <input
                      type="number"
                      id="chest"
                      name="chest"
                      value={weightData.measurements.chest}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hips"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Hips (cm)
                    </label>
                    <input
                      type="number"
                      id="hips"
                      name="hips"
                      value={weightData.measurements.hips}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={updateWeight}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Weight Entry
              </button>
            </form>
          </div>
        </div>
      )}
      <SideNavRight
        title={"Weight Management Report"}
        prompt_data={user?.weightManagement}
      />
    </div>
  );
}

export default WeightManagement;
