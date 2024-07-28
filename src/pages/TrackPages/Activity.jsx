import React, { useState, useEffect } from "react";
import SideNavRight from "../../components/charts/sideNavRight";
import ActivitySummaryChart from "../../components/charts/ActivitySummaryChart";



function Activity() {
  const [user, setUser] = useState(null);
  const [activityData, setActivityData] = useState({
    steps: 0,
    distance: 0,
    caloriesBurned: 0,
    activeMinutes: 0,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    setUser(userData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: parseInt(value) });
  };
  const updateActivity = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:2020/user/update/${user._id}`,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            physicalActivity: {
              steps: [
                ...user.physicalActivity.steps,
                { date: new Date(), count: activityData.steps },
              ],
              distance: [
                ...user.physicalActivity.distance,
                { date: new Date(), kilometers: activityData.distance },
              ],
              caloriesBurned: [
                ...user.physicalActivity.caloriesBurned,
                { date: new Date(), amount: activityData.caloriesBurned },
              ],
              activeMinutes: [
                ...user.physicalActivity.activeMinutes,
                { date: new Date(), minutes: activityData.activeMinutes },
              ],
            },
          }),});
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem("user_data", JSON.stringify(updatedUser.data));
        alert("Activity updated successfully!");
      } else {
        throw new Error("Failed to update activity");
      }
    } catch (error) {
      console.error("Error updating activity:", error);
      alert("Failed to update activity. Please try again.");
    }
  };
//console.log(user.physicalActivity)
  return (
    <div className="flex w-screen h-screen  items-center overflow-y-auto">
      {user && (
        <div className="w-full mx-4 ">
          <div className="mt-[5em]"></div>
          <ActivitySummaryChart physicalActivity={user.physicalActivity} />
          <div className=" bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Add Activity</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="steps"
                  className="block text-sm font-medium text-gray-700"
                >
                  Steps
                </label>
                <input
                  type="number"
                  id="steps"
                  name="steps"
                  value={activityData.steps}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="distance"
                  className="block text-sm font-medium text-gray-700"
                >
                  Distance (km)
                </label>
                <input
                  type="number"
                  id="distance"
                  name="distance"
                  value={activityData.distance}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="caloriesBurned"
                  className="block text-sm font-medium text-gray-700"
                >
                  Calories Burned
                </label>
                <input
                  type="number"
                  id="caloriesBurned"
                  name="caloriesBurned"
                  value={activityData.caloriesBurned}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="activeMinutes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Active Minutes
                </label>
                <input
                  type="number"
                  id="activeMinutes"
                  name="activeMinutes"
                  value={activityData.activeMinutes}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="button"
                onClick={updateActivity}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Activity
              </button>
            </form>
          </div>
        </div>
      )}
      <SideNavRight
        title={"Activity analysis Report"}
        prompt_data={user?.physicalActivity}
      />
    </div>
  );
}

export default Activity;
