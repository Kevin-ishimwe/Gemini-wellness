import React, { useState, useEffect } from "react";
import SideNav from "../components/NavHealth";
import { FaPlus } from "react-icons/fa";
import NutritionChart from "../components/charts/Nutrition";
import ActivitySummaryChart from "../components/charts/ActivitySummaryChart";
import SleepChart from "../components/charts/SleepChart";
import VitalSignsChart from "../components/charts/VitalityChart";
function HealthTrack() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    setUser(userData);
  }, []);
  console.log(user);
  if (!user) return <div>Loading...</div>;
  return (
    <div className="flex items-center mx-2 text-center">
      <SideNav />
      <div className="p-6 ml-[5em]  mx-4 min-w-[60em] min-h-[90vh] pt-12">
        <h1 className="text-2xl font-bold mb-6 text-left">
          Welcome, {user.personalInfo.username}!
        </h1>
        <div className="bg-white p-4 rounded-lg shadow my-2 text-left">
          <h2 className="text-lg font-semibold mb-2">Quick Add</h2>
          <div className="flex space-x-2">
            <button className="flex items-center bg-blue-500 text-white px-3 py-2 rounded">
              <FaPlus className="mr-2" /> Log Activity
            </button>
            <button className="flex items-center bg-green-500 text-white px-3 py-2 rounded">
              <FaPlus className="mr-2" /> Log Meal
            </button>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <ActivitySummaryChart physicalActivity={user.physicalActivity} />
        </div>
        <div className="grid gap-2 grid-cols-2 py-6 bg-white my-4 px-4 rounded-lg ">
          {/* Sleep Insights */}
          <div >
            <div className="bg-white rounded-lg shadow">
              <SleepChart
                sleepData={user.sleep}
                moodData={user.symptoms}
                activityData={user.physicalActivity.activeMinutes}
              />
            </div>
            <div className="mt-2 bg-white rounded-lg shadow">
              <VitalSignsChart vitalSignsData={user.vitalSigns} />
            </div>
          </div>

          {/* Nutrition Overview */}
          <div>
            <NutritionChart nutritionData={user.nutrition} />
          </div>

          {/* Weight Tracker */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Weight Tracker</h2>
            <p>No weight data available yet.</p>
          </div>

          {/* Goals Progress */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Goals Progress</h2>
            <p>No goals set yet.</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default HealthTrack;
