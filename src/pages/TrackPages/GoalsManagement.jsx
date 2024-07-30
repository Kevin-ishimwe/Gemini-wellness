import React, { useState, useEffect } from "react";
import SideNavRight from "../../components/charts/sideNavRight";

function GoalsManagement() {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    type: "",
    target: "",
    startDate: "",
    endDate: "",
    progress: 0,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    setUser(userData);
    if (userData && userData.goals) {
      setGoals(userData.goals);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const addGoal = async () => {
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
            goals: [...goals, { ...newGoal, progress: 0 }],
          }),
        }
      ).then((res) => res.json());

      const updatedUser = await response;
      setUser(updatedUser.data);
      setGoals(updatedUser.data.goals);
      localStorage.setItem("user_data", JSON.stringify(updatedUser.data));
      alert("Goal added successfully!");
      // Reset form after successful submission
      setNewGoal({
        type: "",
        target: "",
        startDate: "",
        endDate: "",
        progress: 0,
      });
    } catch (error) {
      console.error("Error adding goal:", error);
      alert("Failed to add goal. Please try again.");
    }
  };

  const updateGoalProgress = async (index, newProgress) => {
    if (!user) return;
    try {
      const updatedGoals = goals.map((goal, i) =>
        i === index ? { ...goal, progress: newProgress } : goal
      );
      const response = await fetch(
        `http://localhost:2020/user/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            goals: updatedGoals,
          }),
        }
      ).then((res) => res.json());

      const updatedUser = await response;
      setUser(updatedUser.data);
      setGoals(updatedUser.data.goals);
      localStorage.setItem("user_data", JSON.stringify(updatedUser.data));
      alert("Goal progress updated successfully!");
    } catch (error) {
      console.error("Error updating goal progress:", error);
      alert("Failed to update goal progress. Please try again.");
    }
  };

  const removeGoal = async (index) => {
    if (!user) return;
    try {
      const updatedGoals = goals.filter((_, i) => i !== index);
      const response = await fetch(
        `http://localhost:2020/user/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            goals: updatedGoals,
          }),
        }
      ).then((res) => res.json());

      const updatedUser = await response;
      setUser(updatedUser.data);
      setGoals(updatedUser.data.goals);
      localStorage.setItem("user_data", JSON.stringify(updatedUser.data));
      alert("Goal removed successfully!");
    } catch (error) {
      console.error("Error removing goal:", error);
      alert("Failed to remove goal. Please try again.");
    }
  };

  return (
    <div className="flex w-screen h-screen items-center overflow-y-auto">
      {user && (
        <div className="w-full mx-4 h-screen my-auto py-[2em]">
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Goals List</h2>
            <ul className="space-y-4">
              {goals.map((goal, index) => (
                <li key={index} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      {goal.type}: {goal.target}
                    </span>
                    <button
                      onClick={() => removeGoal(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <p>
                    Start Date: {new Date(goal.startDate).toLocaleDateString()}
                  </p>
                  <p>End Date: {new Date(goal.endDate).toLocaleDateString()}</p>
                  <div className="mt-2">
                    <label
                      htmlFor={`progress-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Progress: {goal.progress}%
                    </label>
                    <input
                      type="range"
                      id={`progress-${index}`}
                      name={`progress-${index}`}
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) =>
                        updateGoalProgress(index, parseInt(e.target.value))
                      }
                      className="mt-1 block w-full"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Add New Goal</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Goal Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={newGoal.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="target"
                  className="block text-sm font-medium text-gray-700"
                >
                  Target
                </label>
                <input
                  type="text"
                  id="target"
                  name="target"
                  value={newGoal.target}
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
                  value={newGoal.startDate}
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
                  value={newGoal.endDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="button"
                onClick={addGoal}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Goal
              </button>
            </form>
          </div>
        </div>
      )}
      <SideNavRight title={"Goals Management Report"} prompt_data={goals} />
    </div>
  );
}

export default GoalsManagement;
