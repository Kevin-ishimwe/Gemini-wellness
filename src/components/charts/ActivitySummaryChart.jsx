import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ActivitySummaryChart({ physicalActivity }) {
  const { steps, distance, caloriesBurned, activeMinutes } = physicalActivity;

  // Sort all data by date
  const sortedDates = [
    ...new Set([
      ...steps.map((s) => s.date),
      ...distance.map((d) => d.date),
      ...caloriesBurned.map((c) => c.date),
      ...activeMinutes.map((a) => a.date),
    ]),
  ].sort((a, b) => new Date(a) - new Date(b));

  const labels = sortedDates.map((date) => new Date(date).toLocaleDateString());

  const getData = (array, key) => {
    return sortedDates.map(
      (date) => array.find((item) => item.date === date)?.[key] || 0
    );
  };

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Steps",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: getData(steps, "count"),
        yAxisID: "y-axis-steps",
      },
      {
        type: "line",
        label: "Distance (km)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        fill: false,
        data: getData(distance, "kilometers"),
        yAxisID: "y-axis-distance",
      },
      {
        type: "bar",
        label: "Calories Burned",
        backgroundColor: "rgb(75, 192, 192)",
        data: getData(caloriesBurned, "amount"),
        yAxisID: "y-axis-calories",
      },
      {
        type: "bar",
        label: "Active Minutes",
        backgroundColor: "rgb(255, 206, 86)",
        data: getData(activeMinutes, "minutes"),
        yAxisID: "y-axis-minutes",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Activity Summary",
      },
    },
    scales: {
      "y-axis-steps": {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Steps",
        },
      },
      "y-axis-distance": {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Distance (km)",
        },
      },
      "y-axis-calories": {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Calories",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      "y-axis-minutes": {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Minutes",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Activity Summary</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ActivitySummaryChart;
