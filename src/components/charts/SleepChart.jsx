import React from "react";
import PropTypes from "prop-types";
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
import { Bar } from "react-chartjs-2";

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

function SleepChart({ sleepData }) {
  if (!sleepData || !Array.isArray(sleepData)) {
    return <div>No sleep data available</div>;
  }

  // Sort sleep data by date
  const sortedSleepData = sleepData
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Prepare data for the chart
  const labels = sortedSleepData.map((entry) =>
    new Date(entry.date).toLocaleDateString()
  );
  const durations = sortedSleepData.map((entry) => entry.duration);
  const qualities = sortedSleepData.map((entry) => entry.quality);

  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Sleep Duration (hours)",
        data: durations,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        yAxisID: "y-duration",
      },
      {
        type: "line",
        label: "Sleep Quality",
        data: qualities,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y-quality",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Sleep Analysis",
      },
    },
    scales: {
      "y-duration": {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Sleep Duration (hours)",
        },
        min: 0,
        max: 12,
      },
      "y-quality": {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Sleep Quality (1-10)",
        },
        min: 1,
        max: 10,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Sleep Analysis</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

SleepChart.propTypes = {
  sleepData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      duration: PropTypes.number.isRequired,
      quality: PropTypes.number.isRequired,
      bedtime: PropTypes.instanceOf(Date).isRequired,
      wakeTime: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
};

export default SleepChart;
