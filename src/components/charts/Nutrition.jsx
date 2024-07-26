import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function NutritionChart({ nutritionData }) {
  const meals = nutritionData.meals || [];
  const waterIntake = nutritionData.waterIntake || [];

  // Prepare data for meals
  const mealDates = meals.map((meal) =>
    new Date(meal.date).toLocaleDateString()
  );
  const uniqueDates = [...new Set(mealDates)];

  const mealData = {
    labels: uniqueDates,
    datasets: [
      {
        label: "Calories",
        data: uniqueDates.map((date) =>
          meals
            .filter((meal) => new Date(meal.date).toLocaleDateString() === date)
            .reduce((sum, meal) => sum + meal.calories, 0)
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Protein",
        data: uniqueDates.map((date) =>
          meals
            .filter((meal) => new Date(meal.date).toLocaleDateString() === date)
            .reduce((sum, meal) => sum + meal.protein, 0)
        ),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Carbs",
        data: uniqueDates.map((date) =>
          meals
            .filter((meal) => new Date(meal.date).toLocaleDateString() === date)
            .reduce((sum, meal) => sum + meal.carbs, 0)
        ),
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
      {
        label: "Fats",
        data: uniqueDates.map((date) =>
          meals
            .filter((meal) => new Date(meal.date).toLocaleDateString() === date)
            .reduce((sum, meal) => sum + meal.fats, 0)
        ),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const mealOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Daily Nutrient Intake",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // Prepare data for water intake
  const waterData = {
    labels: waterIntake.map((entry) =>
      new Date(entry.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Water Intake (ml)",
        data: waterIntake.map((entry) => entry.amount),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.9,
      },
    ],
  };

  const waterOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Water Intake",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Nutrition Overview</h2>
        <Bar data={mealData} options={mealOptions} />
      <div className="mb-6">

      </div>
        <Line data={waterData} options={waterOptions} />
      <div></div>
    </div>
  );
}

export default NutritionChart;
