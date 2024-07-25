import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GoalsChart({ goalsData }) {
  // Sort goals by start date
  const sortedGoals = goalsData.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  const labels = sortedGoals.map((goal) => goal.type);

  const data = {
    labels,
    datasets: [
      {
        label: "Progress",
        data: sortedGoals.map((goal) => goal.progress),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Remaining",
        data: sortedGoals.map((goal) => 100 - goal.progress),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Goals Progress",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y.toFixed(2)}%`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Progress (%)",
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Goals Progress</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default GoalsChart;
