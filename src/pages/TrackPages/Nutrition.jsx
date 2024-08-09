import React, { useState, useEffect } from "react";
import SideNavRight from "../../components/charts/sideNavRight";
import NutritionChart from "../../components/charts/Nutrition";
const backend_url = import.meta.env.BACKEND_URL;

function Nutrition() {
  const [user, setUser] = useState(null);
  const [mealData, setMealData] = useState({
    date: "",
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [waterIntake, setWaterIntake] = useState({
    date: "",
    amount: 0,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    setUser(userData);
  }, []);
  const handleMealInputChange = (e) => {
    const { name, value } = e.target;
    setMealData({ ...mealData, [name]: value });
  };

  const handleWaterInputChange = (e) => {
    const { name, value } = e.target;
    setWaterIntake({ ...waterIntake, [name]: value });
  };

  const addMeal = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${backend_url}/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nutrition: {
            ...user.nutrition,
            meals: [
              ...user.nutrition.meals,
              {
                date: new Date(mealData.date),
                name: mealData.name,
                calories: parseFloat(mealData.calories),
                protein: parseFloat(mealData.protein),
                carbs: parseFloat(mealData.carbs),
                fats: parseFloat(mealData.fats),
              },
            ],
          },
        }),
      }).then((res) => res.json());
      const updatedUser = await response.data;
      setUser(updatedUser);
      localStorage.setItem("user_data", JSON.stringify(updatedUser.data));
      alert("Meal added successfully!");
      setMealData({
        date: "",
        name: "",
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
      });
    } catch (err) {
      console.error("Error adding meal:", error);
    }
  };

  const addWaterIntake = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${backend_url}/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nutrition: {
            ...user.nutrition,
            waterIntake: [
              ...user.nutrition.waterIntake,
              {
                date: new Date(waterIntake.date),
                amount: parseFloat(waterIntake.amount),
              },
            ],
          },
        }),
      }).then((res) => res.json());
      const updatedUser = await response.data;
      setUser(updatedUser);
      localStorage.setItem("user_data", JSON.stringify(updatedUser.data));
      alert("Water intake added successfully!");
      setWaterIntake({ date: "", amount: 0 });
    } catch (error) {
      console.error("Error adding water intake:", error);
      alert("Failed to add water intake. Please try again.");
    }
  };
  return (
    <div className="flex overflow-y-auto h-screen w-full py-[2em]">
      {user && (
        <div className="w-full mx-4 py-[3em]">
          <NutritionChart nutritionData={user.nutrition} />
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Add Meal</h2>
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
                  value={mealData.date}
                  onChange={handleMealInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Meal Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={mealData.name}
                  onChange={handleMealInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="calories"
                  className="block text-sm font-medium text-gray-700"
                >
                  Calories
                </label>
                <input
                  type="number"
                  id="calories"
                  name="calories"
                  value={mealData.calories}
                  onChange={handleMealInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="protein"
                  className="block text-sm font-medium text-gray-700"
                >
                  Protein (g)
                </label>
                <input
                  type="number"
                  id="protein"
                  name="protein"
                  value={mealData.protein}
                  onChange={handleMealInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="carbs"
                  className="block text-sm font-medium text-gray-700"
                >
                  Carbs (g)
                </label>
                <input
                  type="number"
                  id="carbs"
                  name="carbs"
                  value={mealData.carbs}
                  onChange={handleMealInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="fats"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fats (g)
                </label>
                <input
                  type="number"
                  id="fats"
                  name="fats"
                  value={mealData.fats}
                  onChange={handleMealInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="button"
                onClick={addMeal}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Meal
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Add Water Intake</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="waterDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="waterDate"
                  name="date"
                  value={waterIntake.date}
                  onChange={handleWaterInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount (ml)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={waterIntake.amount}
                  onChange={handleWaterInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="button"
                onClick={addWaterIntake}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Water Intake
              </button>
            </form>
          </div>
        </div>
      )}
      <SideNavRight
        title={"Nutrition Analysis Report"}
        prompt_data={user?.nutrition}
      />
    </div>
  );
}

export default Nutrition;
