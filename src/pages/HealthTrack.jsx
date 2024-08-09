import React, { useState, useEffect } from "react";
import NutritionChart from "../components/charts/Nutrition";
import ActivitySummaryChart from "../components/charts/ActivitySummaryChart";
import SleepChart from "../components/charts/SleepChart";
import VitalSignsChart from "../components/charts/VitalityChart";
import GoalsChart from "../components/charts/GoalsChart";
import WeightTrackerChart from "../components/charts/WeightTrackerChart";
import logo from "../assets/logo.png";
import SideNavRight from "../components/charts/sideNavRight";

const backend_url = import.meta.env.BACKEND_URL;

function HealthTrack() {
  const [user, setUser] = useState(null);
  const [healthAnalysis, setHealthAnalysis] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    setUser(userData);
    if (userData) {
      fetchHealthAnalysis(userData);
    }
  }, []);
  const clean = (str) => {
    return str.replace("```json", "").replace("```", "");
  };
  const fetchHealthAnalysis = async (userData) => {
    try {
      const response = await fetch(`${backend_url}/health/analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData: userData }),
      });

      const res = await response.json();
      setHealthAnalysis(JSON.parse(clean(res.data)));
    } catch (error) {
      console.error("Error fetching health analysis:", error);
    }
  };

  if (!user)
    return (
      <div className=" h-[100vh] w-full flex items-center justify-center">
        <div className="w-[30em] h-[30em]  rounded-full border-[30px] border-b-[#189fe3] border-r-[#189fe3] border-t-[#9d79c6] border-l-[#9d79c6] animate-spin ">
          <img src={logo} className="rounded-full" />
        </div>
      </div>
    );
  return (
    <>
      <div className="flex overflow-y-auto h-screen w-full justify-left">
        <div className="p-6 mx-4  pt-12 w-full">
          <div className="bg-white p-4 rounded-lg shadow my-2 text-left">
            <h1 className="text-3xl font-bold mb-6 text-left text-primary-200">
              Welcome, {user.personalInfo.username}!
            </h1>
          </div>
          {/* Activity Summary */}
          <div className="bg-white p-4 rounded-lg shadow w-full text-primary-200 text-center">
            <ActivitySummaryChart physicalActivity={user.physicalActivity} />
          </div>

          <div className="py-6 bg-white my-4 px-4 rounded-lg text-primary-200 font-extrabold text-center">
            <div className="bg-white rounded-lg shadow grid gap-2 grid-cols-2">
              <SleepChart
                sleepData={user.sleep}
                moodData={user.symptoms}
                activityData={user.physicalActivity.activeMinutes}
              />

              <VitalSignsChart vitalSignsData={user.vitalSigns} />
            </div>

            <div className="w-full">
              <NutritionChart nutritionData={user.nutrition} />
            </div>
            {/* Weight Tracker */}
            <div className="bg-white p-4 rounded-lg shadow">
              <WeightTrackerChart weightData={user.weightManagement} />
            </div>
            {/* Goals Progress */}
            <div className="bg-white p-4 rounded-lg shadow">
              <GoalsChart goalsData={user.goals} />
            </div>
          </div>
        </div>
      </div>

      {healthAnalysis == null ? (
        <>
          <div className="w-full h-[90vh] flex items-center ">
            <div className=" w-full h-[20em] flex items-center flex-col">
              <img
                src={logo}
                className="w-[6em] border-[3px] border-b-[#189fe3] border-r-[#189fe3] border-t-[#9d79c6] border-l-[#9d79c6] rounded-full mb-4 animate-spin"
                alt=""
              />
              <h1 className="text-center w-full text-2xl font-black text-primary-100 animate-pulse">
                Analysing Data
              </h1>
            </div>
          </div>
        </>
      ) : (
        <SideNavRight title={"Gemini Health Report"} main={healthAnalysis} />
      )}
    </>
  );
}

export default HealthTrack;
