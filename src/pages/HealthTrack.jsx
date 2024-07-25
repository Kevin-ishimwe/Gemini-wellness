import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import NutritionChart from "../components/charts/Nutrition";
import ActivitySummaryChart from "../components/charts/ActivitySummaryChart";
import SleepChart from "../components/charts/SleepChart";
import VitalSignsChart from "../components/charts/VitalityChart";
import GoalsChart from "../components/charts/GoalsChart";
import WeightTrackerChart from "../components/charts/WeightTrackerChart";
import logo from "../assets/logo.png";
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
  const clean=(str)=>{
    return  str.replace("```json","").replace("```","")
  }
  const fetchHealthAnalysis = async (userData) => {
    try {
      const response = await fetch("http://localhost:2020/health/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData: userData }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch health analysis");
      }

      const res = await response.json();
      setHealthAnalysis(JSON.parse(clean(res.data)));
    } catch (error) {
      console.error("Error fetching health analysis:", error);
    }
  };

  const str =
    '```json\n{\n  "summary": "Kevin, your overall health trends appear positive based on the available data. You\'re getting a good amount of physical activity and generally healthy sleep.  Maintaining these habits is encouraged. However, more complete data, particularly dietary intake details, is needed for a comprehensive assessment.",\n  "risks": [\n    "Potential for nutritional gaps given limited meal data.  A detailed analysis of calorie intake, macronutrient ratios, and micronutrient intake is not possible with only two meal entries.",\n    "Occasional mild pain reported, warranting monitoring for potential underlying causes or triggers."\n  ],\n  "recommendations": {\n    "physicalActivity": {\n      "Maintain consistent activity level, aiming for at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous-intensity exercise per week.",\n      "Consider incorporating a variety of exercises like strength training 2-3 times per week for overall fitness."\n    },\n    "sleep": {\n      "Continue prioritizing consistent sleep schedules and a relaxing bedtime routine to maintain current sleep quality."\n    },\n    "nutrition": {\n      "Log more comprehensive meal data, including portion sizes and specific ingredients, to gain better insights into dietary habits and identify potential areas for improvement.",\n      "Consult with a registered dietitian or nutritionist to receive personalized recommendations based on your individual needs and health goals."\n    },\n    "weightManagement": "Maintain current healthy weight and body composition."\n  },\n  "newGoals": [\n    "Log at least 3 complete meals per day to allow for a thorough dietary analysis.",\n    "Incorporate strength training exercises 2-3 times per week.",\n    "Identify and address potential triggers for reported pain episodes (e.g., specific activities, stress)."\n  ],\n  "correlations": [\n    "Higher step counts and distance covered correlate with increased calorie expenditure, suggesting a positive relationship between physical activity and energy balance."\n  ]\n}\n``` \n';
  console.log((clean(str)));
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
      <div className="flex overflow-y-auto h-screen ">
        <div className="p-6 ml-[5em] mx-4 min-w-[60em] pt-12">
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
            <div>
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
              <WeightTrackerChart weightData={user.weightManagement} />
            </div>
            {/* Goals Progress */}
            <div className="bg-white p-4 rounded-lg shadow">
              <GoalsChart goalsData={user.goals} />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex-1 bg-white w-[30em] h-[90vh] mr-4 rounded-lg shadow-sm">
        analysis here
      </div>
    </>
  );
}

export default HealthTrack;
