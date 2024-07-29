import React, { useState, useEffect } from "react";
import SideNavRight from "../../components/charts/sideNavRight";
import SleepChart from "../../components/charts/SleepChart";

function SleepPage() {
  const [user, setUser] = useState(null);
  const [sleepData, setSleepData] = useState({
    date: "",
    duration: 0,
    quality: 1,
    bedtime: "",
    wakeTime: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    setUser(userData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSleepData({ ...sleepData, [name]: value });
  };

  const updateSleep = async () => {
    console.log(sleepData);
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
            sleep: [
              ...user.sleep,
              {
                date: new Date(sleepData.date),
                duration: parseFloat(sleepData.duration),
                quality: parseInt(sleepData.quality),
                bedtime: new Date(sleepData.bedtime),
                wakeTime: new Date(sleepData.wakeTime),
              },
            ],
          }),
        }
      ).then(res=>res.json());

      const updatedUser = await response;
      setUser(updatedUser.data);
      localStorage.setItem("user_data", JSON.stringify(updatedUser.data));
      alert("Sleep entry added successfully!");
      // Reset form after successful submission
      setSleepData({
        date: "",
        duration: 0,
        quality: 1,
        bedtime: "",
        wakeTime: "",
      });
    } catch (error) {
      console.error("Error adding sleep entry:", error);
      alert("Failed to add sleep entry. Please try again.");
    }
  };

  return (
    <div className="flex w-screen h-screen  items-center overflow-y-auto">
      {user && (
        <div className="w-full mx-4 h-screen my-auto py-[2em]">
          <SleepChart sleepData={user.sleep} />
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Add Sleep</h2>
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
                  value={sleepData.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Duration (hours)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={sleepData.duration}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="quality"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quality (1-10)
                </label>
                <input
                  type="number"
                  id="quality"
                  name="quality"
                  min="1"
                  max="10"
                  value={sleepData.quality}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="bedtime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bedtime
                </label>
                <input
                  type="datetime-local"
                  id="bedtime"
                  name="bedtime"
                  value={sleepData.bedtime}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="wakeTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Wake Time
                </label>
                <input
                  type="datetime-local"
                  id="wakeTime"
                  name="wakeTime"
                  value={sleepData.wakeTime}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="button"
                onClick={updateSleep}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Sleep Entry
              </button>
            </form>
          </div>
        </div>
      )}
      <SideNavRight title={"Sleep analysis Report"} prompt_data={user?.sleep} />
    </div>
  );
}

export default SleepPage;
